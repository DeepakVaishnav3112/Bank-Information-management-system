import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, login again!' });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token matches the stored admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: 'Not authorized, login again!' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default adminAuth;
