import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './src/routes/authRoutes.js'

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express()

app.use(express.json())

app.use(cors())

const server = http.createServer(app)

app.get('/', (req, res) => {
    return res.send('Hello Express Js')
})

// 인증 처리를 위한 라우팅을 사용처리한다.
app.use('/api/auth', authRoutes)


server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})