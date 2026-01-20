const express = require('express');
const router = express.Router();
const provinciaController = require('../../controllers/comunidad.controllers/provincia.controller');

/**
 * @swagger
 * tags:
 *   name: Provincias
 *   description: Operaciones relacionadas con las provincias
 */

/**
 * @swagger
 * /api/fcc/provincia:
 *   get:
 *     summary: Obtiene todas las provincias
 *     tags: [Provincias]
 *     responses:
 *       200:
 *         description: Lista de provincias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provincia'
 */
router.get('/', provinciaController.get);

/**
 * @swagger
 * /api/fcc/provincia/{id}:
 *   get:
 *     summary: Obtiene una provincia por ID
 *     tags: [Provincias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la provincia
 *     responses:
 *       200:
 *         description: Provincia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provincia'
 *       404:
 *         description: Provincia no encontrada
 */
router.get('/:id', provinciaController.getById);

/**
 * @swagger
 * /api/fcc/provincia:
 *   post:
 *     summary: Crea una nueva provincia
 *     tags: [Provincias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provincia'
 *     responses:
 *       201:
 *         description: Provincia creada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', provinciaController.create);

/**
 * @swagger
 * /api/fcc/provincia/{id}:
 *   put:
 *     summary: Actualiza una provincia existente
 *     tags: [Provincias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la provincia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provincia'
 *     responses:
 *       200:
 *         description: Provincia actualizada exitosamente
 *       404:
 *         description: Provincia no encontrada
 */
router.put('/:id', provinciaController.update);

/**
 * @swagger
 * /api/fcc/provincia/{id}:
 *   delete:
 *     summary: Elimina una provincia
 *     tags: [Provincias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la provincia
 *     responses:
 *       200:
 *         description: Provincia eliminada exitosamente
 *       404:
 *         description: Provincia no encontrada
 */
router.delete('/:id', provinciaController._delete);

module.exports = router;
