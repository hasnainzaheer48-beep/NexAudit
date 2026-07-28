const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

//Get all users

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

//Get user by Id

const getUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User Not Found");
        }

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not fetch User");
    }
}



//Add data to users
const createUser = async (req, res) => {
    try {
        let { first_name,
            last_name,
            email,
            password,
            role,
            phone_number } = req.body;

        //hashing password
        const password_hash = await bcrypt.hash(password, 10);
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


// Update Data in Users

const updateUser = async (req, res) => {
    try {
        const { first_name,
            last_name,
            phone_number } = req.body;

        const { id } = req.params;

        const result = await pool.query(`
                UPDATE users
                SET 
                first_name = COALESCE($1, first_name),
                last_name = COALESCE($2, last_name),
                phone_number = COALESCE($3, phone_number),
                updated_at = CURRENT_TIMESTAMP

                WHERE id = $4

                RETURNING *
                `, [first_name, last_name, phone_number, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User Not Found");
        }

        res.json(result.rows[0]);

    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Update User");
    }
}


// Delete Record from Users

const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User Not Found");
        }

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete User");
    }
}




module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };