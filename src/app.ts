// src/app.ts

import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import promotorRoutes from './routes/promotorRoutes'
import lojaRoutes from './routes/lojaRoutes'
import visitaRoutes from './routes/visitaRoutes'
import authRoutes from './routes/authRoutes'
import { autenticar } from './middlewares/authMiddleware'

const app = express()

app.use(express.json())
app.use(cors())

// Rota pública — não precisa de token
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Promotores funcionando! 🚀' })
})

// Rotas de autenticação — públicas (login e registro não precisam de token)
app.use('/auth', authRoutes)

// Rotas protegidas — o middleware autenticar roda antes de qualquer rota abaixo
// Se o token for inválido, o middleware bloqueia e nem chega no controller
app.use(autenticar)

app.use('/promotores', promotorRoutes)
app.use('/lojas', lojaRoutes)
app.use('/visitas', visitaRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`)
})