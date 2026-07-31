const pool = require('../config/db');


const getActivityLog = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
            activity_logs.id,
            activity_logs.entity_id,
            activity_logs.entity_type,
            users.first_name||' '|| users.last_name AS changed_by,
            activity_logs.action,
            activity_logs.old_value,
            activity_logs.new_value,
            activity_logs.created_at


            FROM activity_logs
            JOIN users
            ON activity_logs.changed_by = users.id
            
            ORDER BY activity_logs.created_at DESC`);

        if (result.rows.length === 0) {
            return res.status(404).send('Logs not found');
        }

        return res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        return res.status(500).send("Could not fetch activity logs")
    }
}


const getActivityLogById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
            SELECT
            activity_logs.id,
            activity_logs.entity_id,
            activity_logs.entity_type,
            users.first_name||' '|| users.last_name AS changed_by,
            activity_logs.action,
            activity_logs.old_value,
            activity_logs.new_value,
            activity_logs.created_at


            FROM activity_logs
            JOIN users
            ON activity_logs.changed_by = users.id

            WHERE activity_logs.id = $1
            ORDER BY activity_logs.created_at DESC;`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Log not found');
        }

        return res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        return res.status(500).send("Could not fetch activity log")
    }
}

const getActivityLogByEntityType = async (req, res) => {
    try {
        const { entity_type } = req.params
        const result = await pool.query(`
            SELECT
        
            activity_logs.id,
            activity_logs.entity_id,
            activity_logs.entity_type,
            users.first_name||' '|| users.last_name AS changed_by,
            activity_logs.action,
            activity_logs.old_value,
            activity_logs.new_value,
            activity_logs.created_at


            FROM activity_logs
            JOIN users
            ON activity_logs.changed_by = users.id

            WHERE activity_logs.entity_type = $1
            ORDER BY activity_logs.created_at DESC;`, [entity_type]);

        if (result.rows.length === 0) {
            return res.status(404).send('Log not found');
        }

        return res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        return res.status(500).send("Could not fetch activity log")
    }
}




module.exports = { getActivityLog, getActivityLogById, getActivityLogByEntityType };