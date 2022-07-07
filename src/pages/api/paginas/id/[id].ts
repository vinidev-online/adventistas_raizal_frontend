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
        let opcoes: Prisma.PaginaFindFirstArgs = { where: { id: Number(id) } };

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
    case 'PATCH':
      try {
        const {
          titulo,
          subtitulo,
          conteudo,
          Usuario,
        }: Prisma.PaginaUpdateInput = body;

        if (titulo) {
          const slug = titulo;
          toString()
            .toLowerCase()
            .replace(/\s/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return res.json(
            await prisma.pagina.update({
              where: { id: Number(id) },
              data: {
                titulo,
                slug,
                subtitulo,
                conteudo,
                Usuario,
                atualizadoEm: new Date(),
              },
            })
          );
        }
        return res.json(
          await prisma.pagina.update({
            where: { id: Number(id) },
            data: {
              titulo,
              subtitulo,
              conteudo,
              Usuario,
              atualizadoEm: new Date(),
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
          await prisma.pagina.delete({ where: { id: Number(id) } })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
