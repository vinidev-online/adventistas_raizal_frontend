import { Prisma } from '@prisma/client';
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
        let opcoes: Prisma.TagFindFirstArgs = { where: { id: Number(id) } };

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

        return res.json(await prisma.tag.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'PATCH':
      try {
        const { nome }: Prisma.TagUpdateInput = body;

        if (nome) {
          const slug = nome
            .toString()
            .toLowerCase()
            .replace(/\s/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return res.json(
            await prisma.tag.update({
              where: { id: Number(id) },
              data: {
                nome,
                slug,
              },
            })
          );
        } else {
          return res.json(
            await prisma.tag.update({
              where: { id: Number(id) },
              data: {
                nome,
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
        return res.json(await prisma.tag.delete({ where: { id: Number(id) } }));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
