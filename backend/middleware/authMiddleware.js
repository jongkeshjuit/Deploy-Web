const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to check if user is authenticated 
const authMiddleware = async (req, res, next) => {
  try {
    // Ưu tiên lấy từ cookie, fallback về header
    let token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      // Clear expired cookie
      res.clearCookie('authToken');
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin access required" });
  }
};

// Chỉ export một lần ở cuối file
module.exports = { authMiddleware, isAdmin };