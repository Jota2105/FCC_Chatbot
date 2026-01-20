const express = require('express');
const router = express.Router();
const tipoNormativaController = require('../../controllers/comunidad.controllers/tipo_normativa.controller');

router
    .get('/', tipoNormativaController.get)
    .get('/:id', tipoNormativaController.getById)
    .post('/', tipoNormativaController.create)
    .put('/:id', tipoNormativaController.update)
    .delete('/:id', tipoNormativaController._delete);

module.exports = router;