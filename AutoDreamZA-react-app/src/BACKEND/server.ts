import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
const user = require("./routes/user");
const product = require("./routes/product");
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

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());


// Routes for user
app.use('/user', user);
app.use('/product',product)
app.route("/user")
  .get(user)
  .post(user);
app.route("/product")
.get(product)
.post(product);
 
