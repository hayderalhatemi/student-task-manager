import express, { Request, Response } from 'express'
import Task from '../models/Task'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get tasks'})
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, status, dueDate } = req.body

        const task = new Task({
            title,
            description,
            status,
            dueDate
        })

        const savedTask = await task.save()
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task'})
    }
})

export default router