const express = require('express');
const router = express.Router();
const normativaController = require('../../controllers/comunidad.controllers/normativa.controller');

router
    .get('/', normativaController.get)
    .get('/:id', normativaController.getById)
    .post('/', normativaController.create)
    .put('/:id', normativaController.update)
    .delete('/:id', normativaController._delete);

module.exports = router;
