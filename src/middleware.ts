import { Context, Next } from "hono"

export const authMiddleware = async (c: Context, next: Next) => {
  const env = c.env.NODE_ENV
  const expectedApiToken = c.env.API_TOKEN

  const receivedApiToken = c.req.header('Authorization')?.replace('Bearer ', '')
  
  if (env !== 'local' && (!receivedApiToken || receivedApiToken !== expectedApiToken)) {
    console.log('Unauthorized')
    return c.text('Unauthorized', 401)
  }
  
  await next()
}