'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({tableName: 'tipo_persona', schema: 'fcc_historiaclinica' }, [
      { descripcion_tipo_persona: 'Beneficiario'  },
      { descripcion_tipo_persona: 'Voluntario'  },
      { descripcion_tipo_persona: 'Donante'  },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({tableName: 'tipo_persona', schema: 'fcc_historiaclinica' }, null, {});
  }
};
