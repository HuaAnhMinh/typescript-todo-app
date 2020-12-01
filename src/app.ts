import express from 'express';

import './db/db';

import cors from './middleware/cors.middleware';

const app: express.Application = express();
app.use(express.json());
app.use(cors);

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send({
    message: 'Succeed',
  });
});

import todoRoute from './routes/todo.route';
app.use(todoRoute);

app.get('*', (_, res) => {
  res.status(404).send({
    error: '404 Not Found.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});