const pool = require("../../config/database");

module.exports = {
  //create new user
  createUser: (data, callback) => {
    pool.query(
      "SELECT email FROM `users` WHERE email = ?;",
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callback({
            errorMessage: "Bad request",
          });
        }
        if (results.length > 0) {
          return callback({
            errorMessage: "User already exists",
          });
        } else {
          pool.query(
            "INSERT INTO `users` ( `firstName`, `lastName`, `gender`, `email`, `password`, `number`) VALUES (?,?,?,?,?,?);",
            [
              data.firstName,
              data.lastName,
              data.gender,
              data.email,
              data.password,
              data.number,
            ],
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              return callback(null, results);
            }
          );
        }
      }
    );
  },

  //get all users
  getAllUsers: (pagination, callback) => {
    const page = parseInt(pagination.page) || 1;
    const limit = parseInt(pagination.limit) || 10;
    const offset = (page - 1) * limit;
    pool.query(
      "SELECT id,firstName,lastName,email,gender,number,createdAt,updatedAt FROM `users` LIMIT ?,?",
      [offset, limit],
      (error, results, fields) => {
        returnData = {
          page: page,
          limit: limit,
          results: results,
        };
        if (error) {
          return callback(error);
        }
        return callback(returnData);
      }
    );
  },

  //get user by id
  getUserById: (id, callBack) => {
    pool.query(
      "SELECT id,firstName,lastName,email,gender,number,createdAt,updatedAt FROM users WHERE id= ?",
      [id],
      (results, error, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(results);
      }
    );
  },

  //delete user by id
  deleteUser: (id, callback) => {
    pool.query(
      "DELETE FROM `users` WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(results);
      }
    );
  },

  //get user by email
  getUserByEmail: (email, callback) => {
    pool.query(
      "SELECT * FROM `users` WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(results);
      }
    );
  },
  
};
