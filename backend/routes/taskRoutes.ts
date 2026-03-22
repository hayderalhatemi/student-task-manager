import express, { Request, Response } from "express"
import Task from "../models/Task"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks" })
  }
})

router.get('/', async (req:Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks '});
  }
});

router.post("/", async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Failed to create task" })
  }
})

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' })
  }
});

export default router