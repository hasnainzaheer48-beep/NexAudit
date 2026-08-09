const pool = require('../config/db');


const createComment = async (req, res) => {

    try {
        const { taskId } = req.params;
        const { content } = req.body
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
            `,
            [
                req.task.id
            ]);

        res.json(result.rows);



    }
    catch (error) {
        console.error(error);
        res.status(500).send("Could Not get Docs by Tasks");

    }
}

module.exports = { createComment, getCommentsByTask }
