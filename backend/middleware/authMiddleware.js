const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //const decoded = jwt.verify(token);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
