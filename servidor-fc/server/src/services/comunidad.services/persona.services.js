const { models } = require('../../libs/sequelize');

class PersonaService  { 
  
    constructor() {}

    async find() {
      const res = await models.Persona.findAll();   //--- nombre del models = models.Provincia
      return res;
    }

    async findOne(id) {
      const res = await models.Persona.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Persona.create(data);
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

    async findByInteraccionId(idInteraccion) {
      const res = await models.Persona.findAll({
        include: [{
          model: models.Interaccion,
          where: { id_interaccion: idInteraccion }
        }]
      });
      return res;
    }
  
  }
  
  module.exports = PersonaService;  //---- module.exports = exporta la Clase de Servicio 
//------------permite que se pueda acceder caso contrario estar[ia encapsulada y no tendr[ia acceso