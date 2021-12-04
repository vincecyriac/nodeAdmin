const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { createAdmin, getAdminByUsername } = require("../models/admin.model");
const { verify } = require("jsonwebtoken");

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createAdmin(body, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json();
      }
    });
  },

  login: (req, res) => {
    const body = req.body;
    getAdminByUsername(body.userName, (data, err) => {
      if (err) {
        res.status(500).json(err);
      } else if (data.length === 0) {
        res.status(404).json({
          errorMessage: "Invalid credentials",
        });
      } else {
        const result = compareSync(body.password, data[0].password);
        if (result) {
          const accesstoken = sign(
            {
              id: data[0].id,
              userName: data[0].userName,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );

          const refreshtoken = sign(
            {
              id: data[0].id,
              userName: data[0].userName,
            },
            process.env.JWT_KEY,
            { expiresIn: "2d" }
          );

          res.status(200).json({
            accessToken: accesstoken,
            refreshToken: refreshtoken,
          });
        } else {
          res.status(401).json({
            errorMessage: "Invalid credentials",
          });
        }
      }
    });
  },

  refreshToken: (req, res) => {
    const accessToken = sign(
      {
        id: req.loggedUserID,
        userName: req.loggedUserName,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
    const refreshToken = sign(
      {
        id: req.loggedUserID,
        userName: req.loggedUserName,
      },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    );
    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },
};
