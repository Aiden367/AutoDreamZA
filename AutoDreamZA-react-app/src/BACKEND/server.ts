import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
const user = require("./routes/user");
const { Product } = require('./routes/models');
const app = express();
const PORT = process.env.PORT || 5000;

// Define the Product interface
interface Product {
  title: string;
  price: string;
  image: string;
  url: string;
}

// Scrape function to get product details from all pages
async function scrapeAllProductDetails(): Promise<void> {
  try {
    const baseUrl = "https://books.toscrape.com/catalogue/";
    let currentPage = 1;
    const totalPages = 50;  // The site has 50 pages of products

    while (currentPage <= totalPages) {
      const pageUrl = `${baseUrl}page-${currentPage}.html`;
      const { data } = await axios.get(pageUrl);
      const $ = cheerio.load(data);

      // Find all product links on the page
      $(".product_pod").each(async (index, element) => {
        const productUrl = $(element).find("h3 a").attr("href");

        if (productUrl) {
          // Scrape the details for each product page
          const productDetailsUrl = `${baseUrl}${productUrl}`;
          await scrapeProductDetails(productDetailsUrl);  // Scrape individual product details and save to DB
        }
      });

      currentPage++;  // Move to the next page
    }

  } catch (error) {
    console.error("Scraping Error:", error);
  }
}

// Scrape individual product details and save to DB
async function scrapeProductDetails(url: string): Promise<void> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title: string = $("h1").text().trim();
    const price: string = $(".price_color").text().trim();
    const image: string | undefined = $("#product_gallery .item.active img").attr("src");
    const productUrl: string = url;  // Use the URL we are already on

    if (image) {
      // Save the product data into the database
      const product = new Product({
        title,
        price,
        image: new URL(image, url).href,  // Ensure the image URL is absolute
        url: productUrl
      });

      // Save the product to the database
      await product.save();
    }
  } catch (error) {
    console.error("Error scraping product details:", error);
  }
}

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

// Define the /scrape route to trigger scraping
app.get('/scrape', async (req, res) => {
  try {
    const products = await scrapeAllProductDetails();  // Scrape all product details
    res.status(200).json(products);  // Send the scraped data as JSON in the response
  } catch (error) {
    console.error("Error scraping:", error);
    res.status(500).send("Error scraping products");
  }
});

// Routes for user
app.use('/user', user);
app.route("/user")
  .get(user)
  .post(user);
