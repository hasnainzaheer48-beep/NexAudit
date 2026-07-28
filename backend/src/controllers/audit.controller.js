const pool = require('../config/db');

//Get all Audits

const getAudits = async (req, res) => {
    try {
        const result = await pool.query(`SELECT
                                        audits.*,
                                        clients.company_name AS client,
                                        users.first_name || ' ' || users.last_name AS manager,
                                        audit_templates.name AS template
                                        FROM audits
                                        JOIN clients
                                        ON audits.client_id = clients.id
                                        JOIN users
                                        ON audits.manager_id = users.id
                                        JOIN audit_templates
                                        ON audits.template_id = audit_templates.id`);
        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Audits');
    }
}

//Get Audit By Id

const getAuditById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT
                                        audits.*,
                                        clients.company_name AS client,
                                        users.first_name || ' ' || users.last_name AS manager,
                                        audit_templates.name AS template
                                        FROM audits
                                        JOIN clients
                                        ON audits.client_id = clients.id
                                        JOIN users
                                        ON audits.manager_id = users.id
                                        JOIN audit_templates
                                        ON audits.template_id = audit_templates.id
                                        WHERE audits.id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Audit");
        }
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not fetch Audit");

    }
}

//Create Audit

// const createAudit = async (req, res) => {
//     try {
//         const { client_id,
//             template_id,
//             manager_id,

//             audit_year,
//             audit_type,

//             priority,
//             status,

//             description,
//             start_date,
//             due_date } = req.body;

//         if (!client_id) {
//             return res.status(400).send("Client id is required");
//         }

//         if (!template_id) {
//             return res.status(400).send("Template Id is required");
//         }

//         if (!manager_id) {
//             return res.status(400).send("Manager id is required");
//         }

//         if (!audit_year) {
//             return res.status(400).send("Audit Year is required");
//         }

//         if (!audit_type) {
//             return res.status(400).send("Audit Type is required");
//         }

//         if (!priority) {
//             return res.status(400).send("Priority is required");
//         }


//         const result = await pool.query(`INSERT INTO 
//                                          audits( client_id,
//                                          template_id,
//                                          manager_id,

//                                          audit_year,
//                                          audit_type,

//                                          priority,
//                                          status,

//                                          description,
//                                          start_date,
//                                          due_date)
//                                          VALUES
//                                          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
//                                          RETURNING *`,
//             [
//                 client_id,
//                 template_id,
//                 manager_id,

//                 audit_year,
//                 audit_type,

//                 priority,
//                 status,

//                 description,
//                 start_date,
//                 due_date
//             ]);



//         res.json(result.rows[0]);
//     }

//     catch (error) {
//         console.error(error);
//         res.status(500).send("Could not Create Audit");

//     }

// }


const createAudit = async (req, res) => {

    const { client_id,
        template_id,
        manager_id,

        audit_year,
        audit_type,

        priority,

        description,
        start_date,
        due_date } = req.body;

    if (!client_id) {
        return res.status(400).send("Client id is required");
    }

    if (!template_id) {
        return res.status(400).send("Template Id is required");
    }

    if (!manager_id) {
        return res.status(400).send("Manager id is required");
    }

    if (!audit_year) {
        return res.status(400).send("Audit Year is required");
    }

    if (!audit_type) {
        return res.status(400).send("Audit Type is required");
    }

    if (!priority) {
        return res.status(400).send("Priority is required");
    }

    let client;

    try {

        client = await pool.connect();
        await client.query("BEGIN");

        const auditResult = await client.query(`INSERT INTO 
                                         audits( client_id,
                                         template_id,
                                         manager_id,

                                         audit_year,
                                         audit_type,

                                         priority,
                                        

                                         description,
                                         start_date,
                                         due_date)
                                         VALUES
                                         ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                                         RETURNING *`,
            [
                client_id,
                template_id,
                manager_id,

                audit_year,
                audit_type,

                priority,


                description,
                start_date,
                due_date
            ]);

        const audit = auditResult.rows[0];

        const templateTasksResult = await client.query(`SELECT * FROM template_tasks WHERE template_id = $1`, [audit.template_id]);
        const templateTasks = templateTasksResult.rows;

        for (const task of templateTasks) {
            await client.query(` INSERT INTO tasks(
                                                    audit_id,
                                                    template_task_id,
                                                    title,
                                                    description,
                                                    assigned_auditor_id,
                                                    priority, 
                                                    start_date,
                                                    due_date)
                                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [
                    audit.id,
                    task.id,
                    task.title,
                    task.description,
                    null,
                    task.priority,
                    audit.start_date,
                    audit.due_date
                ]);
        }

        await client.query("COMMIT");

        res.json(audit);

    }

    catch (error) {
        if (client) {
            await client.query("ROLLBACK");

        }
        console.error(error);
        res.status(500).send("Could not Create Audit");

    }

    finally {
        if (client) {

            await client.release();
        }
    }

}

//Update Audit

const updateAudit = async (req, res) => {
    try {
        const { client_id,
            manager_id,
            audit_year,
            audit_type,

            priority,
            status,

            description,
            start_date,
            due_date,
            is_archived } = req.body;
        const { id } = req.params;
        const result = await pool.query(`UPDATE audits
                                         SET
                                         client_id = COALESCE($1, client_id),
                                         manager_id = COALESCE($2, manager_id),
                                         audit_year = COALESCE($3, audit_year),
                                         audit_type = COALESCE($4, audit_type),

                                         priority = COALESCE($5, priority),
                                         status = COALESCE($6, status),

                                         description = COALESCE($7, description),
                                         start_date = COALESCE($8, start_date),
                                         due_date = COALESCE($9, due_date),
                                         is_archived = COALESCE($10, is_archived),

                                         updated_at = CURRENT_TIMESTAMP

                                         WHERE id= $11
                                         
                                         RETURNING *`,
            [
                client_id,
                manager_id,
                audit_year,
                audit_type,

                priority,
                status,

                description,
                start_date,
                due_date,
                is_archived,
                id
            ]);

        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Audit");
        }


        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Update Audit");

    }
}


//Delete Audit

const deleteAudit = async (req, res) => {

    try {

        const { id } = req.params;
        let result = await pool.query('DELETE FROM audits WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Audit Not Found");
        }

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Audit");
    }
}


module.exports = {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit
}