const pool = require('../config/db');

//Get all audit templates

const getAuditTemplates = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM audit_templates`);
        res.json(result.rows);
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
        const result = await pool.query(`SELECT * FROM audit_templates WHERE id= $1`, [id]);
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
        const { name, description, audit_type, version } = req.body;
        const { id } = req.params;
        const result = await pool.query(`UPDATE audit_templates
                                         SET
                                         name = COALESCE($1,name),
                                         description = COALESCE($2, description),
                                         audit_type = COALESCE($3, audit_type),
                                         version = COALESCE($4,version),
                                         updated_at = CURRENT_TIMESTAMP

                                         WHERE id= $5
                                         
                                         RETURNING *`,
            [name, description, audit_type, version, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Could not fetch Audit Template");
        }


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

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Audit Template");
    }
}

module.exports = { getAuditTemplates, getAuditTemplateById, createAuditTemplate, updateAuditTemplate, deleteAuditTemplate };