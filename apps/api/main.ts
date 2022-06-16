import {makeServer} from './modules/server'

const port = process.env.PORT || 4000
const server = makeServer()

server.listen(port, () => {
  console.log(`api running on ${port}`)
})
