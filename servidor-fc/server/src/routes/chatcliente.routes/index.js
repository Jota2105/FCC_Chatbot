const peticionRouter = require('./peticion.route');


function setupChatClienteRoutes(router) {
  
  router.use('/peticion', peticionRouter)


  }

module.exports = setupChatClienteRoutes;