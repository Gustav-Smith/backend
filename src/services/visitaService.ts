// src/services/visitaService.ts

import { prisma } from '../prisma'

// ── Listar visitas (com filtros opcionais) ──────────────────
export const listarVisitas = async (filtros?: {
  promotorId?: number
  lojaId?: number
  status?: string
}) => {
  return prisma.visita.findMany({
    where: {
      // só aplica o filtro se o valor foi passado
      promotorId: filtros?.promotorId,
      lojaId: filtros?.lojaId,
      status: filtros?.status,
    },
    include: {
      promotor: true, // traz os dados do promotor junto
      loja: true,     // traz os dados da loja junto
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
  observacoes?: string
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
      data: new Date(dados.data), // converte a string para Date
      promotorId: dados.promotorId,
      lojaId: dados.lojaId,
      observacoes: dados.observacoes,
    },
    include: {
      promotor: true,
      loja: true,
    },
  })
}

// ── Atualizar status ou observações ────────────────────────
export const atualizarVisita = async (
  id: number,
  dados: {
    status?: string
    observacoes?: string
    data?: string
  }
) => {
  const visita = await prisma.visita.findUnique({ where: { id } })
  if (!visita) throw new Error('Visita não encontrada')

  // Valida o status se ele foi enviado
  const statusValidos = ['pendente', 'concluida', 'cancelada']
  if (dados.status && !statusValidos.includes(dados.status)) {
    throw new Error('Status inválido. Use: pendente, concluida ou cancelada')
  }

  return prisma.visita.update({
    where: { id },
    data: {
      status: dados.status,
      observacoes: dados.observacoes,
      // só converte a data se ela foi enviada
      data: dados.data ? new Date(dados.data) : undefined,
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
// Já vamos criar essa função aqui pois o dashboard vai precisar dela
export const buscarMetricas = async () => {
  const [total, concluidas, pendentes, canceladas] = await Promise.all([
    prisma.visita.count(),
    prisma.visita.count({ where: { status: 'concluida' } }),
    prisma.visita.count({ where: { status: 'pendente' } }),
    prisma.visita.count({ where: { status: 'cancelada' } }),
  ])

  // Top 5 promotores com mais visitas concluídas
  const topPromotores = await prisma.visita.groupBy({
    by: ['promotorId'],
    where: { status: 'concluida' },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 5,
  })

  return {
    total,
    concluidas,
    pendentes,
    canceladas,
    topPromotores,
  }
}