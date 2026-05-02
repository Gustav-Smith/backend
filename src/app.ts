// src/app.ts

import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Importa as rotas de promotores
import promotorRoutes from './routes/promotorRoutes'

const app = express()

app.use(express.json())
app.use(cors())

// Rota de saúde da API
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Promotores funcionando! 🚀' })
})

// Registra as rotas — todos os endpoints de /promotores
// ficam organizados no arquivo promotorRoutes
app.use('/promotores', promotorRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`)
})