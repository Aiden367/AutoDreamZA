const { Product } = require('./models');
import { Router, Request, Response } from "express";
import axios from 'axios';
import * as cheerio from 'cheerio';
const router = Router();

async function scrapeAllProductDetails(): Promise<any[]> {
  const baseUrls = [
    { url: "https://www.booxe.co.za/product-tag/ford-boot-mat/", type: "Ford Boot Mat" },
    { url: "https://www.booxe.co.za/product-tag/bmw-boot-mat/", type: "BMW Boot Mat" },
    { url: "https://www.booxe.co.za/product-tag/renault-boot-mat/", type: "Renault Boot Mat" },
    { url: "https://www.booxe.co.za/product-tag/ford-floor-mat/", type: "Ford Floor Mat" },
    { url: "https://www.booxe.co.za/product-tag/bmw-floor-mat/", type: "BMW Floor Mat" },
    { url: "https://www.booxe.co.za/product-tag/renault-floor-mat/", type: "Renault Floor Mat" },
    { url: "https://www.booxe.co.za/product-tag/toyota-floor-mat/", type: "Toyota Floor Mat" },
    { url: "https://www.booxe.co.za/product-tag/ford-bin-mat/", type: "Ford Bin Mat" },
    { url: "https://www.booxe.co.za/product-tag/toyota-bin-mat/", type: "Toyota Bin Mat" },
    { url: "https://holdfast.co.za/product-category/shop-roof-racks/", type: "Roof Rack" },

    // Add more URLs as needed
  ];

  const allProducts: any[] = [];

  for (const entry of baseUrls) {
    const baseUrl = entry.url;
    const matType = entry.type;
    let currentPage = 1;

    while (true) {
      const pageUrl = currentPage === 1 ? baseUrl : `${baseUrl}page/${currentPage}/`;

      let data;
      try {
        const response = await axios.get(pageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'en-US,en;q=0.9',
          }
        });
        data = response.data;
      } catch (err) {
        console.error(`Failed to fetch page ${pageUrl}:`, err);
        break;
      }

      const $ = cheerio.load(data);
      const productElements = $("li.product.type-product");

      if (!productElements.length) break;

      const pageProducts = productElements.map((i, el) => {
        let title = $(el).find("h2.woocommerce-loop-product__title").text().trim();
        if (!title) title = $(el).find("h2").text().trim();

        let imageRelative = $(el).find("img").attr("src");
        if (!imageRelative) {
          const srcset = $(el).find("source").attr("srcset");
          if (srcset) imageRelative = srcset.split(' ')[0];
        }
        const image = imageRelative ? new URL(imageRelative, baseUrl).href : "";

        let priceText = $(el).find(".price .woocommerce-Price-amount").first().text().trim();
        if (!priceText) priceText = $(el).find(".price").first().text().trim();
        const price = parseFloat(priceText.replace("R", "").replace(",", "").replace(".", "") || "0") / 100;

        let productUrl = $(el).find("a.woocommerce-LoopProduct-link").attr("href");
        if (!productUrl) productUrl = $(el).find("a").first().attr("href");

        if (!title || !price || !image || !productUrl) return null;

        const manufacturerMatch = title.match(/Ford|BMW|Toyota|Renault|Nissan|Mazda|Volkswagen|Isuzu|Hyundai|BAIC/i);
        const manufacturer = manufacturerMatch ? manufacturerMatch[0] : "Unknown";

        const type = (() => {
          const match = title.toLowerCase().match(/boot mat|floor mat|bin mat|rubber mat|carpet mat|roof rack/);
          return match ? match[0].replace(/\b\w/g, c => c.toUpperCase()) : "Unknown";
        })();

        return new Product({
          title,
          price,
          image,
          url: productUrl,
          available: true,
          manufacturer,
          type,
        });
      }).get().filter(p => p);


      for (const p of pageProducts) {
        try {
          const exists = await Product.findOne({ url: p.url });
          if (!exists) {
            await p.save();
            allProducts.push(p);
          }
        } catch (err) {
          console.error("Error saving product:", err);
        }
      }

      currentPage++;
    }
  }

  return allProducts;
}



router.get('/scrape-if-needed', async (req, res) => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      res.status(200).json({ message: "Already populated", scraped: false });
      return;
    }

    const products = await scrapeAllProductDetails(); // Now scrapes ALL brands
    res.status(200).json({ message: "Scraped successfully", scraped: true, count: products.length });
  } catch (error) {
    console.error("Error during conditional scrape:", error);
    res.status(500).json({ message: "Error during conditional scrape", error: String(error) });
  }
});

router.get('/scrape-force', async (req, res) => {
  try {
    const products = await scrapeAllProductDetails(); // this scrapes all baseUrls
    res.status(200).json({ message: "Force scrape completed", scraped: true, count: products.length });
  } catch (error) {
    console.error("Force scrape error:", error);
    res.status(500).json({ message: "Force scrape failed", error: String(error) });
  }
});


// Display products from the DB
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
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
