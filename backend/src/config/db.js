let { Pool } = require("pg");
let { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = require('./env')



const pool = new Pool(
    {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
    }
);

module.exports = pool;