const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};

const admin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = {
  protect,
  admin,
};