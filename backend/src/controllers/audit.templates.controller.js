const pool = require('../config/db');
const { createActivityLog } = require('../utils/activityLogger');
const { buildChanges } = require('../utils/buildChanges');

//Get all audit templates

const getAuditTemplates = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const result = await pool.query(`
            SELECT * FROM audit_templates
            WHERE is_active = true 
            ORDER BY id ASC
            LIMIT $1
            OFFSET $2`, [limit, offset]);
        const countResult = await pool.query(`
            SELECT COUNT(*)
            FROM audit_templates
            WHERE is_active = true
            `)

        const total = Number(countResult.rows[0].count)
        const totalPages = Math.ceil(total / limit)
        if (result.rows.length === 0) {
            return res.status(404).send('Templates not found');
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
        console.error(error);
        res.status(500).send("Could not fetch Audit Templates");

    }
}

//Get audit template by id

const getAuditTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM audit_templates WHERE id= $1 AND is_active = true`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Audit Template");
        }
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not fetch Audit Template");

    }
}

//Create audit template

const createAuditTemplate = async (req, res) => {
    try {
        const { name, description, audit_type, version } = req.body;

        if (!name) {
            return res.status(400).send("Template name is required");
        }

        if (!audit_type) {
            return res.status(400).send("Audit type is required");
        }

        if (!version) {
            return res.status(400).send("Version is required");
        }

        const result = await pool.query(`INSERT INTO 
                                         audit_templates(name , description, audit_type, version)
                                         VALUES ($1,$2,$3,$4) RETURNING *`,
            [name, description, audit_type, version]);

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit Template',
                changedBy: req.user.id,
                action: 'Created',
                newValue: result.rows[0]
            }
        );

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create Audit Template");

    }
}


//Update audit template

const updateAuditTemplate = async (req, res) => {
    try {
        const { name, description, audit_type, version, is_active } = req.body;
        const { id } = req.params;

        const oldRecord = await pool.query(`SELECT * FROM audit_templates WHERE id= $1`, [id]);


        const result = await pool.query(`UPDATE audit_templates
                                         SET
                                         name = COALESCE($1,name),
                                         description = COALESCE($2, description),
                                         audit_type = COALESCE($3, audit_type),
                                         version = COALESCE($4,version),
                                         is_active = COALESCE($5, is_active),
                                         updated_at = CURRENT_TIMESTAMP

                                         WHERE id= $6
                                         
                                         RETURNING *`,
            [name, description, audit_type, version, is_active, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Audit Template");
        }

        const { oldValue, newValue } = buildChanges(oldRecord.rows[0], result.rows[0], ["name", "description", "audit_type", "version"])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit Template',
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
        res.status(500).send("Could not Update Audit Template");

    }
}


//Delete audit template

const deleteAuditTemplate = async (req, res) => {

    try {

        const { id } = req.params;
        let result = await pool.query('DELETE FROM audit_templates WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Audit Template Not Found");
        }

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit Template',
                changedBy: req.user.id,
                action: 'Deleted',
                oldValue: result.rows[0],

            }
        );


        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Audit Template");
    }
}


const deactivateAuditTemplate = async (req, res) => {

    try {
        const { id } = req.params;
        const oldRecord = await pool.query(`SELECT * FROM audit_templates WHERE id= $1`, [id]);
        const result = await pool.query(`
            UPDATE audit_templates
            SET is_active = false
            WHERE id = $1
            AND is_active = true
            RETURNING *
            `, [id])

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Audit Template',
                changedBy: req.user.id,
                action: 'Deactivated',
                oldValue: oldRecord.rows[0],

            }
        );

        res.json(result.rows[0]);


    } catch (error) {
        console.error(error);
        res.status(500).send(`Could not deactivate Audit Template`)
    }

}

module.exports = { getAuditTemplates, getAuditTemplateById, createAuditTemplate, updateAuditTemplate, deleteAuditTemplate, deactivateAuditTemplate };