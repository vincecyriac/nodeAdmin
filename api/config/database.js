//connect with mysql database
const { createPool } = require('mysql');

//create connection pool and export by taking values form enviroment variables
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.MYSQL_DB,
    connectionLimit:  10
});

module.exports = pool;