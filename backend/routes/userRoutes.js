import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { addBankAccount, getBankAccount, editBankAccount, deleteBankAccount } from "../controllers/bankAccountController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// Routes to manage bank accounts (protected) 
userRouter.post('/bank/add', protect, addBankAccount);
userRouter.get('/bank', protect, getBankAccount);
userRouter.put('/bank/:id', protect, editBankAccount);
userRouter.delete('/bank/:id', protect, deleteBankAccount);

export default userRouter;