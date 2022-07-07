import { Prisma } from '@prisma/client';
import { hashSync } from 'bcryptjs';
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
        let opcoes: Prisma.UsuarioFindManyArgs = { orderBy: { nome: 'asc' } };

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

        return res.json(await prisma.usuario.findMany(opcoes));
      } catch (erro) {
        console.log(erro);
        return res.json({ erro });
      }
    case 'POST':
      try {
        const {
          email,
          nome,
          dataNascimento,
          genero,
          bio,
          foto,
          whatsapp,
          facebook,
          instagram,
          perfil,
          status,
        }: Prisma.UsuarioCreateInput = body;

        const [senha, resto] = email.split('@');

        return res.json(
          await prisma.usuario.create({
            data: {
              email,
              senha: hashSync(senha, 10),
              nome,
              dataNascimento,
              genero,
              bio,
              foto,
              whatsapp,
              facebook,
              instagram,
              perfil,
              status,
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
