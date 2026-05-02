// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Extende o tipo Request do Express para incluir o usuário autenticado
// Isso permite acessar req.usuario em qualquer controller protegido
declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number
        email: string
        nome: string
      }
    }
  }
}

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  // Pega o token do header Authorization
  // O header vem assim: "Bearer eyJhbGci..."
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ mensagem: 'Token não fornecido' })
    return
  }

  // Separa "Bearer" do token em si
  const [, token] = authHeader.split(' ')

  if (!token) {
    res.status(401).json({ mensagem: 'Token mal formatado' })
    return
  }

  try {
    // Verifica se o token é válido e não expirou
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number
      email: string
      nome: string
    }

    // Adiciona os dados do usuário na requisição
    // Agora qualquer controller pode acessar req.usuario
    req.usuario = payload

    // Chama o próximo middleware ou o controller
    next()
  } catch (error) {
    res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  }
}