// backend/index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import spotsRoute from './routes/matchaRoutes.js';
import authRoute from './routes/authRoutes.js';
import { PORT as CFG_PORT, mongoDBURL } from './config.js';

dotenv.config();

const app = express();

// ----- config / ports / urls -----
const PORT = process.env.PORT || CFG_PORT || 3000;
// Prefer .env MONGO_URI, else fall back to old config value
const MONGO_URI = process.env.MONGO_URI || mongoDBURL;

// Safety check so we see what's used
console.log('🔧 Using Mongo URI from:', process.env.MONGO_URI ? '.env' : 'config.js');

// ----- middleware -----
app.use(cors());
app.use(express.json());

// tiny request logger (helps debug path mismatches)
app.use((req, _res, next) => {
  console.log('➡️', req.method, req.url);
  next();
});

// health
app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, service: 'matcha-backend' });
});

// routes
app.use('/auth', authRoute);
app.use('/spots', spotsRoute);

// ----- db connect + retry -----
const connectDB = async () => {
  try {
    if (!MONGO_URI || typeof MONGO_URI !== 'string') {
      throw new Error('MONGO_URI is missing. Set it in .env or config.js');
    }

    await mongoose.connect(MONGO_URI, {
      // modern Mongoose (v7+) only needs minimal options
      serverSelectionTimeoutMS: 10000,
    });

    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Mongo connect error:', err?.message || err);
    setTimeout(connectDB, 5000); // retry after 5s
  }
};

connectDB();
