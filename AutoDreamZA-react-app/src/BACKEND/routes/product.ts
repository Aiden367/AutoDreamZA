
const { Product } = require('./models');
import { Router, Request, Response } from "express";
import axios from 'axios';
import * as cheerio from 'cheerio';
const router = Router(); 


async function scrapeAllProductDetails(): Promise<any[]> {
  try {
      const baseUrl = "https://books.toscrape.com/catalogue/";
      let currentPage = 1;
      const totalPages = 50;
      let allProducts: any[] = [];  // Store scraped products

      while (currentPage <= totalPages) {
          const pageUrl = `${baseUrl}page-${currentPage}.html`;
          const { data } = await axios.get(pageUrl);
          const $ = cheerio.load(data);

          // Collect all product promises
          const productPromises = $(".product_pod").map(async (index, element) => {
              const productUrl = $(element).find("h3 a").attr("href");
              if (productUrl) {
                  const fullUrl = new URL(productUrl, baseUrl).href;
                  const product = await scrapeProductDetails(fullUrl);
                  return product;  // Collect scraped product details
              }
          }).get(); // Convert map() to array of promises

          // Wait for all products to be scraped on this page
          const pageProducts = await Promise.all(productPromises);
          allProducts.push(...pageProducts.filter(Boolean)); // Remove null/undefined values

          currentPage++;
      }

      return allProducts; // Return all scraped products
  } catch (error) {
      console.error("Scraping Error:", error);
      return [];
  }
}

// Scrape individual product details and return the product
async function scrapeProductDetails(url: string): Promise<any | null> {
  try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title: string = $("h1").text().trim();
      const price: string = $(".price_color").text().trim();
      const image: string | undefined = $("#product_gallery .item.active img").attr("src");

      if (image) {
          const product = new Product({
              title,
              price,
              image: new URL(image, url).href,
              url
          });

          await product.save();
          return product; // ✅ Return the saved product
      }
  } catch (error) {
      console.error("Error scraping product details:", error);
  }
  return null; // Return null if an error occurs
}

// Define the /scrape route to trigger scraping
router.get('/scrape', async (req, res) => {
  try {
      const products = await scrapeAllProductDetails();
      if (!products.length) {
           res.status(404).json({ message: "No products available" });
           return
      }
      res.status(200).json(products);
  } catch (error) {
      console.error("Error scraping:", error);
      res.status(500).send("Error scraping products");
  }
});

// Define the /products route to fetch products from the database
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();  // Fetch all products from the database
        if (!products.length) {
             res.status(404).json({ message: "No products available" });
             return;
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
  });

  
module.exports = router;

