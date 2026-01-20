const express = require('express');

const iaRouter = require('./ia.routes');

function setupIARoutes(router) {
  
  router.use('/ia', iaRouter)


  }

module.exports = setupIARoutes;