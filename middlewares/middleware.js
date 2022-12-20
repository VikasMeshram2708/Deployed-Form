const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(422).json({
        messag: "Failed to authenticate the token",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = fetchuser;
