import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    nome: 'light' | 'dark' | 'auto';
    cor: {
      primario: string;
      secundario: string;
      texto: string;
      fundo: string;
      borda: string;
      claro: string;
      escuro: string;
    };
    espaco: {
      p: string;
      m: string;
      g: string;
      xg: string;
      xxg: string;
      xxxg: string;
    };
    fonte: {
      titulo: string;
      corpo: string;
    };
    fonteTamanho: { p: string; m: string; g: string; xg: string; xxg: string };
  }
}
