import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  
      try {
        token = req.headers.authorization.split(' ')[1]; // Extract the token
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
  
        req.user = await userModel.findById(decoded.id).select('-password'); // Find user
        if (!req.user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
        }
  
        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        console.error("Token validation error:", error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      console.log("No token provided");
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  

export default protect;
