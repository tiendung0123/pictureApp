import express from 'express';
import cors from 'cors'
import rootRouter from './routes/rootRouter.js';  

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*"
}))

app.listen(3000)

app.use('/api', rootRouter);


