const express = require('express');
const router = express.Router();
const continenteController = require('../../controllers/donaciones.controllers/continente.controller');

router
    .get('/', continenteController.get)
    .get('/:id', continenteController.getById)
    .post('/', continenteController.create)
    .put('/:id', continenteController.update)
    .delete('/:id', continenteController._delete);

module.exports = router;
