'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [provincias] = await queryInterface.sequelize.query(
      'SELECT id_provincia, nombre_provincia FROM fcc_historiaclinica.provincia'
    );

    const findProvinciaId = (name) => {
      const provincia = provincias.find(p => p.nombre_provincia === name);
      return provincia ? provincia.id_provincia : null;
    };

    const cantones = [
      // AZUAY
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'CUENCA'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'GIRÓN'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'GUALACEO'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'NABÓN'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'PAUTE'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'PUCARA'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'SAN FERNANDO'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'SANTA ISABEL'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'SIGSIG'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'OÑA'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'CHORDELEG'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'EL PAN'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'SEVILLA DE ORO'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'GUACHAPALA'  },
      { id_provincia: findProvinciaId('AZUAY'), nombre_canton: 'CAMILO PONCE ENRÍQUEZ'  },
      // BOLIVAR
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'GUARANDA'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'CHILLANES'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'CHIMBO'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'ECHEANDÍA'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'SAN MIGUEL'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'CALUMA'  },
      { id_provincia: findProvinciaId('BOLIVAR'), nombre_canton: 'LAS NAVES'  },
      // CAÑAR
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'AZOGUES'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'BIBLIÁN'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'CAÑAR'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'LA TRONCAL'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'EL TAMBO'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'DÉLEG'  },
      { id_provincia: findProvinciaId('CAÑAR'), nombre_canton: 'SUSCAL'  },
    ];

    const validCantones = cantones.filter(c => c.id_provincia !== null);

    if (validCantones.length > 0) {
      await queryInterface.bulkInsert({tableName: 'canton', schema: 'fcc_historiaclinica' }, validCantones, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({tableName: 'canton', schema: 'fcc_historiaclinica' }, null, {});
  }
};