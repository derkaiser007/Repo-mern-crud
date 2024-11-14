import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemsRoute from './routes/items';

const app = express();
const PORT = 5000;
const DB_URI = 'mongodb://localhost:27017/mern-crud';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/items', itemsRoute);

// Connect to MongoDB and start the server
mongoose.connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));
