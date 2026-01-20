const { Model, DataTypes } = require('sequelize');
class Provincia extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'provincia',
            modelName: 'Provincia',
            schema: 'fcc_historiaclinica',
            timestamps: false, // no incluir fecha creacion y actualizacion
        };
    }

    static associate(models) {
        Provincia.hasMany(models.Canton, { //----1 Provincia n cantones
            foreignKey: 'id_provincia',
            as: 'provinciacanton',
        });
    }

}

//------------
const ProvinciaSchema = {
    id_provincia:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_provincia: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}

module.exports = {Provincia, ProvinciaSchema};