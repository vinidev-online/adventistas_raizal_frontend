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
        let opcoes: Prisma.TextoFindFirstArgs = {
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
        } else {
          opcoes = {
            ...opcoes,
            include: {
              Departamentos: true,
              Tipo: true,
              Evento: true,
              Tags: true,
              Comentarios: true,
            },
          };
        }

        return res.json(await prisma.texto.findFirst(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'PATCH':
      try {
        const {
          Departamentos,
          Tipo,
          Evento,
          imagem,
          video,
          titulo,
          subtitulo,
          conteudo,
          acessos,
          likes,
          fonte,
          publicadoEm,
          Tags,
          Comentarios,
        }: Prisma.TextoUpdateInput = body;

        if (titulo) {
          const slug = titulo
            .toString()
            .toLowerCase()
            .replace(/\s/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return res.json(
            await prisma.texto.update({
              where: { id: Number(id) },
              data: {
                Departamentos,
                Tipo,
                Evento,
                imagem,
                video,
                titulo,
                slug,
                subtitulo,
                conteudo,
                acessos,
                likes,
                fonte,
                status,
                publicadoEm: publicadoEm || new Date(),
                Tags,
                Comentarios,
                atualizadoEm: new Date(),
              },
            })
          );
        } else {
          return res.json(
            await prisma.texto.update({
              where: { id: Number(id) },
              data: {
                Departamentos,
                Tipo,
                Evento,
                imagem,
                video,
                titulo,
                subtitulo,
                conteudo,
                acessos,
                likes,
                fonte,
                status,
                publicadoEm: publicadoEm || new Date(),
                Tags,
                Comentarios,
                atualizadoEm: new Date(),
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
          await prisma.texto.delete({ where: { id: Number(id) } })
        );
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
