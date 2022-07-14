import { FC, ReactFragment, ReactNode } from "react";
import { Cabecalho } from "../../Secoes/Cabecalho";
import { Lateral } from "../../Secoes/Lateral";
import { Rodape } from "../../Secoes/Rodape";
import { PaginaStd } from "./styled";

type PaginaProps = {
  children: ReactNode | ReactNode[] | ReactFragment | ReactFragment[];
};

export const Pagina: FC<PaginaProps> = ({ children }) => (
  <PaginaStd>
    <Cabecalho />
    {children}
    <Lateral />
    <Rodape />
  </PaginaStd>
);
