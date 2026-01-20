const express = require('express');
const router = express.Router();
const parroquiaController = require('../../controllers/comunidad.controllers/parroquia.controller');

/**
 * @swagger
 * tags:
 *   name: Parroquias
 *   description: Operaciones relacionadas con las parroquias
 */

/**
 * @swagger
 * /api/fcc/parroquia:
 *   get:
 *     summary: Obtiene todas las parroquias
 *     tags: [Parroquias]
 *     responses:
 *       200:
 *         description: Lista de parroquias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parroquia'
 */
router.get('/', parroquiaController.get);

/**
 * @swagger
 * /api/fcc/parroquia/{id}:
 *   get:
 *     summary: Obtiene una parroquia por ID
 *     tags: [Parroquias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la parroquia
 *     responses:
 *       200:
 *         description: Parroquia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parroquia'
 *       404:
 *         description: Parroquia no encontrada
 */
router.get('/:id', parroquiaController.getById);

/**
 * @swagger
 * /api/fcc/parroquia:
 *   post:
 *     summary: Crea una nueva parroquia
 *     tags: [Parroquias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parroquia'
 *     responses:
 *       201:
 *         description: Parroquia creada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', parroquiaController.create);

/**
 * @swagger
 * /api/fcc/parroquia/{id}:
 *   put:
 *     summary: Actualiza una parroquia existente
 *     tags: [Parroquias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la parroquia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parroquia'
 *     responses:
 *       200:
 *         description: Parroquia actualizada exitosamente
 *       404:
 *         description: Parroquia no encontrada
 */
router.put('/:id', parroquiaController.update);

/**
 * @swagger
 * /api/fcc/parroquia/{id}:
 *   delete:
 *     summary: Elimina una parroquia
 *     tags: [Parroquias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la parroquia
 *     responses:
 *       200:
 *         description: Parroquia eliminada exitosamente
 *       404:
 *         description: Parroquia no encontrada
 */
router.delete('/:id', parroquiaController._delete);

module.exports = router;
