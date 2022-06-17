import type {Jsonify} from 'type-fest'

export type Todo = {
  id: string
  text: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}
export type TodoDTO = Jsonify<Todo>

export type GetTodos = {
  searchParams: {limit?: number; offset?: number}
  response: {
    items: Todo[]
    limit: number
    offset: number
    totalCount: number
  }
}
export type GetTodosDTO = Jsonify<GetTodos>

export type GetTodo = {
  pathParams: Pick<Todo, 'id'>
  response: Todo
}
export type GetTodoDTO = Jsonify<GetTodo>

export type CreateTodo = {
  body: Pick<Todo, 'text'>
  response: Todo
}
export type CreateTodoDTO = Jsonify<CreateTodo>

export type PutTodo = {
  pathParams: Pick<Todo, 'id'>
  body: Partial<Pick<Todo, 'text' | 'isCompleted'>>
  response: Todo
}
export type PutTodoDTO = Jsonify<PutTodo>

export type DeleteTodo = {
  pathParams: Pick<Todo, 'id'>
  response: void
}
export type DeleteTodoDTO = Jsonify<DeleteTodo>
