// src/services/promotorService.ts

import { prisma } from '../prisma'

// ── Listar todos os promotores ──────────────────────────────
export const listarPromotores = async () => {
  return prisma.promotor.findMany({
    orderBy: { nome: 'asc' }, // ordena por nome alfabeticamente
  })
}

// ── Buscar um promotor pelo ID ──────────────────────────────
export const buscarPromotorPorId = async (id: number) => {
  return prisma.promotor.findUnique({
    where: { id },
    include: {
      visitas: {
        // inclui as visitas do promotor com os dados da loja
        include: { loja: true },
        orderBy: { data: 'desc' },
      },
    },
  })
}

// ── Criar um novo promotor ──────────────────────────────────
export const criarPromotor = async (dados: {
  nome: string
  email: string
  telefone?: string
}) => {
  // Verifica se já existe um promotor com esse email
  const emailExistente = await prisma.promotor.findUnique({
    where: { email: dados.email },
  })

  if (emailExistente) {
    // Lança um erro que o controller vai capturar
    throw new Error('Já existe um promotor com esse email')
  }

  return prisma.promotor.create({
    data: dados,
  })
}

// ── Atualizar um promotor ───────────────────────────────────
export const atualizarPromotor = async (
  id: number,
  dados: {
    nome?: string
    email?: string
    telefone?: string
    ativo?: boolean
  }
) => {
  // Verifica se o promotor existe antes de tentar atualizar
  const promotor = await prisma.promotor.findUnique({ where: { id } })

  if (!promotor) {
    throw new Error('Promotor não encontrado')
  }

  return prisma.promotor.update({
    where: { id },
    data: dados,
  })
}

// ── Deletar um promotor ─────────────────────────────────────
export const deletarPromotor = async (id: number) => {
  const promotor = await prisma.promotor.findUnique({ where: { id } })

  if (!promotor) {
    throw new Error('Promotor não encontrado')
  }

  return prisma.promotor.delete({
    where: { id },
  })
}