const pool = require('../config/db');

const getAuditStats = async (req, res) => {

    try {
        const result = await pool.query(`
            select
            COUNT(*) as total_audits,
            COUNT(*) FILTER(WHERE status = 'In Progress' ) AS progress_audits,
            COUNT(*) FILTER(WHERE status = 'Finished' )AS finished_audits

            from audits

            where manager_id = $1
            `, [req.user.id])

        return res.json(result.rows[0]);

    } catch (error) {
        res.status(500).send('Could not get Audit Stats');

    }
}

module.exports = { getAuditStats }