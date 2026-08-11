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


const getTasksStats = async (req, res) => {

    try {
        const result = await pool.query(`
            select
            COUNT(*) as total_tasks,
            COUNT(*) FILTER(WHERE status = 'In Progress' ) AS progress_tasks,
            COUNT(*) FILTER(WHERE status = 'Finished' )AS finished_tasks

            from tasks

            where assigned_auditor_id = $1
            `, [req.user.id])

        return res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);

    }
}

const getOverdueTasks = async (req, res) => {

    try {
        const result = await pool.query(`
                                         select
                                        tasks.*,
                                        clients.company_name AS company
                                        from
                                        tasks
                                        left join audits
                                        on tasks.audit_id = audits.id
                                        left join clients
                                        on audits.client_id = clients.id
        
            where tasks.due_date < NOW() 
            AND tasks.status != 'Finished'
            AND tasks.assigned_auditor_id = $1

            ORDER BY tasks.due_date ASC
           
            `, [req.user.id])

        return res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get overdue Tasks ');

    }
}

const getUpcomingTasks = async (req, res) => {

    try {
        const result = await pool.query(`
                                         select
                                        tasks.*,
                                        clients.company_name AS company
                                        from
                                        tasks
                                        left join audits
                                        on tasks.audit_id = audits.id
                                        left join clients
                                        on audits.client_id = clients.id
                                        where tasks.due_date > NOW()
                                        AND tasks.due_date <= NOW() + INTERVAL '7 days'
                                        AND tasks.status != 'Finished'
                                        AND tasks.assigned_auditor_id = $1

                                        ORDER BY tasks.due_date ASC
           
            `, [req.user.id])

        return res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get Upcoming Tasks ');

    }
}

const getUserStats = async (req, res) => {

    try {
        const result = await pool.query(`
                                        select
                                        COUNT(*) as total_users,
                                        COUNT(*) FILTER(WHERE role = 'AUDITOR') as total_auditors,
                                        COUNT(*) FILTER(WHERE role = 'MANAGER') as total_managers,
                                        COUNT(*) FILTER(WHERE role = 'AUDITOR' AND is_active = true ) as active_auditors,
                                        COUNT(*) FILTER(WHERE role = 'MANAGER' AND is_active = true ) as active_managers
                                        from users
            `,)

        return res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get User Stats ');

    }
}

const getClientsStats = async (req, res) => {

    try {
        const result = await pool.query(`
                                        select
                                        COUNT(*) as total_clients
                                        from clients
            `,)

        return res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get Clients Stats ');

    }
}


const getTotalAuditsStats = async (req, res) => {

    try {
        const result = await pool.query(`
                                        select
                                        COUNT(*) as total_audits,
                                        COUNT(*) FILTER(WHERE is_archived = false) AS active_audits
                                        from audits
            `,)

        return res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get Audits Stats ');

    }
}

module.exports = {
    getAuditStats,
    getOverdueAudits,
    getUpcomingAudits,
    getTasksStats,
    getOverdueTasks,
    getUpcomingTasks,
    getUserStats,
    getTotalAuditsStats,
    getClientsStats
}