// src/controllers/promotorController.ts

import { Request, Response } from 'express'
import * as promotorService from '../services/promotorService'

// ── GET /promotores ─────────────────────────────────────────
export const listar = async (req: Request, res: Response) => {
  try {
    const promotores = await promotorService.listarPromotores()
    res.json(promotores)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar promotores' })
  }
}

// ── GET /promotores/:id ─────────────────────────────────────
export const buscarPorId = async (req: Request, res: Response) => {
  try {
    // O id vem como string na URL, então convertemos para número
    const id = Number(req.params.id)

    const promotor = await promotorService.buscarPromotorPorId(id)

    if (!promotor) {
      // 404 = não encontrado
      res.status(404).json({ mensagem: 'Promotor não encontrado' })
      return
    }

    res.json(promotor)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar promotor' })
  }
}

// ── POST /promotores ────────────────────────────────────────
export const criar = async (req: Request, res: Response) => {
  try {
    // Os dados vêm no corpo da requisição (req.body)
    const { nome, email, telefone } = req.body

    // Validação básica — campos obrigatórios
    if (!nome || !email) {
      // 400 = requisição inválida
      res.status(400).json({ mensagem: 'Nome e email são obrigatórios' })
      return
    }

    const promotor = await promotorService.criarPromotor({ nome, email, telefone })

    // 201 = criado com sucesso
    res.status(201).json(promotor)
  } catch (error) {
    // Se o service lançou um erro conhecido, retorna a mensagem dele
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao criar promotor' })
  }
}

// ── PUT /promotores/:id ─────────────────────────────────────
export const atualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, email, telefone, ativo } = req.body

    const promotor = await promotorService.atualizarPromotor(id, {
      nome,
      email,
      telefone,
      ativo,
    })

    res.json(promotor)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao atualizar promotor' })
  }
}

// ── DELETE /promotores/:id ──────────────────────────────────
export const deletar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    await promotorService.deletarPromotor(id)

    res.json({ mensagem: 'Promotor deletado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao deletar promotor' })
  }
}