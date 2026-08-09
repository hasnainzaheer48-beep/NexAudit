const pool = require('../config/db');

const validateDocumentAccess = async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT
                                        documents.*,
                                        tasks.assigned_auditor_id,
                                        audits.manager_id
                                        FROM documents 
                                        JOIN tasks 
                                        ON documents.task_id = tasks.id
                                        JOIN audits 
                                        ON documents.audit_id = audits.id
                                        WHERE documents.id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Could not find the Document")
        }
        const document = result.rows[0];
        if (req.user.id === document.manager_id || req.user.id === document.assigned_auditor_id || req.user.role === "ADMIN") {
            return next();
        }

        return res.status(403).send("Forbidden");


    }
    catch (error) {
        console.error(error)
        return res.status(500).send('Could not validate document access');
    }
}

module.exports = { validateDocumentAccess };