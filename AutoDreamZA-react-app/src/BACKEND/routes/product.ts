
import { Router, Request, Response } from "express";
import axios from 'axios';
import * as cheerio from 'cheerio';
const router = Router();
const { MatProduct, RoofRackProduct, RimsProduct, RadioProduct } = require('./models');



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
    { url: "https://www.theracersedge.co.za/Wheels-Tyres", type: "Rims" },
    { url: "https://sbrprosound.co.za/product-category/car-audio/car-radios/android-radios/", type: "Android Radio" },
  ];
  const allProducts: any[] = [];
  for (const entry of baseUrls) {
    const baseUrl = entry.url;
    const matType = entry.type;
    const isRacersEdge = baseUrl.includes("theracersedge.co.za");
    const isSBRProSound = baseUrl.includes("sbrprosound.co.za");
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
      let productElements;
      if (isRacersEdge) {
        productElements = $("div.item-box > div.product-item");
      } else if (isSBRProSound) {
        productElements = $("li.product.type-product");
      } else {
        productElements = $("li.product.type-product");
      }

      if (!productElements.length) break;
      const pageProducts = productElements.map((i, el) => {
        if (isRacersEdge) {
          let title = $(el).find("a.product-loop-title").text().trim();
          if (!title) {
            title = $(el).find("h3.woocommerce-loop-product__title").text().trim();
          }
          if (!title) {
            title = "Unknown Product";
          }
          const $img = $(el).find(".picture img");
          let imageUrl =
            $img.attr("data-lazyloadsrc") ||
            $img.attr("data-lazy-load-src") ||   
            $img.attr("src") ||
            "";
          if (imageUrl.startsWith("/")) {
            imageUrl = new URL(imageUrl, baseUrl).href;
          }
          const productUrl = "https://www.theracersedge.co.za" + ($(el).find("a").attr("href") || "");
          const priceTextRaw = $(el).find(".actual-price").text().trim();
          const priceText = priceTextRaw.replace(/[R\s\u00A0]/g, '').replace(',', '.');
          const price = parseFloat(priceText) || 0;
          if (!title || !price || !imageUrl || !productUrl) return null;
          const manufacturerMatch = title.match(/Ford|BMW|Toyota|Renault|Nissan|Mazda|Volkswagen|Isuzu|Hyundai|BAIC/i);
          const manufacturer = manufacturerMatch ? manufacturerMatch[0] : "Unknown";
          return {
            title,
            price,
            image: imageUrl,
            url: productUrl,
            available: true,
            manufacturer,
            type: matType  
          };
        }
        else if (isSBRProSound) {
          const title = $(el).find("a.product-loop-title").text().trim();
          const productUrl = $(el).find("a.product-loop-title").attr("href")?.trim() || "";
          const imageUrl = $(el).find("div.product-image img").attr("src")?.trim() || "";
          let priceTextRaw = $(el).find("span.price").text().trim();
          const priceText = priceTextRaw.replace(/R|\s|,/g, '');
          const price = parseFloat(priceText) || 0;
          const manufacturerMatch = title.match(/Nakamichi|Sony|Pioneer|Kenwood|JVC|JBL|Boss/i);
          const manufacturer = manufacturerMatch ? manufacturerMatch[0] : "Unknown";
          if (!title || !price || !imageUrl || !productUrl) {
            console.log("❌ Skipping radio product due to missing info", { title, price, imageUrl, productUrl });
            return null;
          }
          console.log("✅ Radio product scraped:", { title, price, imageUrl, productUrl });
          return {
            title,
            price,
            image: imageUrl,
            url: productUrl,
            available: true,
            manufacturer,
            type: matType,
          };
        }
        else {
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
          return {
            title,
            price,
            image,
            url: productUrl,
            available: true,
            manufacturer,
            type
          };
        }
      }).get().filter(p => p);
      for (const p of pageProducts) {
        try {
          if (!p.type || p.type.toLowerCase() === 'unknown') continue;
          const type = p.type.toLowerCase();
          let Model;
          if (type === 'roof rack') {
            Model = RoofRackProduct;
          } else if (type === 'rims') {
            Model = RimsProduct;
          } else if (type.includes('radio')) {
            Model = RadioProduct;
          } else {
            Model = MatProduct;
          }
          const exists = await Model.findOne({ url: p.url });
          if (!exists) {
            await new Model(p).save();
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

router.get('/scrape-if-needed', async (req: Request, res: Response): Promise<any> => {
  try {
    const [matCount, roofRackCount, rimsCount, radioCount] = await Promise.all([
      MatProduct.countDocuments(),
      RoofRackProduct.countDocuments(),
      RimsProduct.countDocuments(),
      RadioProduct.countDocuments()

    ]);
    if (matCount > 0 && roofRackCount > 0 && rimsCount > 0 ) {
      return res.status(200).json({
        message: "Already populated",
        scraped: false,
        matCount,
        roofRackCount,
        rimsCount,
      });
    }
    const products = await scrapeAllProductDetails();
    res.status(200).json({
      message: "Scraped successfully",
      scraped: true,
      totalCount: products.length,
      matCount: products.filter(p => !p.type.toLowerCase().includes('roof') && !p.type.toLowerCase().includes('rims') && !p.type.toLowerCase().includes('radio')).length,
      roofRackCount: products.filter(p => p.type.toLowerCase().includes('roof')).length,
      rimsCount: products.filter(p => p.type.toLowerCase().includes('rims')).length,
      radioCount: products.filter(p => p.type.toLowerCase().includes('radio')).length,
    });
  } catch (error) {
    console.error("Error during conditional scrape:", error);
    res.status(500).json({
      message: "Error during conditional scrape",
      error: String(error)
    });
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

router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const productType = (req.query.type as string || 'mat').toLowerCase();
    let Model;
    if (productType === 'roofrack' || productType === 'roof-rack') {
      Model = RoofRackProduct;
    } else if (productType === 'rims') {
      Model = RimsProduct;
    } else if (productType === 'radio' || productType === 'android-radio') {
      Model = RadioProduct;
    } else {
      Model = MatProduct;
    }
    const [products, total] = await Promise.all([
      Model.find().skip(skip).limit(limit),
      Model.countDocuments()
    ]);
    res.status(200).json({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      type: productType,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

module.exports = router;
