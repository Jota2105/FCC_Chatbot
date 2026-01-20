const { TipoGestion, TipoGestionSchema } = require('./tipo_gestion.model');



function setupChatServidorModels(sequelize) {


   //models
   TipoGestion.init(TipoGestionSchema, TipoGestion.config(sequelize));

   //association
   //TipoGestion.associate({ Canton });// formato para inicializar las asociasiones

}

module.exports = setupChatServidorModels;
