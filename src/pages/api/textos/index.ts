import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/PrismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { campos, limite, tipoId },
  } = req;
  switch (method) {
    case 'GET':
      try {
        let opcoes: Prisma.TextoFindManyArgs = {
          orderBy: { atualizadoEm: 'desc' },
          where: {
            AND: [{ publicadoEm: { lte: new Date() } }, { status: 'PUBLICO' }],
          },
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

        if (limite) opcoes = { ...opcoes, take: Number(limite) };

        if (tipoId)
          opcoes = { ...opcoes, where: { Tipo: { id: Number(tipoId) } } };

        return res.json(await prisma.texto.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
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
          status,
          publicadoEm,
          Tags,
          Comentarios,
        }: Prisma.TextoCreateInput = body;

        const slug = titulo
          ? titulo
              .toLowerCase()
              .replace(/\s/g, '-')
              .replace(new RegExp('\\.'), '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') +
            '-' +
            format(
              publicadoEm ? new Date(publicadoEm) : new Date(),
              'yyyy-MM-dd'
            )
          : conteudo
              .split(' ')
              .slice(0, 5)
              .join('-')
              .toLowerCase()
              .replace(new RegExp('\\.'), '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') +
            '-' +
            format(
              publicadoEm ? new Date(publicadoEm) : new Date(),
              'yyyy-MM-dd'
            );

        return res.json(
          await prisma.texto.create({
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
      } catch (erro) {
        return res.json({ erro });
      }
    default:
      return res.json({ erro: 'Método não permitido' });
  }
}
