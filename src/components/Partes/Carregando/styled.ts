import { motion } from 'framer-motion';
import styled from 'styled-components';

type CarregandoStdProps = {
	tom: 'claro' | 'escuro';
};

export const CarregandoStd = styled(motion.div)<CarregandoStdProps>`
	align-items: center;
	display: flex;
	justify-content: center;
	svg {
		color: ${({ theme, tom }) =>
			tom === 'claro' ? theme.cor.fundo : theme.cor.texto};
		font-size: ${({ theme }) => theme.fonteTamanho.xg};
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const CarregandoPaginaStd = styled(motion.div)`
	align-items: center;
	display: flex;
	height: 100vh;
	justify-content: center;
	width: 100vw;
	svg {
		color: #004d99;
		font-size: 2rem;
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const VazioStd = styled(motion.div)<CarregandoStdProps>`
	align-items: center;
	display: flex;
	justify-content: center;
	svg {
		color: ${({ theme, tom }) =>
			tom === 'claro' ? theme.cor.fundo : theme.cor.texto};
		font-size: ${({ theme }) => theme.fonteTamanho.xxg};
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;
