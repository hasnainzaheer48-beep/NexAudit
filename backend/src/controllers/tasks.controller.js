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

module.exports = { getTasks, getTaskById, updateTask, deleteTask };
