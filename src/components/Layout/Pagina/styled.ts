import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PaginaStd = styled(motion.div)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: ${({ theme }) => theme.espaco.g};
	grid-auto-flow: row;
	grid-template-areas:
		'cabecalho cabecalho cabecalho cabecalho'
		'principal principal principal lateral'
		'outros outros outros lateral'
		'rodape rodape rodape rodape';
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;
