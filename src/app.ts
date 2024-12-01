import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "./utils/logger";
import urlRoutes from "./routes/url.routes";
import connectDB from './db.config';  
const app = express();
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Routes

app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected!');
});

app.use("/api/v1/urls", urlRoutes);

export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
