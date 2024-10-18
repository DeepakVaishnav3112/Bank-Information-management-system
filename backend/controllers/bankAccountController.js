import bankAccountModel from "../models/BankAccount.js";
import jwt from "jsonwebtoken";

// Add a new bank account
const addBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
    req.body;

  try {
    // If no user is found in req.user, log an error
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no user ID found" });
    }

    const account = new bankAccountModel({
      user: req.user._id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });
    await account.save();
    res.status(200).json(account);
  } catch (error) {
    console.error("Error adding bank account:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's bank accounts
const getBankAccount = async (req, res) => {
  try {
    const accounts = await bankAccountModel.find({ user: req.user._id });
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Edit bank account
const editBankAccount = async (req, res) => {
  try {
    const account = await bankAccountModel.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    Object.assign(account, req.body);
    await account.save();
    res.status(200).json(account);
  } catch (error) {
    console.error("Error editing bank account:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete bank account
const deleteBankAccount = async (req, res) => {
  try {
    // Find the account by ID
    const account = await bankAccountModel.findById(req.params.id);

    // Check if the account exists
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if the user is authorized to delete the account
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Use deleteOne or findByIdAndDelete to remove the account
    await bankAccountModel.deleteOne({ _id: req.params.id }); // or account.remove()

    res.status(200).json({ message: "Account removed" });
  } catch (error) {
    console.error("Error deleting bank account:", error);
    res.status(500).json({ message: error.message });
  }
};

export { addBankAccount, getBankAccount, editBankAccount, deleteBankAccount };
