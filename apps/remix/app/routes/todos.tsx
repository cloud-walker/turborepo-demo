import type {GetTodosDTO} from 'api-contract'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {Form, useLoaderData, useSubmit, useTransition} from '@remix-run/react'
import {useEffect, useRef} from 'react'
import {Button} from '~/modules/Button'

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
  const {_action, ...values} = Object.fromEntries(form)

  if (_action == 'post') {
    const res = await fetch(`${process.env.API_ORIGIN}/todos`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      throw res
    }

    return null
  }

  if (_action == 'delete') {
    const res = await fetch(`${process.env.API_ORIGIN}/todos/${values.id}`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      throw res
    }

    return null
  }

  if (_action == 'put') {
    const res = await fetch(`${process.env.API_ORIGIN}/todos/${values.id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isCompleted: !!values.isCompleted}),
    })

    if (!res.ok) {
      throw res
    }

    return null
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  const formRef = useRef<HTMLFormElement>(null)
  const mountedRef = useRef(false)
  const transition = useTransition()
  const submit = useSubmit()

  useEffect(() => {
    if (mountedRef.current && transition.state == 'idle') {
      formRef.current?.reset()
    }

    mountedRef.current = true
  }, [transition.state])

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] gap-4">
      <h1 className="py-2 px-4 text-3xl border-b-2">todos</h1>

      <ul className="justify-self-center flex flex-col gap-4">
        {data.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center gap-2">
            <Form method="post">
              <input type="hidden" name="_action" value="put" />
              <input type="hidden" name="id" value={item.id} />
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="isCompleted"
                  onChange={(e) => {
                    submit(e.currentTarget.form, {replace: true})
                  }}
                  checked={item.isCompleted}
                />
                <span>
                  {item.text} {item.isCompleted.toString()}
                </span>
              </label>
            </Form>

            <Form method="post" replace>
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" name="_action" value="delete">
                x
              </Button>
            </Form>
          </li>
        ))}
      </ul>

      <Form
        replace
        method="post"
        ref={formRef}
        className="place-self-center pb-4"
      >
        <input type="text" name="text" className="border py-2 px-4" />
        <Button type="submit" name="_action" value="post">
          Add todo
        </Button>
      </Form>
    </div>
  )
}
