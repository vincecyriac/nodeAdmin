const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByEmail,
} = require("../models/user.model");
const { uiSocket } = require("../webSocket/socket");


module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, data) => {
      if (err) {
        res.status(500).json(err);
        global.io.emit("updateUser", {})
        //boradcast to all users
      } else {
        res.status(200).json();
      }
    });
  },

  getAllUsers: (req, res) => {
    getAllUsers(req.query, (data, err) => {
      if (err) {
        res.status(500).json({
          errorMessage: "Bad request",
        });
      } else {
        res.status(200).json(data);
      }
    });
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (data, err) => {
      if (err) {
        res.status(500).json(err);
      } else if (data.length === 0) {
        res.status(404).json({
          errorMessage: "User not found",
        });
      } else {
        res.status(200).json(data[0]);
      }
    });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (data, err) => {
      if (err) {
        res.status(500).json(err);
      } else if (data.affectedRows === 0) {
        res.status(404).json({
          errorMessage: "User not found",
        });
      } else {
        res.status(200).json();
      }
    });
  }
};
