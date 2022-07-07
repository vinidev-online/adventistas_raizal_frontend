import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/PrismaClient';

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
        let opcoes: Prisma.AnuncioFindFirstArgs = { where: { id: Number(id) } };

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

        return res.json(await prisma.anuncio.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'PATCH':
      try {
        const { data, slides, Usuario }: Prisma.AnuncioUpdateInput = body;

        if (data) {
          const slug = format(data as Date, 'yyyy-MM-dd');

          return res.json(
            await prisma.anuncio.update({
              where: { id: Number(id) },
              data: {
                data,
                slug,
                slides,
                Usuario,
              },
            })
          );
        } else {
          return res.json(
            await prisma.anuncio.update({
              where: { id: Number(id) },
              data: {
                data,
                slides,
                Usuario,
              },
            })
          );
        }
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'DELETE':
      try {
        return res.json(
          await prisma.anuncio.delete({ where: { id: Number(id) } })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
