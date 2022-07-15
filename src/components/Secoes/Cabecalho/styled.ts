import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CabecalhoStd = styled(motion.header)`
	grid-area: cabecalho;
	height: 12vh;
	padding: 0 ${({ theme }) => theme.espaco.xxxg};
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;
