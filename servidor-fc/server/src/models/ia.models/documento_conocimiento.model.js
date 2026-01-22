const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'ia_documentos_conocimiento';

class DocumentoConocimiento extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'DocumentoConocimiento',
            schema: 'fcc_ia', // Asegúrate que coincida con tu esquema
            timestamps: true
        };
    }

    
    static associate(models) {
        // Un documento tiene muchos segmentos vectoriales
        this.hasMany(models.SegmentoVector, {
            foreignKey: 'documento_id',
            as: 'segmentos'
        });
    }
    
}

const DocumentoConocimientoSchema = {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.BIGINT },
    titulo: { type: DataTypes.STRING, allowNull: false },
    nombre_archivo: { type: DataTypes.STRING, allowNull: false },
    tipo_mime: { type: DataTypes.STRING }, // Agregué esto que faltaba en el schema anterior
    estado: { type: DataTypes.STRING, defaultValue: 'PENDIENTE' }
};

module.exports = { DocumentoConocimiento, DocumentoConocimientoSchema };