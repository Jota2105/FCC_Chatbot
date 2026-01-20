const express = require('express');
const router = express.Router();
const peticionController = require('../../controllers/chatcliente.controllers/peticion.controller');

router
    .get('/', peticionController.get)
    .get('/:id', peticionController.getById)
    .post('/', peticionController.create)
    .put('/:id', peticionController.update)
    .delete('/:id', peticionController._delete);

module.exports = router;
