const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // token check
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }
};

module.exports = protect;