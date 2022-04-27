import { createServer } from '@graphql-yoga/node'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { createContext } from './context'
import { schema } from './schema'

export function buildApp(logging = true) {
  const app = fastify({ logger: logging })

  const graphQLServer = createServer<{
    req: FastifyRequest
    reply: FastifyReply
  }>({
    schema,
    context: createContext,
    // Integrate Fastify Logger to Yoga
    logging: app.log,
  })

  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await graphQLServer.handleIncomingMessage(req, {
        req,
        reply,
      })
      for (const [name, value] of response.headers) {
        reply.header(name, value)
      }

      reply.status(response.status)
      reply.send(response.body)
    },
  })

  return app
}
