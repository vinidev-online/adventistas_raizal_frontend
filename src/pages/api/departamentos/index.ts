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
        let opcoes: Prisma.DepartamentoFindManyArgs = {
          orderBy: { nome: 'asc' },
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

        return res.json(await prisma.departamento.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const {
          nome,
          abreviacao,
          imagem,
          cor,
        }: Prisma.DepartamentoCreateInput = body;

        const slug = abreviacao
          .toLowerCase()
          .replace(/\s/g, '')
          .replace(new RegExp('\\.', 'g'), '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return res.json(
          await prisma.departamento.create({
            data: {
              nome,
              abreviacao,
              slug,
              imagem,
              cor,
            },
          })
        );
      } catch (erro) {
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
