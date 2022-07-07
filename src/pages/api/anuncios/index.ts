import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
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
        let opcoes: Prisma.AnuncioFindManyArgs = { orderBy: { data: 'asc' } };

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

        return res.json(await prisma.anuncio.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const { data, slides, Usuario }: Prisma.AnuncioCreateInput = body;

        const slug = format(new Date(data), 'yyyy-MM-dd');

        return res.json(
          await prisma.anuncio.create({
            data: {
              data,
              slug,
              slides,
              Usuario,
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
