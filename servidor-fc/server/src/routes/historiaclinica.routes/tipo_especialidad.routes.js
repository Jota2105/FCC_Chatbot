const express = require('express');
const router = express.Router();
const tipo_especialidadController = require('../../controllers/historiaclinica.controllers/tipo_especialidad.controller');

/**
 * @swagger
 * tags:
 *   name: Tipos de Especialidad
 *   description: Operaciones relacionadas con los tipos de especialidad
 */

/**
 * @swagger
 * /api/fcc/tipo_especialidad:
 *   get:
 *     summary: Obtiene todos los tipos de especialidad
 *     tags: [Tipos de Especialidad]
 *     responses:
 *       200:
 *         description: Lista de tipos de especialidad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoEspecialidad'
 */
router.get('/', tipo_especialidadController.get);

/**
 * @swagger
 * /api/fcc/tipo_especialidad/{id}:
 *   get:
 *     summary: Obtiene un tipo de especialidad por ID
 *     tags: [Tipos de Especialidad]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de especialidad
 *     responses:
 *       200:
 *         description: Tipo de especialidad encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoEspecialidad'
 *       404:
 *         description: Tipo de especialidad no encontrado
 */
router.get('/:id', tipo_especialidadController.getById);

/**
 * @swagger
 * /api/fcc/tipo_especialidad:
 *   post:
 *     summary: Crea un nuevo tipo de especialidad
 *     tags: [Tipos de Especialidad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoEspecialidad'
 *     responses:
 *       201:
 *         description: Tipo de especialidad creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', tipo_especialidadController.create);

/**
 * @swagger
 * /api/fcc/tipo_especialidad/{id}:
 *   put:
 *     summary: Actualiza un tipo de especialidad existente
 *     tags: [Tipos de Especialidad]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoEspecialidad'
 *     responses:
 *       200:
 *         description: Tipo de especialidad actualizado exitosamente
 *       404:
 *         description: Tipo de especialidad no encontrado
 */
router.put('/:id', tipo_especialidadController.update);

/**
 * @swagger
 * /api/fcc/tipo_especialidad/{id}:
 *   delete:
 *     summary: Elimina un tipo de especialidad
 *     tags: [Tipos de Especialidad]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de especialidad
 *     responses:
 *       200:
 *         description: Tipo de especialidad eliminado exitosamente
 *       404:
 *         description: Tipo de especialidad no encontrado
 */
router.delete('/:id', tipo_especialidadController._delete);

module.exports = router;
