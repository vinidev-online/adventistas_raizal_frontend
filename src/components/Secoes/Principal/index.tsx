import Image from "next/image";
import { FC } from "react";
import { ITexto } from "../../../@types/ITexto";
import { Vazio } from "../../Partes/Carregando";
import { FundoStd, PrincipalStd } from "./styled";

type PrincipalProps = {
  principal: ITexto;
};

export const Principal: FC<PrincipalProps> = ({ principal }) => {
  if (!principal)
    return (
      <PrincipalStd>
        <Vazio />
      </PrincipalStd>
    );
  return (
    <PrincipalStd>
      <FundoStd>
        <Image
          src={
            process.env.NEXT_PUBLIC_IMG_URL +
            (principal.imagem || principal.Departamentos[0].imagem)
          }
          alt={principal.titulo || principal.conteudo}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </FundoStd>
    </PrincipalStd>
  );
};
