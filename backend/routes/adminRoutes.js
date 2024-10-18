import express from "express";
import { adminLogin, getAllUsersBankInfo } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminauth.js";

const adminRouter = express.Router();

// Admin login route (protected)
adminRouter.post('/login', adminLogin);

// Admin route to get all users' bank accounts (protected)
adminRouter.get('/users/banks', adminAuth, getAllUsersBankInfo);

export default adminRouter;