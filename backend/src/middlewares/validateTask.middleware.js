const { pool } = require('../config/db')

const validateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const result = await pool.query(` SELECT id, audit_id FROM tasks where id = $1`, [taskId]);
        if (result.rows.length === 0) {
            return res.send("Task with this id does not Exist");
        }
        req.task = result.rows[0];

        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Could not check wether this task exist");
    }
}

module.exports = { validateTask }