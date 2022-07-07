import { faker } from '@faker-js/faker/locale/pt_BR';
import { Prisma, TextoStatus } from '@prisma/client';
import { api } from '../lib/api';

const geraDepartamentos = async () => {
  const departamentos = [
    {
      nome: 'Igreja Adventista',
      abreviacao: 'Igreja',
      imagem: 'departamentos/geral_g3qsxx.jpg',
      cor: '#004d99',
    },
    {
      nome: 'Ação Solidária Adventista',
      abreviacao: 'ASA',
      imagem: 'departamentos/asa_pas3gh.jpg',
      cor: '#bb922e',
    },
    {
      nome: 'Aventureiros',
      abreviacao: 'Aventureiros',
      imagem: 'departamentos/aventureiros_phrgvm.jpg',
      cor: '#36142e',
    },
    {
      nome: 'Comunicação',
      abreviacao: 'Comunicação',
      imagem: 'departamentos/comunicacao_khxnyr.jpg',
      cor: '#e3421e',
    },
    {
      nome: 'Desbravadores',
      abreviacao: 'Desbravadores',
      imagem: 'departamentos/desbravadores_bdgmzz.jpg',
      cor: '#b1251a',
    },
    {
      nome: 'Educação',
      abreviacao: 'Educação',
      imagem: 'departamentos/educacao_lo7t7l.jpg',
      cor: '#bb922e',
    },
    {
      nome: 'Escola Sabatina',
      abreviacao: 'Esc. Sabat.',
      imagem: 'departamentos/escsabatina_ekyikp.jpg',
      cor: '#476a38',
    },
    {
      nome: 'Espírito de Profecia',
      abreviacao: 'Esp. Profecia',
      imagem: 'departamentos/espprofecia_q5fcxb.jpg',
      cor: '#204c32',
    },
    {
      nome: 'Evangelismo',
      abreviacao: 'Evangelismo',
      imagem: 'departamentos/evangelismo_i5fndz.jpg',
      cor: '#521a11',
    },
    {
      nome: 'Liberdade Religiosa',
      abreviacao: 'Lib. Relig.',
      imagem: 'departamentos/libreligiosa_rgiw0h.jpg',
      cor: '#862b2e',
    },
    {
      nome: 'Ministério da Criança',
      abreviacao: 'Crianças',
      imagem: 'departamentos/criancas_zeujdk.jpg',
      cor: '#20166e',
    },
    {
      nome: 'Ministério da Família',
      abreviacao: 'Família',
      imagem: 'departamentos/familia_aqzrj9.jpg',
      cor: '#dd7630',
    },
    {
      nome: 'Ministério da Mulher',
      abreviacao: 'Mulher',
      imagem: 'departamentos/mulher_oa3mtz.jpg',
      cor: '#9e324e',
    },
    {
      nome: 'Música',
      abreviacao: 'Música',
      imagem: 'departamentos/musica_ddnpqj.jpg',
      cor: '#542651',
    },
    {
      nome: 'Publicações',
      abreviacao: 'Publicações',
      imagem: 'departamentos/publicacoes_zvsdse.jpg',
      cor: '#548c95',
    },
    {
      nome: 'Ministério do Adolescente',
      abreviacao: 'Adolescentes',
      imagem: 'departamentos/adolescentes_pcnqld.jpg',
      cor: '#832b34',
    },
    {
      nome: 'Jovens',
      abreviacao: 'Jovens',
      imagem: 'departamentos/jovens_qgbeqk.jpg',
      cor: '#20166e',
    },
    {
      nome: 'Ministério Pessoal',
      abreviacao: 'Min. Pessoal',
      imagem: 'departamentos/minpessoal_s51mfk.jpg',
      cor: '#853035',
    },
    {
      nome: 'Missão Global',
      abreviacao: 'Miss. Global',
      imagem: 'departamentos/misglobal_hoy221.jpg',
      cor: '#3f796b',
    },
    {
      nome: 'Mordomia Cristã',
      abreviacao: 'Mordomia',
      imagem: 'departamentos/mordomia_chrbxj.jpg',
      cor: '#77662c',
    },
    {
      nome: 'Saúde',
      abreviacao: 'Saúde',
      imagem: 'departamentos/saude_thjvxh.jpg',
      cor: '#3f4500',
    },
    {
      nome: 'Serviço Voluntário Adventista',
      abreviacao: 'Voluntários',
      imagem: 'departamentos/voluntarios_qugpkj.jpg',
      cor: '#2f73a8',
    },
  ];

  const { data: deps } = await api.get('departamentos');
  if (deps.length === 0)
    await Promise.all(
      departamentos.map(async dep => {
        await api.post('departamentos', dep);
      })
    );
};

