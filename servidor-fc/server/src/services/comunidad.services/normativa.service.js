const { models } = require('../../libs/sequelize');

class NormativaService  { 
  
    constructor() {}

    async find() {
      const res = await models.Normativa.findAll();   //--- nombre del models = models.Provincia
      return res;
    }

    async findOne(id) {
      const res = await models.Normativa.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Normativa.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = NormativaService;  //---- module.exports = exporta la Clase de Servicio 
//------------permite que se pueda acceder caso contrario estar[ia encapsulada y no tendr[ia acceso