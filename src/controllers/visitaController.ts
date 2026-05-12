// src/controllers/visitaController.ts

import { Request, Response } from 'express'
import * as visitaService from '../services/visitaService'

// ── GET /visitas ────────────────────────────────────────────
export const listar = async (req: Request, res: Response) => {
  try {
    // Filtros opcionais via query string
    // ex: GET /visitas?status=pendente&promotorId=1
    const promotorId = req.query.promotorId ? Number(req.query.promotorId) : undefined
    const lojaId = req.query.lojaId ? Number(req.query.lojaId) : undefined
    const status = req.query.status as string | undefined

    const visitas = await visitaService.listarVisitas({ promotorId, lojaId, status })
    res.json(visitas)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar visitas' })
  }
}

// ── GET /visitas/metricas ───────────────────────────────────
export const metricas = async (req: Request, res: Response) => {
  try {
    const dados = await visitaService.buscarMetricas()
    res.json(dados)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar métricas' })
  }
}

// ── GET /visitas/:id ────────────────────────────────────────
export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const visita = await visitaService.buscarVisitaPorId(id)

    if (!visita) {
      res.status(404).json({ mensagem: 'Visita não encontrada' })
      return
    }

    res.json(visita)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar visita' })
  }
}

// ── POST /visitas ───────────────────────────────────────────
export const criar = async (req: Request, res: Response) => {
  try {
    const { data, promotorId, lojaId, cidade, estado, observacao } = req.body

    // Todos os campos obrigatórios do padrão de visita
    if (!data || !promotorId || !lojaId || !cidade || !estado) {
      res.status(400).json({
        mensagem: 'Os campos data, promotorId, lojaId, cidade e estado são obrigatórios',
      })
      return
    }

    const visita = await visitaService.criarVisita({
      data,
      promotorId: Number(promotorId),
      lojaId: Number(lojaId),
      cidade,
      estado,
      observacao,
    })

    res.status(201).json(visita)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao criar visita' })
  }
}

// ── PUT /visitas/:id ────────────────────────────────────────
export const atualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { data, cidade, estado, observacao, status } = req.body

    const visita = await visitaService.atualizarVisita(id, {
      data,
      cidade,
      estado,
      observacao,
      status,
    })

    res.json(visita)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao atualizar visita' })
  }
}

// ── DELETE /visitas/:id ─────────────────────────────────────
export const deletar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await visitaService.deletarVisita(id)
    res.json({ mensagem: 'Visita deletada com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ mensagem: error.message })
      return
    }
    res.status(500).json({ mensagem: 'Erro ao deletar visita' })
  }
}