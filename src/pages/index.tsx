import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Worker } from "worker_threads";
import { ITexto } from "../@types/ITexto";
import { Pagina } from "../components/Layout/Pagina";
import { Outros } from "../components/Secoes/Outros";
import { Principal } from "../components/Secoes/Principal";
import { geraConteudo } from "../functions/geraConteudo";
import { api } from "../lib/api";

type HomeProps = {
  textos?: ITexto[];
};

const Home: NextPage<HomeProps> = ({ textos }) => {
  const principal = textos?.shift();
  return (
    <>
      <Head>
        <title>Adventistas Raizal</title>
      </Head>
      <Pagina>
        <Principal principal={principal} />
        <Outros />
      </Pagina>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (process.env.NODE_ENV === "development") {
    Worker.setMaxListeners(0);
    await geraConteudo();
  }

  const { data: textos } = await api.get<ITexto[]>(
    "textos?campos=id-slug-imagem-Departamentos-titulo-subtitulo-conteudo&limite=16"
  );

  return {
    props: { textos },
  };
};

export default Home;
