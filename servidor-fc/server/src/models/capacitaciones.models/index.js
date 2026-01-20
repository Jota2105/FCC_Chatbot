const { Capacitador, CapacitadorSchema } = require('./capacitador.model');



function setupCapacitacionesModels(sequelize) {


   //models
   Capacitador.init(CapacitadorSchema, Capacitador.config(sequelize));

   //association
   //Capacitador.associate({ Canton });// formato para inicializar las asociasiones

}

module.exports = setupCapacitacionesModels;
