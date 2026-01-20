const express = require('express');
const router = express.Router();

// Importamos el controlador (la lógica)
const controller = require('../../controllers/ia.controllers/ia.controller');

// Importamos la configuración de Multer que acabamos de crear
const upload = require('../../utils/multerConfigIA'); 

// --- DEFINICIÓN DE RUTAS ---

// 1. Ruta para CHATEAR (Solo recibe JSON, no necesita Multer)
router.post('/chat', controller.chat);

// 2. Ruta para SUBIR DOCUMENTOS (Aquí usamos Multer)
// 'archivo' es el nombre del campo que debe usar el Frontend en el FormData
router.post('/upload', 
    upload.single('archivo'), // <--- ESTE ES EL MIDDLEWARE DE MULTER
    controller.uploadDoc
);

module.exports = router;