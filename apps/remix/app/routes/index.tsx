import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

export const loader: LoaderFunction = async ({request}) => {
  const res = await fetch(`${process.env.API_ORIGIN}/todos`)

  if (!res.ok) {
    throw res
  }

  const body = await res.json()
  return body
}

export default function Index() {
  const data = useLoaderData()
  return (
    <>
      <h1>todos</h1>
      <pre>{JSON.stringify(data)}</pre>
    </>
  )
}
