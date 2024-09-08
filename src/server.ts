import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/taskmanager')

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
})

const Task = mongoose.model('Task', TaskSchema)

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body)
  await newTask.save()
  res.json(newTask)
})

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(updatedTask)
})

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: 'Task deleted' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
