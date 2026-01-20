const express = require('express');
const router = express.Router();
const tipo_gestionController = require('../../controllers/chatservidor.controllers/tipo_gestion.controller');

router
    .get('/', tipo_gestionController.get)
    .get('/:id', tipo_gestionController.getById)
    .post('/', tipo_gestionController.create)
    .put('/:id', tipo_gestionController.update)
    .delete('/:id', tipo_gestionController._delete);

module.exports = router;
