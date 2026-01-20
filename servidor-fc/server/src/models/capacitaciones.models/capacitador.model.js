const { Model, DataTypes } = require('sequelize');

class Capacitador extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'capacitador',
            modelName: 'Capacitador',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
    
    }

}

const CapacitadorSchema = {
    id_capacitador:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    apellido_capacitador: {
        type: DataTypes.STRING (40),
        allowNull: true, 
    },
    nombre_capacitador:{
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    direccion_capacitador:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    correo_capacitador:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    telefono_capacitador:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    foto_capacitador:{
        type: DataTypes.STRING(250),
        allowNull: true,
    }
}

module.exports = {Capacitador, CapacitadorSchema};