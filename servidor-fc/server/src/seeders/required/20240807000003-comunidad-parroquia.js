'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [cantones] = await queryInterface.sequelize.query(
      'SELECT id_canton, nombre_canton FROM fcc_historiaclinica.canton'
    );

    const findCantonId = (name) => {
      const canton = cantones.find(c => c.nombre_canton === name);
      return canton ? canton.id_canton : null;
    };

    const parroquias = [
      // CUENCA
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'BELLAVISTA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'CAÑARIBAMBA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'EL BATÁN'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'EL SAGRARIO'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'EL VECINO'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'GIL RAMÍREZ DÁVALOS'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'HUAYNACÁPAC'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'MACHANGARA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'MONAY'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SAN BLAS'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SAN SEBASTIÁN'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SUCRE'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'TOTORACOCHA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'YANUNCAY'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'HERMANO MIGUEL'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'BAÑOS'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'CUMBE'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'CHAUCHA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'CHECA (JIDCAY)'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'CHIQUINTAD'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'LLACAO'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'MOLLETURO'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'NULTI'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'OCTAVIO CORDERO PALACIOS (SANTA ROSA)'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'PACCHA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'QUINGEO'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'RICAURTE'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SAN JOAQUÍN'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SANTA ANA'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SAYAUSÍ'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SIDCAY'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'SININCAY'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'TARQUI'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'TURI'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'VALLE'  },
      { id_canton: findCantonId('CUENCA'), nombre_parroquia: 'VICTORIA DEL PORTETE (IRQUIS)'  },
      // GIRÓN
      { id_canton: findCantonId('GIRÓN'), nombre_parroquia: 'GIRÓN'  },
      { id_canton: findCantonId('GIRÓN'), nombre_parroquia: 'ASUNCIÓN'  },
      { id_canton: findCantonId('GIRÓN'), nombre_parroquia: 'SAN GERARDO'  },
    ];

    const validParroquias = parroquias.filter(p => p.id_canton !== null);

    if (validParroquias.length > 0) {
      await queryInterface.bulkInsert({tableName: 'parroquia', schema: 'fcc_historiaclinica' }, validParroquias, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({tableName: 'canton', schema: 'fcc_historiaclinica' }, null, {});
  }
};