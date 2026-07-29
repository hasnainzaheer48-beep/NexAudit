const pool = require('../config/db');

//get Tasks

const getTasks = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM tasks`);
        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Tasks');
    }
}


//get Tasks by Id

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Could not find the Task');
        }
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Task');
    }
}


// //create Task

// const createTask = async (req, res) => {
//     try {
//         let {
//             audit_id,
//             template_task_id,
//             title,
//             description,
//             assigned_auditor_id,
//             priority,
//             status
//         } = req.body;

//         if (!audit_id) {
//             return res.status(400).send("Audit Id name is required");
//         }

//         if (!template_task_id) {
//             return res.status(400).send("Template Task id is required");
//         }

//         if (!title) {
//             return res.status(400).send("Title is required");
//         }


//         let result = await pool.query(`INSERT
//                                          INTO tasks(
//                                          audit_id,
//                                          template_task_id,
//                                          title,
//                                          description,
//                                          assigned_auditor_id,

//                                          )
//                                         values ($1,$2,$3,$4,$5)
//                                         RETURNING *`,
//             [
//                 audit_id,
//                 template_task_id,
//                 title,
//                 description,
//                 assigned_auditor_id,

//             ]
//         );

//         res.json(result.rows[0]);
//     }

//     catch (error) {
//         console.error(error);
//         res.status(500).send("Could not Create Task");
//     }
// }


//update Task

const updateTask = async (req, res) => {
    try {
        const { audit_id,
            template_task_id,
            title,
            description,
            assigned_auditor_id,
            priority,
            status,
            start_date,
            due_date,
            completed_at } = req.body;
        const { id } = req.params;
        const result = await pool.query(`UPDATE tasks
                                         SET
                                         audit_id = COALESCE($1, audit_id),
                                         template_task_id = COALESCE($2, template_task_id),
                                         title = COALESCE($3, title),
                                         description = COALESCE($4, description),
                                         assigned_auditor_id = COALESCE($5, assigned_auditor_id),
                                         priority = COALESCE($6, priority),
                                         status = COALESCE($7, status),
                                         start_date = COALESCE($8, start_date),
                                         due_date = COALESCE($9, due_date),
                                         completed_at = COALESCE($10, completed_at),
                                         updated_at = CURRENT_TIMESTAMP

                                         WHERE id= $11
                                         
                                         RETURNING *`,
            [
                audit_id,
                template_task_id,
                title,
                description,
                assigned_auditor_id,
                priority,
                status,
                start_date,
                due_date,
                completed_at, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Task");
        }


        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Update Task");

    }
}


//delete Task

const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;
        let result = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Task Not Found");
        }

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Task");
    }
}


const getTasksByAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const audit = await pool.query(`SELECT id FROM audits where id=$1`, [id]);
        if (audit.rows.length === 0) {
            return res.status(404).send('Audit not found');
        }
        const result = await pool.query(`SELECT   
                                        id,
                                        title,
                                        description,
                                        priority,
                                        status,
                                        assigned_auditor_id,
                                        due_date
                                        FROM tasks WHERE audit_id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(200).send([]);
        }
        return res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not get tasks");
    }
}

const assignAuditor = async (req, res) => {
    try {
        let newAuditorId;

        const requestedAuditorId = req.body.assigned_auditor_id;
        const taskId = req.params.id;


        let auditorId = requestedAuditorId;

        if (auditorId !== null) {
            auditorId = Number(auditorId);

            if (!Number.isInteger(auditorId) || auditorId < 1) {
                return res.status(400).send("Invalid auditor id");
            }
        }

        // Check task exists
        const taskResult = await pool.query(
            `SELECT id, assigned_auditor_id 
             FROM tasks 
             WHERE id = $1`,
            [taskId]
        );

        if (taskResult.rows.length === 0) {
            return res.status(404).send("Task not found");
        }

        const task = taskResult.rows[0];


        if (auditorId === task.assigned_auditor_id) {

            if (auditorId === null) {
                const currentTask = await pool.query(
                    `SELECT 
                        id,
                        title,
                        description,
                        priority,
                        status,
                        assigned_auditor_id,
                        due_date
                     FROM tasks
                     WHERE id = $1`,
                    [taskId]
                );

                return res.json(currentTask.rows[0]);
            }

            return res.status(200).send("Auditor is already assigned to this task");
        }

        // Removing assignment
        if (auditorId === null) {
            newAuditorId = null;
        }

        // Assigning auditor
        else {
            const auditorResult = await pool.query(
                `SELECT id, role
                 FROM users
                 WHERE id = $1`,
                [auditorId]
            );

            if (auditorResult.rows.length === 0) {
                return res.status(404).send("User does not exist");
            }

            const auditor = auditorResult.rows[0];

            if (auditor.role !== "AUDITOR") {
                return res.status(403).send("User is not an Auditor");
            }

            newAuditorId = auditor.id;
        }

        // Update task
        const updatedTask = await pool.query(
            `UPDATE tasks
             SET assigned_auditor_id = $1
             WHERE id = $2
             RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_auditor_id,
                due_date`,
            [newAuditorId, taskId]
        );

        return res.json(updatedTask.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send("Could not assign auditor");
    }
};


const getTasksByAuditor = async (req, res) => {

    try {

        const auditorId = req.user.id;
        const result = await pool.query(`
            SELECT
            tasks.id,
            tasks.title,
            tasks.description,
            tasks.priority,
            tasks.status,
            tasks.start_date,
            tasks.due_date,
        clients.company_name AS client,
        audits.id AS audit_id,
        audits.audit_type AS audit_type
        
        FROM tasks
        
        JOIN audits
        ON tasks.audit_id = audits.id
        
        JOIN clients
        ON audits.client_id = clients.id
        
        WHERE tasks.assigned_auditor_id = $1


        ORDER BY tasks.due_date ASC
        `, [auditorId]);
        res.send(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could not get tasks");
    }
}


module.exports = { getTasks, getTaskById, updateTask, deleteTask, getTasksByAudit, assignAuditor };
