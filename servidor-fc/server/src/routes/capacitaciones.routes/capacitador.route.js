const express = require('express');
const router = express.Router();
const capacitadorController = require('../../controllers/capacitaciones.controllers/capacitador.controller');

router
    .get('/', capacitadorController.get)
    .get('/:id', capacitadorController.getById)
    .post('/', capacitadorController.create)
    .put('/:id', capacitadorController.update)
    .delete('/:id', capacitadorController._delete);

module.exports = router;
