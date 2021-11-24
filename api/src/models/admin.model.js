const pool = require("../../config/database");

module.exports = {
  //create new admin user
  createAdmin: (data, callback) => {
    pool.query(
      "SELECT userName FROM `admin` WHERE username = ?;",
      [data.userName],
      (error, results, fields) => {
        if (error) {
          return callback({
            errorMessage: "Bad request",
          });
        }
        if (results.length > 0) {
          return callback({
            errorMessage: "Admin user already exists",
          });
        } else {
          pool.query(
            "INSERT INTO `admin` ( `userName`, `password`) VALUES (?,?);",
            [data.userName, data.password],
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

  //get admin by email
  getAdminByUsername: (email, callback) => {
    pool.query(
      "SELECT * FROM `admin` WHERE userName = ?",
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
