import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import type {GetTodosDTO} from 'api-contract'

type LoaderData = GetTodosDTO['response']

export const loader: LoaderFunction = async ({request}) => {
  const res = await fetch(`${process.env.API_ORIGIN}/todos`)

  if (!res.ok) {
    throw res
  }

  const body: LoaderData = await res.json()
  return body
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <>
      <h1>todos</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
