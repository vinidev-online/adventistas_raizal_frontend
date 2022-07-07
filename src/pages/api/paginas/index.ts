import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/PrismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { campos },
  } = req;
  switch (method) {
    case 'GET':
      try {
        let opcoes: Prisma.PaginaFindManyArgs = { orderBy: { titulo: 'asc' } };

        if (campos) {
          campos
            .toString()
            .split('-')
            .map(campo => {
              opcoes = {
                ...opcoes,
                select: { ...opcoes.select, [campo]: true },
              };
            });
        }

        return res.json(await prisma.pagina.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const {
          titulo,
          subtitulo,
          conteudo,
          acessos,
          Usuario,
        }: Prisma.PaginaCreateInput = body;

        const slug = titulo
          .toLowerCase()
          .replace(/\s/g, '-')
          .replace(new RegExp('\\.', 'g'), '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return res.json(
          await prisma.pagina.create({
            data: {
              titulo,
              slug,
              subtitulo,
              conteudo,
              acessos,
              Usuario,
              atualizadoEm: new Date(),
            },
          })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
