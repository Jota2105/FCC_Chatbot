
const capacitadorRouter = require('./capacitador.route');


function setupCapacitacionRoutes(router) {
  
  router.use('/capacitador', capacitadorRouter)


  }

module.exports = setupCapacitacionRoutes;