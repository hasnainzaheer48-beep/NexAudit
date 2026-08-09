const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeCommentModification } = require('../middlewares/authorizeCommentModification.middleware');
const { validateCommentContent } = require('../middlewares/validateCommentContent');
const { editComment, deleteComment } = require('../controllers/comments.controller');



router.use(authenticate);

router.patch('/:commentId/edit', authorizeCommentModification, validateCommentContent, editComment);
router.patch('/:commentId/delete', authorizeCommentModification, deleteComment);