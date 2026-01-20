const express = require('express');
const router = express.Router();
const tipo_terapiaController = require('../../controllers/historiaclinica.controllers/tipo_terapia.controller');

/**
 * @swagger
 * tags:
 *   name: Tipos de Terapia
 *   description: Operaciones relacionadas con los tipos de terapia
 */

/**
 * @swagger
 * /api/fcc/tipo_terapia:
 *   get:
 *     summary: Obtiene todos los tipos de terapia
 *     tags: [Tipos de Terapia]
 *     responses:
 *       200:
 *         description: Lista de tipos de terapia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoTerapia'
 */
router.get('/', tipo_terapiaController.get);

/**
 * @swagger
 * /api/fcc/tipo_terapia/{id}:
 *   get:
 *     summary: Obtiene un tipo de terapia por ID
 *     tags: [Tipos de Terapia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de terapia
 *     responses:
 *       200:
 *         description: Tipo de terapia encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoTerapia'
 *       404:
 *         description: Tipo de terapia no encontrado
 */
router.get('/:id', tipo_terapiaController.getById);

/**
 * @swagger
 * /api/fcc/tipo_terapia:
 *   post:
 *     summary: Crea un nuevo tipo de terapia
 *     tags: [Tipos de Terapia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoTerapia'
 *     responses:
 *       201:
 *         description: Tipo de terapia creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', tipo_terapiaController.create);

/**
 * @swagger
 * /api/fcc/tipo_terapia/{id}:
 *   put:
 *     summary: Actualiza un tipo de terapia existente
 *     tags: [Tipos de Terapia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de terapia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoTerapia'
 *     responses:
 *       200:
 *         description: Tipo de terapia actualizado exitosamente
 *       404:
 *         description: Tipo de terapia no encontrado
 */
router.put('/:id', tipo_terapiaController.update);

/**
 * @swagger
 * /api/fcc/tipo_terapia/{id}:
 *   delete:
 *     summary: Elimina un tipo de terapia
 *     tags: [Tipos de Terapia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de terapia
 *     responses:
 *       200:
 *         description: Tipo de terapia eliminado exitosamente
 *       404:
 *         description: Tipo de terapia no encontrado
 */
router.delete('/:id', tipo_terapiaController._delete);

module.exports = router;
