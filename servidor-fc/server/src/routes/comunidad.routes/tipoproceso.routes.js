const express = require('express');
const router = express.Router();
const tipo_procesoController = require('../../controllers/comunidad.controllers/tipoproceso.controller');

router
    .get('/', tipo_procesoController.get)
    .get('/:id', tipo_procesoController.getById)
    .post('/', tipo_procesoController.create)
    .put('/:id', tipo_procesoController.update)
    .delete('/:id', tipo_procesoController._delete);

module.exports = router;
