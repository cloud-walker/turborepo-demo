import {v4 as uuid} from 'uuid'
import type {
  Todo,
  GetTodos,
  GetTodo,
  PutTodo,
  CreateTodo,
  DeleteTodo,
} from 'api-contract'

const todos: Todo[] = []

export function getTodos({
  limit = 10,
  offset = 0,
}: GetTodos['searchParams']): GetTodos['response'] {
  return {
    items: todos.slice(offset, limit),
    limit,
    offset,
    totalCount: todos.length,
  }
}

export function getTodoById({id}: GetTodo['pathParams']): GetTodo['response'] {
  const todo = todos.find(t => t.id == id)

  if (todo == null) {
    throw Error('Not Found')
  }

  return todo
}

export function putTodoById({
  id,
  text,
  isCompleted,
}: PutTodo['pathParams'] & PutTodo['body']): PutTodo['response'] {
  const todo = todos.find(t => t.id == id)

  if (todo == null) {
    throw Error('Not Found')
  }

  if (text != null) {
    todo.text = text
  }
  if (isCompleted != null) {
    todo.isCompleted = isCompleted
  }

  return todo
}

export function createTodo({text}: CreateTodo['body']): CreateTodo['response'] {
  const todo: Todo = {
    id: uuid(),
    text,
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  todos.push(todo)

  return todo
}

export function deleteTodoById({
  id,
}: DeleteTodo['pathParams']): DeleteTodo['response'] {
  const index = todos.findIndex(t => t.id == id)

  if (index == -1) {
    throw Error('Not Found')
  }

  todos.splice(index, 1)
}

createTodo({text: 'Fare la spesa'})
createTodo({text: 'Mettere benzina'})
