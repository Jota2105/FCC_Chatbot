const express = require('express');
const router = express.Router();
const tipo_documentoController = require('../../controllers/documentacion.controllers/tipo_documento.controller');

router
    .get('/', tipo_documentoController.get)
    .get('/:id', tipo_documentoController.getById)
    .post('/', tipo_documentoController.create)
    .put('/:id', tipo_documentoController.update)
    .delete('/:id', tipo_documentoController._delete);

module.exports = router;
