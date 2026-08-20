const pool = require('../config/db');
const { createActivityLog } = require('../utils/activityLogger');
const { buildChanges } = require('../utils/buildChanges');

//get all task templates


const getTemplateTasks = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const result = await pool.query(`SELECT * FROM template_tasks WHERE is_archived = false`);
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
        const result = await pool.query(`SELECT * FROM template_tasks WHERE id = $1 AND is_archived = false `, [id]);
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

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Template Task',
                changedBy: req.user.id,
                action: 'Created',
                newValue: {
                    template_id: result.rows[0].template_id,
                    title: result.rows[0].title,
                    description: result.rows[0].description,
                    priority: result.rows[0].priority,
                    order_number: result.rows[0].order_number
                }
            }
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

        const oldRecord = await pool.query(`SELECT * FROM template_tasks WHERE id= $1`, [id]);

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

        const { oldValue, newValue } = buildChanges(oldRecord.rows[0], result.rows[0], [
            "title", "description", "priority", "order_number"
        ])


        await createActivityLog(
            {
                entityId: id,
                entityType: 'Template Task',
                changedBy: req.user.id,
                action: 'Updated',
                oldValue,
                newValue
            }
        );

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

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Template Task',
                changedBy: req.user.id,
                action: 'Deleted',
                oldValue: result.rows[0],

            }
        );


        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Template Task");
    }
}

const getTemplateTaskByAuditTemplate = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const { templateId } = req.params;
        const result = await pool.query(`
            SELECT * 
            FROM template_tasks
            WHERE template_id = $1
            AND is_archived = false
            ORDER BY order_number
            LIMIT $2
            OFFSET $3
            `, [templateId, limit, offset]);

        const countResult = await pool.query(`
            SELECT COUNT(*)
            FROM template_tasks
            WHERE is_archived = false
            AND template_id = $1
            `, [templateId])

        const total = Number(countResult.rows[0].count)
        const totalPages = Math.ceil(total / limit)
        if (result.rows.length === 0) {
            return res.status(404).send('Template Task not found');
        }

        return res.json({
            data: result.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });

    }

    catch (error) {
        return res.status(500).send('Could not Fetch template Tasks')
    }
}

const archiveTemplateTask = async (req, res) => {

    try {
        const { id } = req.params;
        const oldRecord = await pool.query(`SELECT * FROM template_tasks WHERE id= $1`, [id]);
        const result = await pool.query(`
            UPDATE template_tasks
            SET is_archived = true
            WHERE id = $1
            AND is_archived = false
            RETURNING *
            `, [id])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Template Task',
                changedBy: req.user.id,
                action: 'Archived',
                oldValue: oldRecord.rows[0],

            }
        );

        res.json(result.rows[0]);


    } catch (error) {
        console.error(error);
        res.status(500).send(`Could not archive Template Task`)
    }

}


module.exports = {
    getTemplateTasks,
    getTemplateTaskById,
    createTemplateTask,
    updateTemplateTask,
    deleteTemplateTask,
    getTemplateTaskByAuditTemplate,
    archiveTemplateTask
};

