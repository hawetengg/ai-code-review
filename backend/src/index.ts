import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import { protect } from './middleware/protect.js'
import type { AuthRequest } from './middleware/protect.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.get('/api/protected-test', protect, (req: AuthRequest, res) => {
  res.json({ message: `Hello user ${req.userId}, you are authenticated!` })
})

const PORT = process.env['PORT'] || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})