let dotenv = require("dotenv")

dotenv.config();

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET

if (!(DB_HOST && DB_PORT && DB_DATABASE && DB_USER && DB_PASSWORD && JWT_SECRET)) {
    throw new Error("Missing Cofiguration")
}

module.exports = { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, JWT_SECRET }