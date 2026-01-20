const { Peticion, PeticionSchema } = require('./peticion.model');



function setupChatClienteModels(sequelize) {


   //models
   Peticion.init(PeticionSchema, Peticion.config(sequelize));

   //association
   //Peticion.associate({ Canton });// formato para inicializar las asociasiones

}

module.exports = setupChatClienteModels;
