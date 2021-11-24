const { verify } = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(401).json({
        errorMessage: "Invalid Token",
      });
    }

    verify(token, process.env.JWT_KEY, (err, user) => {
      if (err)
        return res.status(403).json({
          errorMessage: "Invalid Token",
        });
      req.loggedUserID = user.id;
      next();
    });
  },
};
