import { motion, Variants } from 'framer-motion';
import { CircleWavyWarning } from 'phosphor-react';
import { FC } from 'react';
import { CarregandoPaginaStd, CarregandoStd, VazioStd } from './styled';

type CarregandoProps = {
	tom?: 'claro' | 'escuro';
};

const GiraEfeito: Variants = {
	inicio: {
		rotate: '0deg',
	},
	final: {
		rotate: '360deg',
		transition: {
			type: 'tween',
			duration: Infinity,
		},
	},
};

export const Carregando: FC<CarregandoProps> = ({ tom = 'escuro' }) => (
	<CarregandoStd tom={tom}>
		<motion.div
			variants={GiraEfeito}
			initial="inicio"
			animate="final">
			<CircleWavyWarning />
		</motion.div>
	</CarregandoStd>
);

export const Vazio: FC<CarregandoProps> = ({ tom = 'escuro' }) => (
	<VazioStd tom={tom}>
		<motion.div
			variants={GiraEfeito}
			initial="inicio"
			animate="final">
			<CircleWavyWarning />
		</motion.div>
	</VazioStd>
);

export const CarregandoPagina: FC = () => (
	<CarregandoPaginaStd>
		<motion.div
			variants={GiraEfeito}
			initial="inicio"
			animate="final">
			<CircleWavyWarning />
		</motion.div>
	</CarregandoPaginaStd>
);
