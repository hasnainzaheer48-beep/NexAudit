const validateCommentContent = (req, res, next) => {
    const { content } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).send("Comment content cannot be empty");
    }

    if (content.length > 300) {
        return res.status(400).send("Comment cannot exceed 300 characters");
    }

    next();
};