import { parseCookies, setCookie } from 'nookies';
import {
	createContext,
	FC,
	ReactFragment,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { CarregandoPagina } from '../components/Partes/Carregando';
import { retornaTema } from '../themes/retornaTema';

type TemaCtxProps = {
	tema: DefaultTheme;
	mudaCor: (codCor: string) => void;
	mudaTema: (nomeTema: string) => void;
};

export const TemaCtx = createContext<TemaCtxProps>({
	tema: {} as DefaultTheme,
	mudaCor: () => {},
	mudaTema: () => {},
});

type TemaProviderProps = {
	children: ReactNode | ReactNode[] | ReactFragment | ReactFragment[];
};

export const TemaProvider: FC<TemaProviderProps> = ({ children }) => {
	const [tema, setTema] = useState<DefaultTheme>({} as DefaultTheme);
	const [carregando, setCarregando] = useState<boolean>(true);

	useEffect(() => {
		setCarregando(true);
		setaTemas();
		setCarregando(false);
	}, []);

	const setaTemas = () => {
		const { adv_raizal_tema: nomeTema } = parseCookies();

		if (nomeTema) {
			setTema(retornaTema({ nomeTema: nomeTema as 'light' | 'dark' | 'auto' }));
		} else {
			setTema(retornaTema({ nomeTema: 'auto' }));
		}
	};

	const mudaTema = (nomeTema: 'light' | 'dark' | 'auto') => {
		setCarregando(true);
		setTema(retornaTema({ nomeTema }));
		setCookie(undefined, 'adv_raizal_tema', nomeTema, {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		});
		setCarregando(false);
	};

	const mudaCor = (codCor: 'string') => {
		setCarregando(true);
		setTema((tema) => retornaTema({ nomeTema: tema.nome, codCor }));
		setCarregando(false);
	};

	if (carregando) return <CarregandoPagina />;
	return (
		<TemaCtx.Provider value={{ tema, mudaCor, mudaTema }}>
			<ThemeProvider theme={tema}>{children}</ThemeProvider>
		</TemaCtx.Provider>
	);
};
