import taskRoutes from "./routes/taskRoutes"
import connectDB from './config/db'
import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

//temporarly
console.log('new server code running')
//
dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Student Task Manager API is running')
})

//temporarly
app.put("/test-put", (req: Request, res: Response) => {
  res.json({ message: "PUT works" })
})
//

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
