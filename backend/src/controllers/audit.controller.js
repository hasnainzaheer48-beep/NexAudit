const pool = require('../config/db');

//Get all Audits

const getAudits = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM audits`);
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
        const result = await pool.query(`SELECT * FROM audits WHERE id= $1`, [id]);
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

const createAudit = async (req, res) => {
    try {
        const { client_id,
            template_id,
            manager_id,

            audit_year,
            audit_type,

            priority,
            status,

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


        const result = await pool.query(`INSERT INTO 
                                         audits( client_id,
                                         template_id,
                                         manager_id,

                                         audit_year,
                                         audit_type,

                                         priority,
                                         status,

                                         description,
                                         start_date,
                                         due_date)
                                         VALUES
                                         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                                         RETURNING *`,
            [
                client_id,
                template_id,
                manager_id,

                audit_year,
                audit_type,

                priority,
                status,

                description,
                start_date,
                due_date
            ]);



        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create Audit");

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
                                         client_id = COALESCE($1),
                                         manager_id = COALESCE($2),
                                         audit_year = COALESCE($3),
                                         audit_type = COALESCE($4),

                                         priority = COALESCE($5),
                                         status = COALESCE($6),

                                         description = COALESCE($7),
                                         start_date = COALESCE($8),
                                         due_date = COALESCE($9),
                                         is_archived = COALESCE($10),

                                         updated_at = CURRENT_TIME

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