import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config'; 

dotenv.config();

dbConnect();

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["https://food-shop-shadowblack.netlify.app"]
}));

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);


const port = 5000;
app.listen(port, () => {
  console.log(`Website served on ${port}`);
});
