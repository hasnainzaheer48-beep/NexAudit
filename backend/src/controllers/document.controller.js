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

const getDocument = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM documents WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.send("This document does not exist");
        }
        const document = result.rows[0];
        return res.sendFile(document.file_path)

    }
    catch (error) {
        console.error(error)
        return res.status(500).send('Could Not Open Document');
    }
}

const downloadDocument = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM documents WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("This document does not exist");
        }
        const document = result.rows[0];
        return res.download(document.file_path, document.original_name);

    }
    catch (error) {
        console.error(error)
        return res.status(500).send('Could Not Download Document');
    }
}




module.exports = { uploadDocument, getDocumentsByTask, getDocument, downloadDocument }