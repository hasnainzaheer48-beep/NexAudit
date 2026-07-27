const pool = require('../config/db');

//get all task templates


const getTemplateTasks = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM template_tasks`);
        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Template Task');
    }
}


//get taks template by id

const getTemplateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM template_tasks WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Could not find the Template Task');
        }
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Template Task');
    }
}


//create task template

const createTemplateTask = async (req, res) => {
    try {
        let { template_id,
            title,
            description,
            priority,
            order_number } = req.body;

        if (!template_id) {
            return res.status(400).send("Template Id name is required");
        }

        if (!title) {
            return res.status(400).send("Title is required");
        }

        if (!order_number) {
            return res.status(400).send("Order Number is required");
        }

        let result = await pool.query(`INSERT
                                         INTO template_tasks(
                                         template_id,
                                         title,
                                         description,
                                         priority,
                                         order_number)
                                        values ($1,$2,$3,$4,$5)
                                        RETURNING *`,
            [template_id,
                title,
                description,
                priority,
                order_number]
        );

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create Template Task");
    }
}

//update task template

const updateTemplateTask = async (req, res) => {
    try {
        const { title, description, priority, order_number } = req.body;
        const { id } = req.params;
        const result = await pool.query(`UPDATE template_tasks
                                         SET
                                         title = COALESCE($1,title),
                                         description = COALESCE($2, description),
                                         priority = COALESCE($3, priority),
                                         order_number = COALESCE($4,order_number),
                                         updated_at = CURRENT_TIMESTAMP

                                         WHERE id= $5
                                         
                                         RETURNING *`,
            [title, description, priority, order_number, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Template Task");
        }


        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Update Template Task");

    }
}

//delete task template

const deleteTemplateTask = async (req, res) => {

    try {

        const { id } = req.params;
        let result = await pool.query('DELETE FROM template_tasks WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Template Task Not Found");
        }

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Template Task");
    }
}

module.exports = {
    getTemplateTasks,
    getTemplateTaskById,
    createTemplateTask,
    updateTemplateTask,
    deleteTemplateTask
};

