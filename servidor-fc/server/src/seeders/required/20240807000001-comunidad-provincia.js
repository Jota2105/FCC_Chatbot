'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({tableName: 'provincia', schema: 'fcc_historiaclinica' }, [
      { nombre_provincia: 'AZUAY'  },
      { nombre_provincia: 'BOLIVAR'  },
      { nombre_provincia: 'CAÑAR'  },
      { nombre_provincia: 'CARCHI'  },
      { nombre_provincia: 'COTOPAXI'  },
      { nombre_provincia: 'CHIMBORAZO'  },
      { nombre_provincia: 'EL ORO'  },
      { nombre_provincia: 'ESMERALDAS'  },
      { nombre_provincia: 'GUAYAS'  },
      { nombre_provincia: 'IMBABURA'  },
      { nombre_provincia: 'LOJA'  },
      { nombre_provincia: 'LOS RIOS'  },
      { nombre_provincia: 'MANABI'  },
      { nombre_provincia: 'MORONA SANTIAGO'  },
      { nombre_provincia: 'NAPO'  },
      { nombre_provincia: 'PASTAZA'  },
      { nombre_provincia: 'PICHINCHA'  },
      { nombre_provincia: 'TUNGURAHUA'  },
      { nombre_provincia: 'ZAMORA CHINCHIPE'  },
      { nombre_provincia: 'GALAPAGOS'  },
      { nombre_provincia: 'SUCUMBIOS'  },
      { nombre_provincia: 'ORELLANA'  },
      { nombre_provincia: 'SANTO DOMINGO DE LOS TSACHILAS'  },
      { nombre_provincia: 'SANTA ELENA'  },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({tableName: 'provincia', schema: 'fcc_historiaclinica' }, null, {});
  }
};