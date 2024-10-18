import jwt from 'jsonwebtoken'
import bankAccountModel from "../models/BankAccount.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all users bank accounts (admin only)
export const getAllUsersBankInfo = async (req, res) => {
  try {
    const accounts = await bankAccountModel
      .find()
      .populate("user", "username email");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};