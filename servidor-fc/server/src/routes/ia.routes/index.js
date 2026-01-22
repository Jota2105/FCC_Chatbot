const express = require('express');

const iaRouter = require('../chatservidor.routes/bot_interno.routes');

function setupIARoutes(router) {
  
  router.use('/ia', iaRouter)


  }

module.exports = setupIARoutes;