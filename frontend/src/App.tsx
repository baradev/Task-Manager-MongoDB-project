import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Task {
  _id: string
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks')
    setTasks(response.data)
  }

  const addTask = async () => {
    await axios.post('http://localhost:5000/tasks', {
      title: newTask,
      completed: false,
    })
    setNewTask('')
    fetchTasks()
  }

  const toggleTask = async (id: string, completed: boolean) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      completed: !completed,
    })
    fetchTasks()
  }

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`)
    fetchTasks()
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
            />
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
