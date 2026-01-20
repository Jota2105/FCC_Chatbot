'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [parroquias] = await queryInterface.sequelize.query(
      'SELECT id_parroquia FROM fcc_historiaclinica.parroquia'
    );
    const [tiposPersona] = await queryInterface.sequelize.query(
      'SELECT id_tipo_persona FROM fcc_historiaclinica.tipo_persona'
    );

    if (parroquias.length > 0 && tiposPersona.length > 0) {
      const personas = [];
      for (let i = 0; i < 10; i++) {
        personas.push({
          id_parroquia: parroquias[Math.floor(Math.random() * parroquias.length)].id_parroquia,
          id_tipo_persona: tiposPersona[Math.floor(Math.random() * tiposPersona.length)].id_tipo_persona,
          nombre_persona: `Nombre${i + 1}`,
          apellido_persona: `Apellido${i + 1}`,
          direccion_persona: `Dirección ${i + 1}`,
          correo_persona: `persona${i + 1}@example.com`,
          telefono_persona: JSON.stringify(`09999999${i}`),
          estado_persona: 'Activo'
        });
      }
      await queryInterface.bulkInsert( {tableName: 'persona', schema: 'fcc_historiaclinica' }, personas, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete( {tableName: 'persona', schema: 'fcc_historiaclinica' }, null, {});
  }
};
