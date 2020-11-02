import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { schema } from './graphql/schema'

export const app = express()

export const server = new ApolloServer({ schema })

server.applyMiddleware({ app, path: '/api' })
