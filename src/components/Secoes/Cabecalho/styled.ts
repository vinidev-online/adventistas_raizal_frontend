import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const CabecalhoStd = styled(motion.header)`
	background: linear-gradient(
		to bottom,
		${({ theme }) => theme.cor.fundo},
		transparent
	);
	display: flex;
	flex-direction: column;
	height: 12vh;
	padding: 0 ${({ theme }) => theme.espaco.xxxg};
	position: fixed;
	width: 100%;
	z-index: 99;
	.linha-superior {
		background: linear-gradient(
			to right,
			${({ theme }) => theme.cor.primario},
			${({ theme }) => theme.cor.secundario}
		);
		height: 2px;
		width: 100%;
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const NavStd = styled(motion.nav)`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: space-between;
	width: 100%;
	.busca {
		background: none;
		border: none;
		color: ${({ theme }) => theme.cor.texto};
		cursor: pointer;
		svg {
			font-size: 1rem;
		}
	}
	.logo {
		align-items: center;
		display: flex;
		justify-content: center;
		svg {
			color: ${({ theme }) => theme.cor.primario};
			height: 9vh;
		}
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const ItensStd = styled(motion.div)`
	display: contents;
	.link {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const NomeStd = styled(motion.span)`
	align-items: center;
	cursor: pointer;
	display: flex;
	height: 100%;
	justify-content: center;
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const SubItemStd = styled(motion.div)`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	position: relative;
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;

export const SubMenuStd = styled(motion.div)`
	display: flex;
	justify-content: center;
	position: absolute;
	top: 100%;
	.cont-submenu {
		background: ${({ theme }) => theme.cor.fundo};
		border-bottom: 4pt solid ${({ theme }) => theme.cor.primario};
		border-radius: ${({ theme }) => theme.espaco.g};
		box-shadow: 0 1px 0 1px
			${({ theme }) => transparentize(0.75, theme.cor.texto)};
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		overflow: hidden;
		position: absolute;
		z-index: 2;
		a {
			padding: ${({ theme }) => theme.espaco.g};
			&:hover {
				background: ${({ theme }) => theme.cor.primario};
				color: ${({ theme }) => theme.cor.fundo};
				transition: all 0.25s ease-in-out;
			}
		}
	}
	.seta {
		aspect-ratio: 1/1;
		background: ${({ theme }) => theme.cor.fundo};
		position: absolute;
		width: 1vw;
		top: -0.5vw;
		transform: rotate(45deg);
		z-index: 1;
	}
	@media screen and (max-width: 600px) {
	}
	@media screen and (min-width: 601px) and (max-width: 768px) {
	}
	@media screen and (min-width: 769px) {
	}
`;
