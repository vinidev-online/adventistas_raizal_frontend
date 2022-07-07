import { motion } from "framer-motion";
import styled from "styled-components";

type CarregandoStdProps = {
  tom: "claro" | "escuro";
};

export const CarregandoStd = styled(motion.div)<CarregandoStdProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  svg {
    color: ${({ theme, tom }) =>
      tom === "claro" ? theme.cor.fundo : theme.cor.texto};
    font-size: ${({ theme }) => theme.fonteTamanho.xg};
  }
  @media screen and (max-width: 600px) {
  }
  @media screen and (min-width: 601px) and (max-width: 768px) and (orientation: portrait) {
  }
  @media screen and (min-width: 769px) {
  }
`;
