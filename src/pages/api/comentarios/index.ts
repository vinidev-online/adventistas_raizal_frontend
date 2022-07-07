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
        let opcoes: Prisma.ComentarioFindManyArgs = {
          orderBy: { atualizadoEm: 'desc' },
        };

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

        return res.json(await prisma.comentario.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const { titulo, conteudo, autor }: Prisma.ComentarioCreateInput = body;

        return res.json(
          await prisma.comentario.create({
            data: {
              titulo,
              conteudo,
              autor,
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
