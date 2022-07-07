import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html,
body {
  background: ${({ theme }) => theme.cor.fundo};
  color: ${({ theme }) => theme.cor.texto};
  font-size: 13pt;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonte.corpo};
  font-feature-settings: "liga","clig";
  font-variant-ligatures: common-ligatures;
  font-weight: 400;
  letter-spacing: -0.04em;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6{
  font-family: ${({ theme }) => theme.fonte.titulo} !important;
  font-weight: 600;
  letter-spacing: -0.04em;
}

ul li{
  list-style: none;
}
`;
