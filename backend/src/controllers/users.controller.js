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

const createUser = async (req, res) => {
    try {
        let { first_name,
            last_name,
            email,
            password_hash,
            role,
            phone_number } = req.body;
        let result = await pool.query('INSERT INTO users(first_name,last_name,email,password_hash,role,phone_number) values ($1,$2,$3,$4,$5,$6) RETURNING *',
            [first_name, last_name, email, password_hash, role, phone_number]
        );
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create User");
    }
}

module.exports = { getUsers, createUser };