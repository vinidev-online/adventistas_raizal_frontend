import type { NextPage } from 'next';
import Head from 'next/head';
import { Pagina } from '../components/Layout/Pagina';
import { Outros } from '../components/Secoes/Outros';
import { Principal } from '../components/Secoes/Principal';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Adventistas Raizal</title>
			</Head>
			<Pagina>
				<Principal />
				<Outros />
			</Pagina>
		</>
	);
};

export default Home;
