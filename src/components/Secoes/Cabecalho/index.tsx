import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { List, MagnifyingGlass } from 'phosphor-react';
import { FC, useEffect, useState } from 'react';
import { retornaCabecalho } from '../../../data/retornaCabecalho';
import { Logo } from '../../Partes/Logo';
import {
	CabecalhoStd,
	ItensStd,
	NavStd,
	NomeStd,
	SubItemStd,
	SubMenuStd,
} from './styled';

export const Cabecalho: FC = () => {
	const [dados, setDados] = useState([]);
	const transition = { duration: 0.25, type: 'spring' };
	const link: Variants = {
		inicio: {
			opacity: 1,
			scale: 1,
		},
		hover: {
			opacity: 0.75,
			scale: 1.1,
			transition,
		},
	};
	const menu: Variants = {
		inicio: { opacity: 0, y: 10 },
		hover: { opacity: 1, y: 0, transition },
	};

	useEffect(() => {
		async function buscaCabecalho() {
			setDados(await retornaCabecalho());
		}
		buscaCabecalho();
	}, []);

	return (
		<CabecalhoStd>
			<div className="linha-superior" />
			<NavStd>
				<button className="menu">
					<List />
				</button>
				<Link href="/">
					<a className="logo">
						<Logo />
					</a>
				</Link>
				<ItensStd>
					{dados?.map((item, index) =>
						item.itens ? (
							<SubItemStd
								initial="inicio"
								whileHover="hover"
								exit="inicio">
								<NomeStd variants={link}>{item.nome}</NomeStd>
								<SubMenuStd variants={menu}>
									<div className="seta" />
									<div className="cont-submenu">
										{item.itens?.map((subitem, subindex) => (
											<Link
												href={subitem.slug}
												key={subindex}>
												<a>{subitem.nome}</a>
											</Link>
										))}
									</div>
								</SubMenuStd>
							</SubItemStd>
						) : (
							<motion.span
								className="link"
								initial="inicio"
								whileHover="hover"
								exit="inicio"
								variants={link}>
								<Link
									href={`tipos/${item.slug}`}
									key={index}>
									<a>{item.nome}</a>
								</Link>
							</motion.span>
						)
					)}
				</ItensStd>
				<button className="busca">
					<MagnifyingGlass />
				</button>
			</NavStd>
		</CabecalhoStd>
	);
};
