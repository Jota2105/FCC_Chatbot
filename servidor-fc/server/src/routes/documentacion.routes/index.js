
const tipo_documentoRouter = require('./tipo_documento.route');


function setupDocumentacionRoutes(router) {
  
  router.use('/tipo_documento', tipo_documentoRouter)


  }

module.exports = setupDocumentacionRoutes;