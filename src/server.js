import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Olá Mundo!');
});

const port = 3000;
console.log(`Servidor rodando na porta ${port}`);

serve({
  fetch: app.fetch,
  port,
});
