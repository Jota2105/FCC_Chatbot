const { Model, DataTypes } = require('sequelize');

class Peticion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'peticion',
            modelName: 'Peticion',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
    
    }

}

const PeticionSchema = {
    id_peticion:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    contenido_peticion: {
        type: DataTypes.STRING (40),
        allowNull: true, 
    }
}

module.exports = {Peticion, PeticionSchema};