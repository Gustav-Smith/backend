// src/services/visitaService.ts

import { prisma } from '../prisma'

// ── Listar visitas ──────────────────────────────────────────
export const listarVisitas = async (filtros?: {
  promotorId?: number
  lojaId?: number
  status?: string
  cidade?: string
  estado?: string
}) => {
  return prisma.visita.findMany({
    where: {
      promotorId: filtros?.promotorId,
      lojaId: filtros?.lojaId,
      status: filtros?.status,
      cidade: filtros?.cidade,
      estado: filtros?.estado,
    },
    include: {
      promotor: true,
      loja: true,
    },
    orderBy: { data: 'desc' },
  })
}

// ── Buscar uma visita pelo ID ───────────────────────────────
export const buscarVisitaPorId = async (id: number) => {
  return prisma.visita.findUnique({
    where: { id },
    include: {
      promotor: true,
      loja: true,
    },
  })
}

// ── Criar uma visita ────────────────────────────────────────
export const criarVisita = async (dados: {
  data: string
  promotorId: number
  lojaId: number
  cidade: string
  estado: string
  observacao?: string
}) => {
  // Verifica se o promotor existe
  const promotor = await prisma.promotor.findUnique({
    where: { id: dados.promotorId },
  })
  if (!promotor) throw new Error('Promotor não encontrado')

  // Verifica se a loja existe
  const loja = await prisma.loja.findUnique({
    where: { id: dados.lojaId },
  })
  if (!loja) throw new Error('Loja não encontrada')

  return prisma.visita.create({
    data: {
      data: new Date(dados.data),
      promotorId: dados.promotorId,
      lojaId: dados.lojaId,
      cidade: dados.cidade,
      estado: dados.estado,
      observacao: dados.observacao,
    },
    include: {
      promotor: true,
      loja: true,
    },
  })
}

// ── Atualizar uma visita ────────────────────────────────────
export const atualizarVisita = async (
  id: number,
  dados: {
    data?: string
    cidade?: string
    estado?: string
    observacao?: string
    status?: string
  }
) => {
  const visita = await prisma.visita.findUnique({ where: { id } })
  if (!visita) throw new Error('Visita não encontrada')

  const statusValidos = ['pendente', 'concluida', 'cancelada']
  if (dados.status && !statusValidos.includes(dados.status)) {
    throw new Error('Status inválido. Use: pendente, concluida ou cancelada')
  }

  return prisma.visita.update({
    where: { id },
    data: {
      data: dados.data ? new Date(dados.data) : undefined,
      cidade: dados.cidade,
      estado: dados.estado,
      observacao: dados.observacao,
      status: dados.status,
    },
    include: {
      promotor: true,
      loja: true,
    },
  })
}

// ── Deletar uma visita ──────────────────────────────────────
export const deletarVisita = async (id: number) => {
  const visita = await prisma.visita.findUnique({ where: { id } })
  if (!visita) throw new Error('Visita não encontrada')

  return prisma.visita.delete({ where: { id } })
}

// ── Métricas para o dashboard ───────────────────────────────
export const buscarMetricas = async () => {
  const [total, concluidas, pendentes, canceladas] = await Promise.all([
    prisma.visita.count(),
    prisma.visita.count({ where: { status: 'concluida' } }),
    prisma.visita.count({ where: { status: 'pendente' } }),
    prisma.visita.count({ where: { status: 'cancelada' } }),
  ])

  const topPromotores = await prisma.visita.groupBy({
    by: ['promotorId'],
    where: { status: 'concluida' },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 5,
  })

  return { total, concluidas, pendentes, canceladas, topPromotores }
}