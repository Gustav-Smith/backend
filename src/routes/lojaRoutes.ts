// src/routes/lojaRoutes.ts

import { Router } from 'express'
import * as lojaController from '../controllers/lojaController'

const router = Router()

router.get('/', lojaController.listar)
router.get('/:id', lojaController.buscarPorId)
router.post('/', lojaController.criar)
router.put('/:id', lojaController.atualizar)
router.delete('/:id', lojaController.deletar)

export default router