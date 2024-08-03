import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';

import { routes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
