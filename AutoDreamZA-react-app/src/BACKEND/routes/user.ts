//const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { User } = require('./models');
const jwt = require("jsonwebtoken");

import { Router, Request, Response } from "express";
const router = Router(); 


router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).select('-password'); // Exclude password
    if (!user) {
       res.status(404).json({ error: 'User not found' });
       return
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});


router.post('/cart/update', async (req: Request, res: Response) => {
  try {
    const { userId, cartItems } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.cart = cartItems;
    const updatedUser = await user.save();

    // ✅ Custom response with updated cart
    res.status(200).json({
      message: 'Cart updated successfully',
      cart: updatedUser.cart,
      userId: updatedUser._id
    });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

router.get('/cart/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).select('cart');
    if (!user){
       res.status(404).json({ error: 'User not found' });
       return;
    } ;
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
});



router.post('/Register', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user"
    });
    const savedUser = await user.save()
    res.status(201).send({ user: savedUser })

  } catch (error) {
    console.error('Error saving user or creating account', error);
  }
})

router.post('/Login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ error: "Invalid username or password" })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: "Invalid username or password" })
      return
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      role: user.role
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token, user info, and account details
    res.status(200).send({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Could not log the user in", error);
  }
})


module.exports = router;