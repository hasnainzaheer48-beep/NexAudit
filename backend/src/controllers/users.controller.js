const pool = require('../config/db.js');
const bcrypt = require('bcrypt');
const { createActivityLog } = require('../utils/activityLogger.js');
const { buildChanges } = require('../utils/buildChanges.js');

//Get all users

const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        let result = await pool.query('SELECT * FROM users WHERE is_active = true ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
        const countResult = await pool.query(`
            SELECT COUNT(*)
            FROM users
            WHERE is_active = true
            `)

        const total = Number(countResult.rows[0].count)
        const totalPages = Math.ceil(total / limit)
        if (result.rows.length === 0) {
            return res.status(404).send('Logs not found');
        }

        return res.json({
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
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
        let result = await pool.query('SELECT * FROM users WHERE id=$1 AND is_active = true', [id]);

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
        let result = await pool.query(`
                                        INSERT INTO users
                                        (first_name,last_name,email,password_hash,role,phone_number)
                                        values ($1,$2,$3,$4,$5,$6)
                                        RETURNING *`,
            [first_name, last_name, email, password_hash, role, phone_number]
        );

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'User',
                changedBy: req.user.id,
                action: 'Created',
                newValue:
                {
                    first_name: result.rows[0].first_name,
                    last_name: result.rows[0].last_name,
                    role: result.rows[0].role,
                    phone_number: result.rows[0].phone_number,

                }
            }
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
            email,
            password,
            role,
            phone_number } = req.body;

        const { id } = req.params;

        const password_hash = null;

        if (password) {

            password_hash = await bcrypt.hash(password, 10);
        }

        const oldRecord = await pool.query(`SELECT * FROM users WHERE id= $1`, [id]);
        const result = await pool.query(`
                UPDATE users
                SET 
                first_name = COALESCE($1, first_name),
                last_name = COALESCE($2, last_name),
                email =  COALESCE($3, email),
                password_hash = COALESCE($4, password_hash),
                role = COALESCE($5, role),
                phone_number = COALESCE($6, phone_number),
                updated_at = CURRENT_TIMESTAMP

                WHERE id = $7

                RETURNING *
                `, [first_name,
            last_name,
            email,
            password_hash,
            role,
            phone_number, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User Not Found");
        }

        const { oldValue, newValue } = buildChanges(oldRecord.rows[0], result.rows[0], [
            "first_name", "last_name", "phone_number", "email", "password_hash", "role"
        ])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'User',
                changedBy: req.user.id,
                action: 'Updated',
                oldValue,
                newValue
            }
        );
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

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'User',
                changedBy: req.user.id,
                action: 'Deleted',
                oldValue: result.rows[0],

            }
        );

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete User");
    }
}

const unassignUser = async (req, res) => {

    try {
        const { id } = req.params;
        const oldRecord = await pool.query(`SELECT * FROM users WHERE id= $1`, [id]);
        const result = await pool.query(`
            UPDATE users
            SET is_active = false
            WHERE id = $1
            AND is_active = true
            RETURNING *
            `, [id])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'User',
                changedBy: req.user.id,
                action: 'Deactivated',
                oldValue: oldRecord.rows[0],

            }
        );

        res.json(result.rows[0]);


    } catch (error) {
        console.error(error);
        res.status(500).send(`Could not unassign User`)
    }

}




module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, unassignUser };