import {json, urlencoded} from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import {makeTodoRouter} from './todo.router'

export function makeServer() {
  const server = express()
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({extended: true}))
    .use(json())
    .use(cors())
    .get('/healthz', (req, res) => res.json({ok: true}))

  makeTodoRouter(server)

  return server
}
