const pool = require('../config/db')

const authorizeCommentModification = async (req, res, next) => {
    try {

        const { commentId } = req.params;
        const result = await pool.query(`
            SELECT * 
            FROM comments
            WHERE id = $1
            `, [commentId]);
        const comment = result.rows[0];
        if (req.user.id === comment.user_id) {
            return next();
        }

        return res.status(403).send('Forrbidden');

    }
    catch (error) {

        res.status(500).send('Could not check comment modification validity');
    }
}