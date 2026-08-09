
const { getDocument, downloadDocument, deleteDocument } = require('../controllers/document.controller')
const express = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const { validateDocumentAccess } = require('../middlewares/validateDocumentAccess.middleware');
const router = express.Router();

router.use(authenticate);

router.get('/:id/open', validateDocumentAccess, getDocument);
router.get('/:id/download', validateDocumentAccess, downloadDocument);
router.patch('/:id/delete', validateDocumentAccess, deleteDocument);

module.exports = router;
