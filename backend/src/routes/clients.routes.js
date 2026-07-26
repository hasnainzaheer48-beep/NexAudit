const { getClients, getClientById, createClient, updateClient, deleteClient } = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();

router.get('/', getClients);

router.get('/:id', getClientById);

router.post('/', createClient);

router.patch('/:id', updateClient);

router.delete('/:id', deleteClient);

module.exports = router;