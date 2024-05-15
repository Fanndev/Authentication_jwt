const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Get auth token
  let token = req.headers.authorization;
  console.log(req.headers);

  if (!token) {
    return res.status(403).send({
      message: `No token provided!`,
    });
  }

  token = token.split(" ").pop();

  try {
    // Verify token
    jwt.verify(token, "authNext", (err, decoded) => {
      if (err) {
        return res.status(401).send({ 
          message: `Unauthorized!`,
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Incorrect credential",
    });
  }
};
