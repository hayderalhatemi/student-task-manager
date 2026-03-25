import React, { useEffect, useState } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from './api'
import './App.css'

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

  // Which task is being edited
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Edit form values
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [editDuedate, setEditDueDate] = useState('')
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
    await createTask({ title, description, status: 'pending', dueDate })
    setTitle('')
    setDescription('')
    fetchTasks()
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    fetchTasks()
  }

  // Set task to edit and fill form
  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditStatus(task.status)
    setEditDueDate(task.dueDate ? task.dueDate.substring(0, 10) : '')
  }

  // Send updated task to backend
  const handleUpdate = async () => {
    if (!editingTask) return
    await updateTask(editingTask._id, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      dueDate: editDuedate
    })
    setEditingTask(null)
    fetchTasks()
  }

  return (
    <div className='container'>
      <h1>Student Task Manager</h1>

      <div className='add-form'>
        <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <button className='btn-add' onClick={handleCreate}>Add Task</button>
      </div>

      {/* Edit form - shows only when editing */}
      {editingTask && (
        <div className='edit-form'>
          <h3>Editing: {editingTask.title}</h3>
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          <input value={editDescription} onChange={e => setEditDescription(e.target.value)} />
          <input type="date" value={editDuedate} onChange={e => setEditDueDate(e.target.value)} />
          <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="task-buttons">
          <button className='btn-save' onClick={handleUpdate}>Save</button>
          <button className='btn-cancel' onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
        </div>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task._id} className='task-item'>
            <div className="task-info">
              <strong>{task.title}</strong>
              <span className={task.status === 'completed' ? 'status-completed' : 'status-pending'}>
                {task.status}
              </span>
              <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</span>
            </div>
            <div className="task-buttons">
            <button className='btn-edit' onClick={() => handleEditClick(task)}>Edit</button>
            <button className='btn-delete' onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App