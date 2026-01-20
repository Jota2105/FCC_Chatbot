const { Model, DataTypes } = require('sequelize');

class Persona extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'persona',
            modelName: 'Persona',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
	//-----belongsTo = 1 o 1 a n  (Parroquia tiene personas)
	//----- hasOne = 1 a 1     (Persona pertenece a 1 Parroquia)
	//----- hasMany = 1 a n   (Persona tiene muchos cursos)
    static associate(models) {
        Persona.belongsTo(models.Parroquia, {
            foreignKey: 'id_parroquia',
            as: 'parroquia_persona',
        });
	Persona.belongsTo(models.TipoPersona, {
            foreignKey: 'id_tipo_persona',
            as: 'tipo_persona_persona',
        });
	Persona.belongsToMany(models.Interaccion, {
            through: models.PersonaInteraccion,
            foreignKey: 'persona_id',
            otherKey: 'interaccion_id',
        });
    }

}

const PersonaSchema = {
    id_persona:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    apellido_persona: {
        type: DataTypes.STRING (40),
        allowNull: true, 
    },
    nombre_persona:{
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    direccion_persona:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    correo_persona:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    telefono_persona:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    foto_persona:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    estado_persona:{
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}

module.exports = {Persona, PersonaSchema};