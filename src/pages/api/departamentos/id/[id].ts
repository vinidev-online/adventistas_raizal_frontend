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
        let opcoes: Prisma.DepartamentoFindFirstArgs = {
          where: { id: Number(id) },
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

        return res.json(await prisma.departamento.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'PATCH':
      try {
        const {
          nome,
          abreviacao,
          imagem,
          cor,
        }: Prisma.DepartamentoUpdateInput = body;

        if (nome) {
          const slug = abreviacao
            .toString()
            .toLowerCase()
            .replace(/\s/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return res.json(
            await prisma.departamento.update({
              where: { id: Number(id) },
              data: {
                nome,
                abreviacao,
                slug,
                imagem,
                cor,
              },
            })
          );
        } else {
          return res.json(
            await prisma.departamento.update({
              where: { id: Number(id) },
              data: {
                nome,
                abreviacao,
                imagem,
                cor,
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
          await prisma.departamento.delete({ where: { id: Number(id) } })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
