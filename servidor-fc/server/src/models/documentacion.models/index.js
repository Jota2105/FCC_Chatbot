const { TipoDocumento, TipoDocumentoSchema } = require('./tipo_documento.model');



function setupDocumentacionModels(sequelize) {


   //models
   TipoDocumento.init(TipoDocumentoSchema, TipoDocumento.config(sequelize));

   //association
   //TipoDocumento.associate({ Canton });// formato para inicializar las asociasiones

}

module.exports = setupDocumentacionModels;
