
const tipo_gestionRouter = require('./tipo_gestion.route');
const botInternoRouter = require('./bot_interno.routes');


function setupChatServidorRoutes(router) {
  
  router.use('/tipo_gestion', tipo_gestionRouter)
  router.use('/asistente', botInternoRouter);


  }

module.exports = setupChatServidorRoutes;