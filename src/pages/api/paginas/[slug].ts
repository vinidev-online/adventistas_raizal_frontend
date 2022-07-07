import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/PrismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { campos, slug },
  } = req;
  switch (method) {
    case 'GET':
      try {
        let opcoes: Prisma.PaginaFindFirstArgs = {
          where: { slug: slug.toString() },
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

        return res.json(await prisma.pagina.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }

    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
