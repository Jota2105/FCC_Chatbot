const express = require('express');
const router = express.Router();
const cantonController = require('../../controllers/comunidad.controllers/canton.controller');

/**
 * @swagger
 * tags:
 *   name: Cantones
 *   description: Operaciones relacionadas con los cantones
 */

/**
 * @swagger
 * /api/fcc/canton:
 *   get:
 *     summary: Obtiene todos los cantones
 *     tags: [Cantones]
 *     responses:
 *       200:
 *         description: Lista de cantones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Canton'
 */
router.get('/', cantonController.get);

/**
 * @swagger
 * /api/fcc/canton/{id}:
 *   get:
 *     summary: Obtiene un cantón por ID
 *     tags: [Cantones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cantón
 *     responses:
 *       200:
 *         description: Cantón encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Canton'
 *       404:
 *         description: Cantón no encontrado
 */
router.get('/:id', cantonController.getById);

/**
 * @swagger
 * /api/fcc/canton:
 *   post:
 *     summary: Crea un nuevo cantón
 *     tags: [Cantones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Canton'
 *     responses:
 *       201:
 *         description: Cantón creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', cantonController.create);

/**
 * @swagger
 * /api/fcc/canton/{id}:
 *   put:
 *     summary: Actualiza un cantón existente
 *     tags: [Cantones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cantón
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Canton'
 *     responses:
 *       200:
 *         description: Cantón actualizado exitosamente
 *       404:
 *         description: Cantón no encontrado
 */
router.put('/:id', cantonController.update);

/**
 * @swagger
 * /api/fcc/canton/{id}:
 *   delete:
 *     summary: Elimina un cantón
 *     tags: [Cantones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cantón
 *     responses:
 *       200:
 *         description: Cantón eliminado exitosamente
 *       404:
 *         description: Cantón no encontrado
 */
router.delete('/:id', cantonController._delete);

module.exports = router;
