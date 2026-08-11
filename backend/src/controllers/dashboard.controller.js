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
        console.error(error);
        res.status(500).send(error);

    }
}

const getOverdueAudits = async (req, res) => {

    try {
        const result = await pool.query(`
                                        SELECT
                                        audits.*,
                                        clients.company_name AS client,
                                        audit_templates.name AS template
                                        FROM audits
                                        JOIN clients
                                        ON audits.client_id = clients.id
                                        
                                        JOIN audit_templates
                                        ON audits.template_id = audit_templates.id
            where due_date < NOW() 
            AND status != 'Finished'
            AND manager_id = $1
           
            `, [req.user.id])

        return res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get overdue Audits ');

    }
}

const getUpcomingAudits = async (req, res) => {

    try {
        const result = await pool.query(`
                                        SELECT
                                        audits.*,
                                        clients.company_name AS client,
                                        audit_templates.name AS template
                                        FROM audits
                                        JOIN clients
                                        ON audits.client_id = clients.id
                                        
                                        JOIN audit_templates
                                        ON audits.template_id = audit_templates.id
                                        where due_date > NOW()
                                        AND due_date <= NOW() + INTERVAL '7 days'
                                        AND status != 'Finished'
                                        AND manager_id = $1

                                        ORDER BY due_date ASC
           
            `, [req.user.id])

        return res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get Upcoming Audits ');

    }
}



module.exports = { getAuditStats, getOverdueAudits, getUpcomingAudits }