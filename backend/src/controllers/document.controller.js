const pool = require('../config/db');
const fs = require('fs/promises');

const uploadDocument = async (req, res) => {

    try {

        const result = await pool.query(`
            INSERT INTO 
            documents(
            audit_id, 
            task_id,
            uploaded_by,
            original_name,
            stored_name,
            file_path,
            mime_type,
            file_size,
            description )

            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
            `, [
            req.task.audit_id,
            req.task.id,
            req.user.id,
            req.file.originalname,
            req.file.filename,
            req.file.path,
            req.file.mimetype,
            req.file.size,
            req.body.description
        ]);

        return res.status(201).json(result.rows[0]);


    }

    catch (error) {
        console.error(error);
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            }

            catch (unlinkError) {
                console.error("Failed to remove uploaded file: ", unlinkError);
            }
        }
        return res.status(500).send('Could not Upload Doc')

    }

}

const getDocumentsByTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const result = await pool.query(`
            SELECT * 
            FROM documents
            WHERE task_id = $1`,
            [
                taskId
            ]);

        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could Not get Docs by Tasks");
    }
}

module.exports = { uploadDocument, getDocumentsByTask }