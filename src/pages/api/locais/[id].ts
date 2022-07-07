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
    query: { campos, id },
  } = req;
  switch (method) {
    case 'GET':
      try {
        let opcoes: Prisma.LocalFindFirstArgs = { where: { id: Number(id) } };

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

        return res.json(await prisma.local.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'PATCH':
      try {
        const { nome, endereco, latitude, longitude }: Prisma.LocalUpdateInput =
          body;

        return res.json(
          await prisma.local.update({
            where: { id: Number(id) },
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
    case 'DELETE':
      try {
        return res.json(
          await prisma.local.delete({ where: { id: Number(id) } })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
