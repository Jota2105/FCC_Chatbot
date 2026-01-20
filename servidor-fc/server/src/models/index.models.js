const setupHistoriaClinicaModels = require('./historiaclinica.models');
const setupComunidadModels = require('./comunidad.models');
const setupDonacionesModels = require('./donaciones.models');
const setupCapacitacionesModels = require('./capacitaciones.models')
const setupChatClienteModels = require('./chatcliente.models')
const setupChatServidorModels = require('./chatservidor.models')
const setupIAModels = require('./ia.models');
const setupDocumentacionModels= require('./documentacion.models')
const setupHooks = require('./hooks');

function setupModels(sequelize) {
  setupHistoriaClinicaModels(sequelize);
  setupComunidadModels(sequelize);
  setupDonacionesModels(sequelize);
  setupCapacitacionesModels(sequelize);
  setupChatClienteModels(sequelize);
  setupChatServidorModels(sequelize);
  setupIAModels(sequelize);
  setupDocumentacionModels(sequelize)

  // Configurar hooks después de inicializar los modelos
  setupHooks();
}

module.exports = setupModels;
