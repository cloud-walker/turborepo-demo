import {v4 as uuid} from 'uuid'

type Todo = {
  id: string
  createdAt: Date
  updatedAt: Date
  text: string
  isCompleted: boolean
}

const todos: Todo[] = []

export function getTodos({
  limit = 10,
  offset = 0,
}: {
  limit?: number
  offset?: number
}) {
  return todos.slice(offset, limit)
}

export function getTodoById({id}: {id: Todo['id']}) {
  const todo = todos.find(t => t.id == id)

  if (todo == null) {
    throw Error('Not Found')
  }

  return todo
}

export function updateTodoById({
  id,
  text,
  isCompleted,
}: {
  id: Todo['id']
  text?: Todo['text']
  isCompleted?: Todo['isCompleted']
}) {
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

export function createTodo({text}: {text: Todo['text']}) {
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

export function deleteTodoById({id}: {id: Todo['id']}) {
  const index = todos.findIndex(t => t.id == id)

  if (index == -1) {
    throw Error('Not Found')
  }

  todos.splice(index, 1)
}
