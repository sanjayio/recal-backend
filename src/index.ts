import { Hono } from 'hono'
import { authMiddleware } from './middleware'


const app = new Hono()

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
