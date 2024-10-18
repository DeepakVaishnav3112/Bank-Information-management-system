import express from "express";
import cors from 'cors';
import 'dotenv/config';
import multer from "multer";
import connectDB from "./config/mongodb.js";

// Import routes
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Configure multer for form data
const upload = multer(); // This is sufficient for handling form data
app.use(upload.none()); // Use multer to handle form data without file uploads

// API endpoints
app.use('/api/user', userRouter); // User related routes
app.use('/api/admin', adminRouter); // Admin related routes

// Test route
app.get('/', (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
});
