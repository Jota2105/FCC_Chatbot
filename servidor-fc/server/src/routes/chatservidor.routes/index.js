
const tipo_gestionRouter = require('./tipo_gestion.route');


function setupChatServidorRoutes(router) {
  
  router.use('/tipo_gestion', tipo_gestionRouter)


  }

module.exports = setupChatServidorRoutes;