const geraUsuarios = async () => {
  let usuarios = [];
  let usuario = {};

  for (let i = 0; i < faker.mersenne.rand(15, 10); i++) {
    const genero = faker.name.gender(true).toUpperCase();
    const nome = `${faker.name.firstName(
      genero === 'MASCULINO' ? 'male' : 'female'
    )} ${faker.name.lastName()} ${faker.name.lastName()}`;
    const nomeUsuario = faker.internet
      .userName(nome.split(' ')[0], nome.split(' ')[nome.length - 1])
      .toLowerCase()
      .normalize()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    usuario = {
      email: faker.internet
        .email(nome.split(' ')[0], nome.split(' ')[nome.length - 1])
        .toLowerCase(),
      nome,
      dataNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
      genero,
      bio: faker.lorem.paragraph(),
      foto: faker.helpers.maybe(
        () => 'https://picsum.photos/seed/picsum/300/300'
      ),
      whatsapp: faker.phone.number('(63) 992##-####'),
      facebook: nomeUsuario,
      instagram: nomeUsuario,
      perfil: faker.helpers.arrayElement(['ADMINISTRADOR', 'USUARIO']),
      status: 'PENDENTE',
    };

    usuarios.push(usuario);
  }

  const { data: usuariosData } = await api.get('usuarios');
  if (usuariosData.length === 0)
    await Promise.all(
      usuarios.map(async usuario => {
        await api.post('usuarios', usuario);
      })
    );
};

