import { createContext, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Carregando } from "../components/Partes/Carregando";
import { retornaTema } from "../themes/retornaTema";

type TemaCtxProps = {
  tema: DefaultTheme;
  cor: string;
  setCor: (cor: string) => void;
};

export const TemaCtx = createContext<TemaCtxProps>({
  tema: {} as DefaultTheme,
  cor: "",
  setCor: () => {},
});

export const TemaProvider = ({ children }) => {
  const [cor, setCor] = useState<string>("#004d99");
  const [tema, setTema] = useState<DefaultTheme>(
    retornaTema({ nomeTema: "auto", codCor: cor })
  );
  const [carregando, setCarregando] = useState(false);

  if (carregando) return <Carregando />;
  return (
    <TemaCtx.Provider value={{ tema, cor, setCor }}>
      <ThemeProvider theme={tema}>{children}</ThemeProvider>
    </TemaCtx.Provider>
  );
};
