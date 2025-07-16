import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
const xss = require('xss-clean');
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const health = require("./routes/health");
const { Product } = require('./routes/models');
const app = express();
const PORT = process.env.PORT || 5000;





// Initialize MongoDB connection and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database', error);
    process.exit(1);
  });

// ✅ Health check endpoint for CI/CD
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
// Create a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(xss());
app.use(helmet());
// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

app.use(limiter);
// Routes for user
app.use('/user', user);
app.use('/product', product)
app.use('/payment', payment)
app.use('/health', health)
app.route("/user")
  .get(user)
  .post(user);
app.route("/product")
  .get(product)
  .post(product);
app.route("/payment")
  .get(payment)
  .post(payment);
  app.route("/health")
  .get(health)
  .post(health);
