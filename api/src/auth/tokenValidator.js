const { verify } = require("jsonwebtoken");
const { getAdminById } = require("../models/admin.model");

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
        return res.status(401).json({
          errorMessage: "Invalid Token",
        });

      //check weather user exist or not
      getAdminById(user.id, (user, err) => {
        if (err || user.length == 0) {
          return res.status(403).json({
            errorMessage: "Invalid Token",
          });
        }
        else {
          req.loggedUserID = user.id;
          next();
        }
      });
    });
  },

  //refreshtoken validation
  validateRefreshToken: (req, res, next) => {
    const rtoken = req.body.refreshToken;
    verify(rtoken, process.env.JWT_KEY, (err, tokenData) => {
      if (err)
        return res.status(403).json({
          errorMessage: "Invalid Token",
        });
      //check weather user exist or not
      getAdminById(tokenData.id, (user, err) => {
        if (err || user.length == 0) {
          return res.status(403).json({
            errorMessage: "Invalid Token",
          });
        }
        else {
          req.loggedUserID = tokenData.id;
          req.loggedUserName = tokenData.userName;
          next();
        }
      });
    });
  },
};
