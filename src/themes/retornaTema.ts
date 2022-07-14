import { adjustHue, desaturate, lighten, shade, tint } from 'polished';
import { DefaultTheme } from 'styled-components';

type RetornaTemaProps = {
	nomeTema?: 'light' | 'dark' | 'auto';
	codCor?: string;
};

export const retornaTema = ({
	nomeTema,
	codCor = '#004d99',
}: RetornaTemaProps): DefaultTheme => {
	const base = {
		espaco: {
			p: '2pt',
			m: '4pt',
			g: '8pt',
			xg: '16pt',
			xxg: '32pt',
			xxxg: '64pt',
		},
		fonte: {
			titulo: 'Barlow Condensed, sans-serif',
			corpo: 'Manrope, sans-serif',
		},
		fonteTamanho: {
			p: '0.75em',
			m: '1em',
			g: '1.5em',
			xg: '2em',
			xxg: '3em',
		},
	};

	const agora = new Date();
	let cor: {
			primario: string;
			secundario: string;
			texto: string;
			fundo: string;
			borda: string;
			claro: string;
			escuro: string;
		},
		nome: 'light' | 'dark' | 'auto';

	const light = {
		primario: codCor,
		secundario: adjustHue(90, tint(0.2, codCor)),
		texto: shade(0.75, codCor),
		fundo: tint(0.95, codCor),
		borda: tint(0.7, desaturate(0.8, codCor)),
		claro: tint(0.95, codCor),
		escuro: shade(0.8, codCor),
	};

	const dark = {
		primario: lighten(0.3, codCor),
		secundario: adjustHue(90, tint(0.2, lighten(0.3, codCor))),
		texto: tint(0.75, codCor),
		fundo: shade(0.95, codCor),
		borda: tint(0.3, desaturate(0.8, codCor)),
		claro: tint(0.95, codCor),
		escuro: shade(0.8, codCor),
	};

	switch (nomeTema) {
		case 'light':
			cor = light;
			nome = 'light';
			break;
		case 'dark':
			cor = dark;
			nome = 'dark';
			break;
		case 'auto':
			if (agora.getHours() > 6 && agora.getHours() < 18) {
				cor = light;
				nome = 'light';
			} else {
				cor = dark;
				nome = 'dark';
			}
			break;
	}

	const tema: DefaultTheme = { ...base, cor, nome };

	return tema;
};
