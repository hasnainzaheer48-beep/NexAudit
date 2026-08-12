const pool = require('../config/db');
const { createActivityLog } = require('../utils/activityLogger');
const { buildChanges } = require('../utils/buildChanges');

//Get all Audits

const getAudits = async (req, res) => {
    try {
        const result = await pool.query(`SELECT
                                        audits.*,
                                        clients.company_name AS client,
                                        users.first_name || ' ' || users.last_name AS manager,
                                        audit_templates.name AS template
                                        FROM audits

                                        LEFT JOIN clients
                                        ON audits.client_id = clients.id
                                        LEFT JOIN users
                                        ON audits.manager_id = users.id
                                        LEFT JOIN audit_templates
                                        ON audits.template_id = audit_templates.id
                                        
                                        WHERE is_archived = false`);
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
                                        WHERE audits.id = $1
                                        AND is_archived = false
                                        `, [id]);
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


    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }

    const { client_id,
        template_id,


        audit_year,
        audit_type,

        priority,

        description,
        start_date,
        due_date } = req.body;

    const manager_id = req.user.id;



    if (!client_id) {
        return res.status(400).send("Client id is required");
    }

    if (!template_id) {
        return res.status(400).send("Template Id is required");
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

        await createActivityLog({
            entityId: audit.id,
            entityType: 'Audit',
            changedBy: req.user.id,
            action: 'Created',
            oldValue: null,
            newValue: {
                client: client_id,
                template: template_id,
                manager: manager_id,

                audit_year: audit_year,
                audit_type: audit_type,

                priority: priority,


                description: description,
                start_date: start_date,
                due_date: due_date

            },
            db: client
        });
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
        if (status === 'Finished') {
            return res.status(400).send("Use /complete endpoint to complete an audit");
        }

        const oldRecord = await pool.query(`SELECT * FROM audits where id =$1`, [id]);
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

        const { oldValue, newValue } = buildChanges(oldRecord.rows[0], result.rows[0], ["client_id",
            "manager_id",
            "audit_year",
            "audit_type",

            "priority",
            "status",

            "description",
            "start_date",
            "due_date",
            "is_archived",])

        await createActivityLog(
            {
                entityId: id,
                entityType: 'Audit',
                changedBy: req.user.id,
                action: 'Updated',
                oldValue,
                newValue

            }
        )
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

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit',
                changedBy: req.user.id,
                action: 'Deleted',
                oldValue: result.rows[0]
            }
        );

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Audit");
    }
}


const getAuditprogress = async (req, res) => {
    const auditId = req.params.id;
    try {
        const auditResult = await pool.query(`SELECT id FROM audits WHERE id=$1`, [auditId]);
        const audit = auditResult.rows;
        if (audit.length === 0) {
            return res.status(404).send("Audit Not Found");
        }

        const totalTaskResult = await pool.query(`SELECT COUNT(status) FROM tasks WHERE audit_id = $1 `, [auditId]);
        const finishedTaskResult = await pool.query(`SELECT COUNT(status) FROM tasks WHERE audit_id = $1 AND status='Finished' `, [auditId]);


        const totalTask = Number(totalTaskResult.rows[0].count);
        if (totalTask === 0) {
            return res.json({
                total_task: 0,
                finished_task: 0,
                progress: 0
            })
        }
        const finishedTask = Number(finishedTaskResult.rows[0].count);

        let progress = Math.round((finishedTask / totalTask) * 100);
        return res.json({
            total_task: totalTask,
            finished_task: finishedTask,
            progress: progress
        })

    }

    catch (error) {
        console.error(error);
        return res.send('Could not fetch progress');
    }


}

const finishAudit = async (req, res) => {
    const auditId = req.params.id;
    try {
        const auditResult = await pool.query(`SELECT id,status FROM audits WHERE id=$1`, [auditId]);
        if (auditResult.rows.length === 0) {
            return res.status(404).send("Audit Not Found");
        }
        const audit = auditResult.rows[0];
        if (audit.status === 'Finished') {
            return res.status(400).send('Audit is already Completed');
        }

        const taskCount = await pool.query(`
            SELECT
            COUNT(*)
            FROM tasks
            WHERE 
            audit_id = $1
            `, [auditId])

        if (Number(taskCount.rows[0].count) === 0) {
            return res.status(400).send("Audit has no tasks");
        }

        const taskResult = await pool.query(`
            SELECT COUNT(*)
            FROM tasks
            WHERE audit_id = $1
            AND status<>'Finished'`, [auditId]);
        const task = Number(taskResult.rows[0].count);
        if (task !== 0) {
            return res.status(400).send("There are unfinished tasks");
        }

        const updateAuditStatus = await pool.query(`
            UPDATE audits
            SET status = 'Finished',
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
            `, [auditId]);

        await createActivityLog(
            {
                entityId: auditId,
                entityType: 'Audit',
                changedBy: req.user.id,
                action: 'Completed',
                oldValue: {
                    status: auditResult.rows[0].status

                },
                newValue: {
                    status: updateAuditStatus.rows[0].status

                }
            }
        );
        res.json(updateAuditStatus.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to change status of audit to complete");
    }
}

const getAuditsByManager = async (req, res) => {
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
                                        ON audits.template_id = audit_templates.id
                                        WHERE audits.manager_id = $1
                                        AND is_archived = false
                                        `, [req.user.id]);

        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not fetch Audits");

    }
}

const archiveAudit = async (req, res) => {

    try {
        const { id } = req.params;
        const oldRecord = await pool.query(`SELECT * FROM audits id= $1`, [id]);
        const result = await pool.query(`
            UPDATE audits
            SET is_archived = true,
            archived_at = CURRENT_TIMESTAMP
            WHERE id = $1
            AND is_archived = false
            RETURNING *
            `, [id])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit',
                changedBy: req.user.id,
                action: 'Archived',
                oldValue: oldRecord.rows[0],

            }
        );

        res.json(result.rows[0]);


    } catch (error) {
        console.error(error);
        res.status(500).send(`Could not archive Audit`)
    }

}


module.exports = {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit,
    getAuditprogress,
    finishAudit,
    getAuditsByManager,
    archiveAudit
}