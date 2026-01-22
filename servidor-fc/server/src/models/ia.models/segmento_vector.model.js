const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'ia_segmentos_vector';

class SegmentoVector extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'SegmentoVector',
            schema: 'fcc_ia',
            timestamps: false
        };
    }

    
    static associate(models) {
        this.belongsTo(models.DocumentoConocimiento, {
            foreignKey: 'documento_id',
            as: 'documento'
        });
    }
}

const SegmentoVectorSchema = {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.BIGINT },
    documento_id: { 
        type: DataTypes.BIGINT,
        allowNull: false
    },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    embedding: { type: 'vector(1536)', allowNull: true } 
};

module.exports = { SegmentoVector, SegmentoVectorSchema };