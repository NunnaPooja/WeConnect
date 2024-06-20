const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Check if authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in 1" });
  }
  // Extract the token from the header
  const token = authorization.replace("Bearer ", "");
  // Verify the token
  jwt.verify(token, Jwt_secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in 2" });
    }

    const { _id  } = payload;
    USER.findById(_id ).then((userData) => {
      req.user = userData;
      next();
    }).catch((err) => {
      console.log(err);
    });
  });
};
