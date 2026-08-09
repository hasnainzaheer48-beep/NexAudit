const pool = require('../config/db');


const createComment = async (req, res) => {

    try {
        const { taskId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.send('Content Required');
        }
        const result = await pool.query(`
            INSERT INTO 
            comments(
            task_id,
            user_id,
            content
            )
            VALUES($1,$2,$3)
            RETURNING*
            `, [taskId, req.user.id, content]);

        res.json(result.rows[0]);


    }
    catch (error) {

        return res.status(500).send('Could not create comment');

    }
}

const getCommentsByTask = async (req, res) => {

    try {
        const result = await pool.query(`
           select 
            comments.*,
            users.first_name || ' ' || users.last_name as user,
            users.role

            from comments
            join users
            on comments.user_id = users.id
            WHERE task_id = $1
            AND is_false = false
            `,
            [
                req.task.id
            ]);

        res.json(result.rows);



    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could Not get Comments by Tasks");

    }
}

const editComment = async (req, res) => {

    try {

        const { commentId } = req.params;
        const { content } = req.body;

        const result = await pool.query(`
            UPDATE comments
            SET content = $1;
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *

            `, [content, commentId]);


        res.json(result.rows[0]);



    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could Not edit comment");

    }
}

const deleteComment = async (req, res) => {

    try {

        const { commentId } = req.params;


        const result = await pool.query(`
            UPDATE comments
            SET is_deleted = true,
            deleted_at = CURRENT_TIMESTAMP
            WHERE id = $2
            AND is_deleted = false
            RETURNING *

            `, [commentId]);


        res.json(result.rows[0]);



    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could Not delete comment");

    }
}


module.exports = { createComment, getCommentsByTask, editComment, deleteComment }
