import type {GetTodosDTO} from 'api-contract'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {Form, useLoaderData} from '@remix-run/react'

type LoaderData = GetTodosDTO['response']

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.API_ORIGIN}/todos`)
  if (!res.ok) {
    throw res
  }
  const body: LoaderData = await res.json()
  return body
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const text = form.get('text')

  const res = await fetch(`${process.env.API_ORIGIN}/todos`, {
    method: request.method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text}),
  })

  if (!res.ok) {
    throw res
  }

  return null
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <>
      <h1>todos</h1>
      <Form method="post">
        <input type="text" name="text" />
        <button type="submit">Add todo</button>
      </Form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
