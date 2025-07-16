import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const xss = require('xss-clean');

const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const health = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(xss());
app.use(helmet());

// ✅ Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(limiter);


// ✅ Routes
app.use('/health', health);
app.use('/user', user);
app.use('/product', product);
app.use('/payment', payment);

// ❌ REMOVE these redundant `.route()` declarations
// They are NOT needed and can cause errors
// app.route("/user").get(user).post(user);
// app.route("/product").get(product).post(product);
// app.route("/payment").get(payment).post(payment);

// ✅ Connect to MongoDB and start server
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

