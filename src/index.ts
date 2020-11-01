import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { PORT } from './env'
import { schema } from './graphql/schema'

const app = express()

const server = new ApolloServer({ schema })

server.applyMiddleware({ app, path: '/api' })

app.listen(PORT, () => {
  console.log('Server is up and running on', PORT)
})
