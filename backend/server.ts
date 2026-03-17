import taskRoutes from "./routes/taskRoutes"
import connectDB from './config/db'
import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Student Task Manager API is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
