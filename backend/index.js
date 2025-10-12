import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import spotsRoute from './routes/matchaRoutes.js'; // <-- rename import
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  return res.status(200).send('Matcha Tracker API is running');
});

// Mount your matcha routes at /spots
app.use('/spots', spotsRoute); // <-- use /spots

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
