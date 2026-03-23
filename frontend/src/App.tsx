import React, { useEffect, useState } from 'react'
import { getTasks, createTask, deleteTask } from './api'

interface Task {
  _id: string
  title: string
  description: string
  status: string
  dueDate: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const fetchTasks = async () => {
    const res = await getTasks()
    setTasks(res.data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async () => {
    if (!title) return
    await createTask({ title, description, status: 'pending' })
    setTitle('')
    setDescription('')
    fetchTasks()
  }
  const handleDelete = 
}