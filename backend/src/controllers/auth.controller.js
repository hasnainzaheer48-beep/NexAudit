const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send("Add both email and password");
        }
        const result = await pool.query(`SELECT * FROM users where email = $1`, [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).send("Wrong Credentials");
        }

        const password_check = await bcrypt.compare(password, user.password_hash);

        if (!password_check) {
            return res.status(401).send("Wrong Credentials");
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role

        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            message: "Login Successful",
            token
        })

    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Login')
    }



}


const getCurrentUser = async (req, res) => {

    const id = req.user.id;

    try {
        const result = await pool.query(`SELECT
                                            id,
                                            first_name,
                                            last_name,
                                            role,
                                            email,
                                            phone_number,
                                            is_active
                                        FROM users
                                        WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        return res.send(result.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Could not get User');
    }
}



module.exports = {
    login, getCurrentUser
};