export type TodoDTO = {
  id: string
  text: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export type GetTodoDTO = {
  path_params: Pick<TodoDTO, 'id'>
  response: TodoDTO
}

export type GetTodosDTO = {
  search_params: {quantity: number; page?: number}
  response: {
    items: TodoDTO[]
    page: number
    total_count: number
  }
}

export type CreateTodoDTO = {
  body: Pick<TodoDTO, 'text'>
  response: TodoDTO
}

export type PutTodoDTO = {
  path_params: Pick<TodoDTO, 'id'>
  body: Pick<TodoDTO, 'text' | 'is_completed'>
  response: TodoDTO
}

export type DeleteTodoDTO = {
  path_params: Pick<TodoDTO, 'id'>
  response: void
}
