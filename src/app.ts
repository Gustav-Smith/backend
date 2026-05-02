// src/app.ts

import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import promotorRoutes from './routes/promotorRoutes'
import lojaRoutes from './routes/lojaRoutes'
import visitaRoutes from './routes/visitaRoutes'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Promotores funcionando! 🚀' })
})

app.use('/promotores', promotorRoutes)
app.use('/lojas', lojaRoutes)
app.use('/visitas', visitaRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`)
})