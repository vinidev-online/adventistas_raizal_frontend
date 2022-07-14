import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PrincipalStd = styled(motion.main)`
	width: 100%;
	height: 80vh;
	overflow: hidden;
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const FundoStd = styled(motion.div)`
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	z-index: 1;
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;
