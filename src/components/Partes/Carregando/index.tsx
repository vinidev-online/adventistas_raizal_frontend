import { FC } from "react";
import { CarregandoStd } from "./styled";

type CarregandoProps = {
  tom?: "claro" | "escuro";
};

export const Carregando: FC<CarregandoProps> = ({ tom = "escuro" }) => (
  <CarregandoStd tom={tom}>Carregando...</CarregandoStd>
);
