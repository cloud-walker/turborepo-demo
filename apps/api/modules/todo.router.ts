import type {Application} from 'express'

import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  putTodoById,
} from './todo'

export function makeTodoRouter(server: Application) {
  server.get('/todos', (req, res) => {
    return res.json(getTodos(req.body))
  })

  server.get('/todos/:id', (req, res) => {
    return res.json(getTodoById(req.params))
  })

  server.put('/todos/:id', (req, res) => {
    return res.json(putTodoById({...req.params, ...req.body}))
  })

  server.post('/todos', (req, res) => {
    return res.json(createTodo(req.body))
  })

  server.delete('/todos/:id', (req, res) => {
    return res.json(deleteTodoById(req.params))
  })
}
