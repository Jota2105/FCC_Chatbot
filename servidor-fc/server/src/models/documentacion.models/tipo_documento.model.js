const { Model, DataTypes } = require('sequelize');

class TipoDocumento extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_documento',
            modelName: 'TipoDocumento',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
    
    }

}

const TipoDocumentoSchema = {
    id_tipo_documento:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_tipo_documento: {
        type: DataTypes.STRING (40),
        allowNull: true, 
    }
}

module.exports = {TipoDocumento, TipoDocumentoSchema};