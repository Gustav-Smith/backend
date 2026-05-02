// src/services/lojaService.ts

import { prisma } from '../prisma'

// ── Listar todas as lojas ───────────────────────────────────
export const listarLojas = async () => {
  return prisma.loja.findMany({
    orderBy: { nome: 'asc' },
  })
}

// ── Buscar uma loja pelo ID ─────────────────────────────────
export const buscarLojaPorId = async (id: number) => {
  return prisma.loja.findUnique({
    where: { id },
    include: {
      visitas: {
        // traz as visitas com os dados do promotor
        include: { promotor: true },
        orderBy: { data: 'desc' },
      },
    },
  })
}

// ── Criar uma nova loja ─────────────────────────────────────
export const criarLoja = async (dados: {
  nome: string
  endereco: string
  cidade: string
}) => {
  return prisma.loja.create({
    data: dados,
  })
}

// ── Atualizar uma loja ──────────────────────────────────────
export const atualizarLoja = async (
  id: number,
  dados: {
    nome?: string
    endereco?: string
    cidade?: string
    ativo?: boolean
  }
) => {
  const loja = await prisma.loja.findUnique({ where: { id } })

  if (!loja) {
    throw new Error('Loja não encontrada')
  }

  return prisma.loja.update({
    where: { id },
    data: dados,
  })
}

// ── Deletar uma loja ────────────────────────────────────────
export const deletarLoja = async (id: number) => {
  const loja = await prisma.loja.findUnique({ where: { id } })

  if (!loja) {
    throw new Error('Loja não encontrada')
  }

  return prisma.loja.delete({
    where: { id },
  })
}