require("dotenv").config();
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(403).json({
        message: "Invalid token",
      });
    } else {
     next();
    }
  });
}

module.exports = authMiddleware;