const geraLocais = async () => {
  let locais = [];
  let local = {};
  for (let i = 0; i < faker.mersenne.rand(12, 8); i++) {
    local = {
      nome: faker.company.companyName(),
      endereco: faker.address.streetAddress(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
    };
    locais.push(local);
  }

  const { data: locaisData } = await api.get('locais');
  if (locaisData.length === 0)
    await Promise.all(
      locais.map(async local => {
        await api.post('locais', local);
      })
    );
};

const geraTipos = async () => {
  let tipos = [
    { nome: 'Artigo' },
    { nome: 'Notícia' },
    { nome: 'Aviso' },
    { nome: 'Evento' },
    { nome: 'Vídeo' },
  ];

  const { data: tiposData } = await api.get('tipos');
  if (tiposData.length === 0)
    await Promise.all(
      tipos.map(async tipo => {
        await api.post('tipos', tipo);
      })
    );
};

const geraTextos = async () => {
  let textos: Prisma.TextoCreateInput[] = [];
  let texto: Prisma.TextoCreateInput | {} = {};

  const { data: deps } = await api.get<{ id: number }[]>(
    'departamentos?campos=id'
  );
  const { data: tipos } = await api.get<{ id: number; nome: string }[]>(
    'tipos?campos=id-nome'
  );
  const { data: us } = await api.get<{ id: number }[]>('usuarios?campos=id');

  for (let i = 0; i < faker.mersenne.rand(40, 25); i++) {
    const depsEsc = faker.helpers.arrayElements(
      deps,
      faker.mersenne.rand(3, 1)
    );

    const tipo = faker.helpers.arrayElement(tipos);
    const acessos = faker.mersenne.rand(999, 1);
    const likes = faker.mersenne.rand(acessos, 1);
    const status = faker.helpers.arrayElement(['PUBLICO', 'RASCUNHO']);
    const usIds = us?.map(u => u.id);
    const tags = faker.helpers.uniqueArray(
      faker.lorem.word,
      faker.mersenne.rand(6, 3)
    );
    const coments: { titulo: string; conteudo: string; autor: string }[] = [];
    for (let j = 0; j < faker.mersenne.rand(5, 1); j++) {
      coments.push({
        titulo: faker.lorem.sentence(),
        conteudo: faker.lorem.paragraph(),
        autor: faker.name.findName(),
      });
    }

    texto = {
      Departamentos: { connect: depsEsc },
      Tipo: { connect: { id: tipo.id } },
      conteudo:
        tipo.nome === 'Aviso'
          ? faker.lorem.sentence()
          : '<p>' +
            faker.lorem
              .paragraphs(faker.mersenne.rand(6, 3), '#')
              .replace(new RegExp('#', 'g'), '</p><p>') +
            '</p>',
      acessos,
      likes,
      status,
      Usuario: { connect: { id: faker.helpers.arrayElement(usIds) } },
      Tags: {
        connectOrCreate: tags?.map(t => ({
          where: { nome: t },
          create: {
            nome: t,
            slug: t
              .toLowerCase()
              .replace(new RegExp('\\.', 'g'), '')
              .normalize()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          },
        })),
      },
      Comentarios: { createMany: { data: coments } },
      atualizadoEm: new Date(),
    };

    if (tipo.nome === 'Evento') {
      const { data: locais } = await api.get<{ id: number }[]>(
        'locais?campos=id'
      );
      const localEsc = faker.helpers.arrayElement(locais?.map(l => l.id));

      let Evento = faker.helpers.maybe(() => ({
        create: {
          data: faker.date.soon(),
          Local: { connect: { id: localEsc } },
        },
      }));
      if (Evento) texto = { ...texto, Evento };
    }

    if (tipo.nome !== 'Aviso')
      texto = { ...texto, titulo: faker.lorem.sentence() };

    let subtitulo = faker.helpers.maybe(() => faker.lorem.sentence());
    if (subtitulo) texto = { ...texto, subtitulo };

    let fonte = faker.helpers.maybe(() =>
      faker.internet.domainName().toLowerCase()
    );
    if (fonte) texto = { ...texto, fonte };

    let video = faker.helpers.maybe(() => faker.random.alphaNumeric(8));
    if (video) texto = { ...texto, video };

    if (status === 'PUBLICO') {
      let publicadoEm = faker.helpers.arrayElement([
        new Date(),
        faker.date.soon(30),
      ]);
      texto = { ...texto, publicadoEm };
    }

    textos.push(texto as Prisma.TextoCreateInput);
  }

  const { data: textosData } = await api.get('textos');
  if (textosData.length === 0)
    Promise.all(await textos?.map(async t => await api.post('textos', t)));
};

const geraAnuncio = async () => {
  const { data: avisos } = await api.get<{ id: number }[]>(
    `textos?campos=id&tipoId=4&limite=${faker.mersenne.rand(5, 1)}`
  );
  const { data: eventos } = await api.get<{ id: number }[]>(
    `textos?campos=id&tipoId=3&limite=${faker.mersenne.rand(5, 1)}`
  );
  const slides = avisos.concat(eventos);

  const { data: us } = await api.get<{ id: number }[]>('usuarios?campos=id');
  const usEsc = faker.helpers.arrayElement(us);

  let anuncio: Prisma.AnuncioCreateInput = {
    data: faker.date.soon(7),
    slides: { connect: slides },
    Usuario: { connect: usEsc },
  };

  const { data: anunciosData } = await api.get('anuncios');
  if (anunciosData.length === 0) await api.post('anuncios', anuncio);
};

const geraPaginas = async () => {
  let paginas: Prisma.PaginaCreateInput[] = [];
  let pagina: Prisma.PaginaCreateInput | {} = {};

  const { data: us } = await api.get<{ id: number }[]>('usuarios?campos=id');

  for (let i = 0; i < faker.mersenne.rand(4, 7); i++) {
    const usEsc = faker.helpers.arrayElement(us);
    pagina = {
      titulo: faker.lorem
        .sentence(faker.mersenne.rand(3, 1))
        .replace(new RegExp('\\.', 'g'), ''),
      subtitulo: faker.helpers.maybe(() => faker.lorem.paragraph()),
      conteudo:
        '<p>' +
        faker.lorem
          .paragraphs(faker.mersenne.rand(6, 3), '#')
          .replace(new RegExp('#', 'g'), '</p><p>') +
        '</p>',
      Usuario: { connect: usEsc },
      acessos: faker.mersenne.rand(999, 1),
    };

    paginas.push(pagina as Prisma.PaginaCreateInput);
  }

  const { data: paginasData } = await api.get('paginas');
  if (paginasData.length === 0)
    Promise.all(await paginas?.map(async p => await api.post('paginas', p)));
};

const geraTexto = async () => {
  let texto: Prisma.TextoCreateInput | {} = {};

  const { data: deps } = await api.get<{ id: number }[]>(
    'departamentos?campos=id'
  );
  const { data: tipos } = await api.get<{ id: number; nome: string }[]>(
    'tipos?campos=id-nome'
  );
  const { data: us } = await api.get<{ id: number }[]>('usuarios?campos=id');

  const depsEsc = faker.helpers.arrayElements(deps, faker.mersenne.rand(3, 1));

  const tipo = faker.helpers.arrayElement(tipos);
  const acessos = faker.mersenne.rand(999, 1);
  const likes = faker.mersenne.rand(acessos, 1);
  const status = faker.helpers.arrayElement(['PUBLICO', 'RASCUNHO']);
  const usIds = us?.map(u => u.id);
  const tags = faker.helpers.uniqueArray(
    faker.lorem.word,
    faker.mersenne.rand(6, 3)
  );
  const coments: { titulo: string; conteudo: string; autor: string }[] = [];
  for (let j = 0; j < faker.mersenne.rand(5, 1); j++) {
    coments.push({
      titulo: faker.lorem.sentence(),
      conteudo: faker.lorem.paragraph(),
      autor: faker.name.findName(),
    });
  }

  texto = {
    Departamentos: { connect: depsEsc },
    Tipo: { connect: { id: tipo.id } },
    conteudo:
      tipo.nome === 'Aviso'
        ? faker.lorem.sentence()
        : '<p>' +
          faker.lorem
            .paragraphs(faker.mersenne.rand(6, 3), '#')
            .replace(new RegExp('#', 'g'), '</p><p>') +
          '</p>',
    acessos,
    likes,
    status,
    Usuario: { connect: { id: faker.helpers.arrayElement(usIds) } },
    Tags: {
      connectOrCreate: tags?.map(t => ({
        where: { nome: t },
        create: {
          nome: t,
          slug: t
            .toLowerCase()
            .replace(new RegExp('\\.', 'g'), '')
            .normalize()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''),
        },
      })),
    },
    Comentarios: { createMany: { data: coments } },
    atualizadoEm: new Date(),
  };

  if (tipo.nome === 'Evento') {
    const { data: locais } = await api.get<{ id: number }[]>(
      'locais?campos=id'
    );
    const localEsc = faker.helpers.arrayElement(locais?.map(l => l.id));

    let Evento = faker.helpers.maybe(() => ({
      create: {
        data: faker.date.soon(),
        Local: { connect: { id: localEsc } },
      },
    }));
    if (Evento) texto = { ...texto, Evento };
  }

  if (tipo.nome !== 'Aviso')
    texto = { ...texto, titulo: faker.lorem.sentence() };

  let subtitulo = faker.helpers.maybe(() => faker.lorem.sentence());
  if (subtitulo) texto = { ...texto, subtitulo };

  let fonte = faker.helpers.maybe(() =>
    faker.internet.domainName().toLowerCase()
  );
  if (fonte) texto = { ...texto, fonte };

  let video = faker.helpers.maybe(() => faker.random.alphaNumeric(8));
  if (video) texto = { ...texto, video };

  if (status === 'PUBLICO') {
    let publicadoEm = faker.helpers.arrayElement([
      new Date(),
      faker.date.soon(30),
    ]);
    texto = { ...texto, publicadoEm };
  }

  await api.post('textos', texto);
};

export const geraConteudo = async () => {
  await geraDepartamentos();
  await geraUsuarios();
  await geraLocais();
  await geraTipos();
  await geraTextos();
  await geraAnuncio();
  await geraPaginas();
  await geraTexto();
};
