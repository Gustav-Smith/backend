// src/controllers/lojaController.ts

import { Request, Response } from 'express'
import * as lojaService from '../services/lojaService'

// ── GET /lojas ──────────────────────────────────────────────
export const listar = async (req: Request, res: Response) => {
  try {
    const lojas = await lojaService.listarLojas()
    res.json(lojas)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar lojas' })
  }
}

// ── GET /lojas/:id ──────────────────────────────────────────
export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const loja = await lojaService.buscarLojaPorId(id)

    if (!loja) {
      res.status(404).json({ mensagem: 'Loja não encontrada' })
      return
    }

    res.json(loja)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar loja' })
  }
}

// ── POST /lojas ─────────────────────────────────────────────
export const criar = async (req: Request, res: Response) => {
  try {
    const { nome, endereco, cidade } = req.body

    if (!nome || !endereco || !cidade) {
      res.status(400).json({ mensagem: 'Nome, endereço e cidade são obrigatórios' })
      return
    }

    const loja = await lojaService.criarLoja({ nome, endereco, cidade })
    res.status(201).json(loja)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar loja' })
  }
}

// ── PUT /lojas/:id ──────────────────────────────────────────
export const atualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, endereco, cidade, ativo } = req.body

    const loja = await lojaService.atualizarLoja(id, { nome, endereco, cidade, ativo })
    res.json(loja)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao atualizar loja' })
  }
}

// ── DELETE /lojas/:id ───────────────────────────────────────
export const deletar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await lojaService.deletarLoja(id)
    res.json({ mensagem: 'Loja deletada com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao deletar loja' })
  }
}