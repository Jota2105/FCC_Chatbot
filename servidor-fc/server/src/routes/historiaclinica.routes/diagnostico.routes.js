const express = require('express');
const router = express.Router();
const diagnosticoController = require('../../controllers/historiaclinica.controllers/diagnostico.controller');

/**
 * @swagger
 * tags:
 *   name: Diagnósticos
 *   description: Operaciones relacionadas con los diagnosticos
 */

/**
 * @swagger
 * /api/fcc/diagnostico:
 *   get:
 *     summary: Obtiene todos los diagnosticos
 *     tags: [Diagnósticos]
 *     responses:
 *       200:
 *         description: Lista de diagnosticos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Diagnostico'
 */
router.get('/', diagnosticoController.get);

/**
 * @swagger
 * /api/fcc/diagnostico/{id_enfermedad}/{id_aps}:
 *   get:
 *     summary: Obtiene un diagnostico por ID de enfermedad y APS
 *     tags: [Diagnósticos]
 *     parameters:
 *       - in: path
 *         name: id_enfermedad
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la enfermedad
 *       - in: path
 *         name: id_aps
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la APS
 *     responses:
 *       200:
 *         description: Diagnostico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diagnostico'
 *       404:
 *         description: Diagnostico no encontrado
 */
router.get('/:id_enfermedad/:id_aps', diagnosticoController.getById);

/**
 * @swagger
 * /api/fcc/diagnostico:
 *   post:
 *     summary: Crea un nuevo diagnostico
 *     tags: [Diagnósticos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Diagnostico'
 *     responses:
 *       201:
 *         description: Diagnostico creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/', diagnosticoController.create);

/**
 * @swagger
 * /api/fcc/diagnostico/{id_enfermedad}/{id_aps}:
 *   put:
 *     summary: Actualiza un diagnostico existente
 *     tags: [Diagnósticos]
 *     parameters:
 *       - in: path
 *         name: id_enfermedad
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la enfermedad
 *       - in: path
 *         name: id_aps
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la APS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Diagnostico'
 *     responses:
 *       200:
 *         description: Diagnostico actualizado exitosamente
 *       404:
 *         description: Diagnostico no encontrado
 */
router.put('/:id_enfermedad/:id_aps', diagnosticoController.update);

/**
 * @swagger
 * /api/fcc/diagnostico/{id_enfermedad}/{id_aps}:
 *   delete:
 *     summary: Elimina un diagnostico
 *     tags: [Diagnósticos]
 *     parameters:
 *       - in: path
 *         name: id_enfermedad
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la enfermedad
 *       - in: path
 *         name: id_aps
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la APS
 *     responses:
 *       200:
 *         description: Diagnostico eliminado exitosamente
 *       404:
 *         description: Diagnostico no encontrado
 */
router.delete('/:id_enfermedad/:id_aps', diagnosticoController._delete);

/**
 * @swagger
 * /api/fcc/diagnostico/enfermedades/aps/{id_aps}:
 *   get:
 *     summary: Obtiene todas las enfermedades de una APS
 *     tags: [Diagnósticos]
 *     parameters:
 *       - in: path
 *         name: id_aps
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la APS
 *     responses:
 *       200:
 *         description: Lista de enfermedades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enfermedad'
 *       404:
 *         description: APS no encontrada
 */
router.get('/enfermedades/aps/:id_aps', diagnosticoController.getByIDAps);

module.exports = router;
