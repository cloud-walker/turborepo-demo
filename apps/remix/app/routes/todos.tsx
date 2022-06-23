import type {GetTodosDTO} from 'api-contract'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Form, useLoaderData, useSubmit, useTransition} from '@remix-run/react'
import {useEffect, useRef} from 'react'

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

    return redirect('/')
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

    return redirect('/')
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

    return redirect('/')
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
    <>
      <h1>todos</h1>

      <Form replace method="post" ref={formRef}>
        <input type="text" name="text" />
        <button type="submit" name="_action" value="post">
          Add todo
        </button>
      </Form>

      <ul>
        {data.items.map(item => (
          <li key={item.id} style={{display: 'flex', gap: '1rem'}}>
            <Form method="post">
              <input type="hidden" name="_action" value="put" />
              <input type="hidden" name="id" value={item.id} />
              <label>
                <input
                  type="checkbox"
                  name="isCompleted"
                  onChange={e => {
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
              <button type="submit" name="_action" value="delete">
                x
              </button>
            </Form>
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
