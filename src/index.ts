import { Context, Hono, Next } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

type Bindings = {
  MY_API_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Create a middleware that properly accesses the secret
const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  const expectedToken = c.env.MY_API_TOKEN
  
  if (!token || token !== expectedToken) {
    return c.text('Unauthorized', 401)
  }
  
  await next()
}

app.use('/api/*', authMiddleware)

app.notFound((c) => {
  return c.text('Uh Oh! Not Found', 404)
})

app.onError((err, c) => {
  return c.text(`Uh Oh! Error: ${err.message}`, 500)
})

app.get('/', (c) => {
  return c.text("API is running at /api")
})

app.get('/api/hello/:name', (c) => {
  const name = c.req.param('name')
  return c.json({ message: `Hello ${name}` })
})

export default app
