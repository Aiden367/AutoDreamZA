import { Router, Request, Response } from "express";
import axios from 'axios';
import * as cheerio from 'cheerio';
import Stripe from "stripe";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


// POST /create-payment-intent
router.post('/create-payment-intent', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    if (!amount) {
       res.status(400).json({ error: "Amount is required" });
       return
    }

    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "zar", // or "usd" or your currency code
      // You can add more options here such as payment_method_types, metadata, etc.
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;