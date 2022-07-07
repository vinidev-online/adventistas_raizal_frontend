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
        let opcoes: Prisma.LocalFindManyArgs = { orderBy: { nome: 'asc' } };

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

        return res.json(await prisma.local.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const { nome, endereco, latitude, longitude }: Prisma.LocalCreateInput =
          body;

        return res.json(
          await prisma.local.create({
            data: {
              nome,
              endereco,
              latitude,
              longitude,
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
