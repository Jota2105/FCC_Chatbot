const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directorio base para todos los archivos de interacciones
const basePath = path.join(__dirname, '../uploads/comunidad/interacciones');

// Función para verificar y crear el directorio si no existe
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Directorio ${dir} no existe. Creando...`);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directorio ${dir} creado.`);
  } else {
    console.log(`Directorio ${dir} ya existe.`);
  }
};

const multerConfigInteraccion = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDirExists(basePath);
      cb(null, basePath);
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const shortName = path.basename(file.originalname, extension).slice(0, 20);
      const uniqueFilename = `${currentDate}-${shortName}-${uniqueSuffix}${extension}`;
      cb(null, uniqueFilename);
    }
  }),
  fileFilter(req, file, cb) {
    // Allow any file type for now, can be restricted later
    cb(null, true);
  },
};

// Asegurarse de que el directorio exista al inicio
ensureDirExists(basePath);

module.exports = multerConfigInteraccion;
