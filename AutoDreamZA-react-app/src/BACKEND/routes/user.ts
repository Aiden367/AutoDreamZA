//const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { User } = require('./models');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
import { Router, Request, Response } from "express";
import { sendOtp } from '../utils/sendOtp';
const router = Router();


router.delete('/cart/:userId/:productId', async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.cart = user.cart.filter((item: any) => item.productId !== productId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});


router.post('/change-password', async (req: Request, res: Response): Promise<void> => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Incorrect current password' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});



router.post('/cart/clear/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return
    }

    user.cart = []; // Clear the cart
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});


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
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    };
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



router.post('/request-otp', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtp(email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ error: 'Could not send OTP' });
  }
});

router.post('/verify-otp', async (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    };
    const isValid = user.otp === otp && user.otpExpires && new Date() < user.otpExpires;
    if (!isValid) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return
    }
    // Clear OTP so it can’t be reused
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

router.post('/update-account', async (req: Request, res: Response) => {
  const { userId, email, phoneNumber, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return
    }

    // Verify current password before updating anything sensitive
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Incorrect current password' });
      return
    }

    // Update email and phone if provided
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update password if newPassword is provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: 'Account updated successfully' });

  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Send password reset email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'Email not found' })
      return
    };


    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    const resetUrl = `http://localhost:5173/ResetPassword?token=${token}`;


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      text: `Reset your password using this link: ${resetUrl}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Error sending reset email' });
  }
});

router.post('/reset-password', async (req, res) => {
  // Get token from body or query
  const token = req.body.token || req.query.token;
  const { newPassword } = req.body;

  if (!token) {
     res.status(400).json({ error: 'Token is required' });
     return
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
     res.status(400).json({ error: 'Invalid or expired token' });
     return
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    res.status(200).json({ message: 'Password successfully reset' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});


module.exports = router;