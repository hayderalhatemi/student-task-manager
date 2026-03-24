import React, { useEffect, useState } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from './api'

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

  //which task is being edited
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  //edit form values
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editStatus, setEditStatus] = useState('')

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
  const handleDelete = async (id: string) => {
    await deleteTask(id)
    fetchTasks()
  }

  //select task and populate edit from
const handleEditClick = (task: Task) => {
  setEditingTask(task)
  setEditTitle(task.title)
  setEditDescription(task.description)
  setEditStatus(task.status)
}

//send the update task to the backend
const handleUpdate = async () => {
  if (!editingTask) return
  await updateTask(editingTask._id, {
    title: editTitle,
    description: editDescription,
    status: editStatus
  })
  setEditingTask(null) //colse the edit from
  fetchTasks() // refresh the list
}

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Student Task Manager</h1>

      <div>
      <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={handleCreate}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App