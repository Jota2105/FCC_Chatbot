const { Model, DataTypes } = require('sequelize');

class TipoPersona extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_persona',
            modelName: 'TipoPersona',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
	//-----belongsTo = 1 o 1 a n  (Parroquia tiene personas)
	//----- hasOne = 1 a 1     (Persona pertenece a 1 Parroquia)
	//----- hasMany = 1 a n   (Persona tiene muchos cursos)
    static associate(models) {
        TipoPersona.hasMany(models.Persona, {
            foreignKey: 'id_tipo_persona',
            as: 'tipo_persona_persona',
        });
    }

}

const TipoPersonaSchema = {
    id_tipo_persona:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    descripcion_tipo_persona: {
        type: DataTypes.STRING (140),
        allowNull: true, 
    },
    observaciones_tipo_persona:{
        type: DataTypes.STRING(240),
        allowNull: true,
    },
        
}

module.exports = {TipoPersona, TipoPersonaSchema};