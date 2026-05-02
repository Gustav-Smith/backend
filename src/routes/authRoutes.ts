// src/routes/authRoutes.ts

import { Router } from 'express'
import * as authController from '../controllers/authController'

const router = Router()

router.post('/registrar', authController.registrar)
router.post('/login', authController.login)

export default router