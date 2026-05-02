// src/routes/promotorRoutes.ts

import { Router } from 'express'
import * as promotorController from '../controllers/promotorController'

const router = Router()

// Define cada rota e qual função do controller ela chama
router.get('/', promotorController.listar)
router.get('/:id', promotorController.buscarPorId)
router.post('/', promotorController.criar)
router.put('/:id', promotorController.atualizar)
router.delete('/:id', promotorController.deletar)

export default router