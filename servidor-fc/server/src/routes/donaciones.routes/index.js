
const continenteRouter = require('./continente.route');


function setupDonacionesRoutes(router) {
  
  router.use('/continente', continenteRouter)


  }

module.exports = setupDonacionesRoutes;