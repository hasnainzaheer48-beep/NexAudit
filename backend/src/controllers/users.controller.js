const pool = require('../config/db.js');


const getUsers = async (req, res) => {
    try {
        let result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not fetch Users");
    }
}

module.exports = { getUsers };