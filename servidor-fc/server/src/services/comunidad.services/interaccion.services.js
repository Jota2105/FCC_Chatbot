const { models } = require('../../libs/sequelize');

class InteraccionService  { 
  
    constructor() {}

    async find() {
      const res = await models.Interaccion.findAll();   //--- nombre del models = models.Provincia
      return res;
    }

    async findOne(id) {
      const res = await models.Interaccion.findByPk(id, {
        include: ['personasAsociadas']
      });
      return res;
    }

    async findByPersonaId(idPersona) {
      const res = await models.Interaccion.findAll({
        include: [{
          model: models.Persona,
          as: 'personasAsociadas',
          where: { id_persona: idPersona }
        }]
      });
      return res;
    }

    async create(data) {
      const { personas, ...interaccionData } = data;
      const newInteraccion = await models.Interaccion.create(interaccionData);

      if (personas && personas.length > 0) {
        await newInteraccion.setPersonasAsociadas(personas);
      }

      return newInteraccion;
    }

    async update(id, data) {
      const { personas, ...interaccionData } = data;
      const model = await this.findOne(id);
      const res = await model.update(interaccionData);

      if (personas) {
        await model.setPersonasAsociadas(personas);
      }

      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = InteraccionService;  //---- module.exports = exporta la Clase de Servicio 
//------------permite que se pueda acceder caso contrario estar[ia encapsulada y no tendr[ia acceso