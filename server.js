import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import connectDB from './database/db.js';
import userRoutes from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);

// Get the directory path of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files (assuming views folder is in the same directory as server.js)
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
