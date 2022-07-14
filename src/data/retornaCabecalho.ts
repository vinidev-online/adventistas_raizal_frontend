import { api } from '../lib/api';

export type ItemProps = {
	nome: string;
	slug: string;
	itens?: ItemProps[] | SubItemProps[];
};

type SubItemProps = {
	nome: string;
	slug?: string;
	abreviacao?: string;
	titulo?: string;
};

const retornaDeps = async (): Promise<SubItemProps[]> => {
	const { data } = await api.get<SubItemProps[]>(
		'departamentos?campos=abreviacao-slug'
	);
	return data?.map((item) => ({ nome: item.abreviacao, slug: item.slug }));
};

const retornaSecoes = async (): Promise<ItemProps[]> => {
	const { data } = await api.get('tipos?campos=nome-slug');
	return data?.map((item) => ({ nome: item.nome, slug: item.slug }));
};

const retornaPaginas = async (): Promise<SubItemProps[]> => {
	const { data } = await api.get<SubItemProps[]>('paginas?campos=titulo-slug');
	return data?.map((item) => ({ nome: item.titulo, slug: item.slug }));
};

export const retornaCabecalho = async (): Promise<ItemProps[]> => {
	let cabecalho: ItemProps[] = [
		{
			nome: 'Departamentos',
			slug: '',
			itens: await retornaDeps(),
		},
	];
	cabecalho = cabecalho.concat(await retornaSecoes());
	cabecalho = [
		...cabecalho,
		{
			nome: 'Sobre',
			slug: 'paginas',
			itens: [
				...(await retornaPaginas()),
				{ nome: 'Contato', slug: 'contato' },
			],
		},
	];

	return cabecalho;
};
