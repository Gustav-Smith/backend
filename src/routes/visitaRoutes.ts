// src/routes/visitaRoutes.ts

import { Router } from 'express'
import * as visitaController from '../controllers/visitaController'

const router = Router()

// ⚠️ A rota /metricas precisa vir ANTES de /:id
// senão o Express vai interpretar "metricas" como um ID
router.get('/metricas', visitaController.metricas)

router.get('/', visitaController.listar)
router.get('/:id', visitaController.buscarPorId)
router.post('/', visitaController.criar)
router.put('/:id', visitaController.atualizar)
router.delete('/:id', visitaController.deletar)

export default router