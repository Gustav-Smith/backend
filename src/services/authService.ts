// src/services/authService.ts

import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ── Registrar um novo usuário ───────────────────────────────
export const registrar = async (dados: {
  nome: string
  email: string
  senha: string
}) => {
  // Verifica se o email já está em uso
  const emailExistente = await prisma.usuario.findUnique({
    where: { email: dados.email },
  })

  if (emailExistente) {
    throw new Error('Email já cadastrado')
  }

  // Criptografa a senha antes de salvar
  // O número 10 é o "salt rounds" — quanto maior, mais seguro e mais lento
  const senhaCriptografada = await bcrypt.hash(dados.senha, 10)

  const usuario = await prisma.usuario.create({
    data: {
      nome: dados.nome,
      email: dados.email,
      senha: senhaCriptografada,
    },
  })

  // Nunca retorna a senha, mesmo criptografada
  const { senha: _, ...usuarioSemSenha } = usuario
  return usuarioSemSenha
}

// ── Fazer login ─────────────────────────────────────────────
export const login = async (dados: {
  email: string
  senha: string
}) => {
  // Busca o usuário pelo email
  const usuario = await prisma.usuario.findUnique({
    where: { email: dados.email },
  })

  // Mensagem genérica — não revela se o email existe ou não
  if (!usuario) {
    throw new Error('Email ou senha inválidos')
  }

  // Compara a senha enviada com a senha criptografada no banco
  const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha)

  if (!senhaCorreta) {
    throw new Error('Email ou senha inválidos')
  }

  // Gera o token JWT
  const token = jwt.sign(
    // Payload — dados que ficam dentro do token (não coloque senha aqui)
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    // Secret — chave secreta para assinar o token (vem do .env)
    process.env.JWT_SECRET as string,
    // Opções — o token expira em 7 dias
    { expiresIn: '7d' }
  )

  const { senha: _, ...usuarioSemSenha } = usuario

  return {
    usuario: usuarioSemSenha,
    token,
  }
}