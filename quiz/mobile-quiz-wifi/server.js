import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import quizRoutes from './routes/quizRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import resultsRoutes from './routes/resultsRoutes.js'

dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/api/quiz', quizRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/results', resultsRoutes)

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})