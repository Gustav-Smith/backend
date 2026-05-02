// src/controllers/authController.ts

import { Request, Response } from 'express'
import * as authService from '../services/authService'

// ── POST /auth/registrar ────────────────────────────────────
export const registrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
      res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' })
      return
    }

    // Validação básica de senha
    if (senha.length < 6) {
      res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 caracteres' })
      return
    }

    const usuario = await authService.registrar({ nome, email, senha })
    res.status(201).json(usuario)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' })
  }
}

// ── POST /auth/login ────────────────────────────────────────
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      res.status(400).json({ mensagem: 'Email e senha são obrigatórios' })
      return
    }

    const resultado = await authService.login({ email, senha })
    res.json(resultado)
  } catch (error) {
    if (error instanceof Error) {
      // 401 = não autorizado
      res.status(401).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao fazer login' })
  }
}