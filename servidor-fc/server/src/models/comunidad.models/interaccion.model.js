const { Model, DataTypes } = require('sequelize');

class Interaccion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'interaccion',
            modelName: 'Interaccion',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
	//-----belongsTo = 1 o 1 a n  (Parroquia tiene personas)
	//----- hasOne = 1 a 1     (Persona pertenece a 1 Parroquia)
	//----- hasMany = 1 a n   (Persona tiene muchos cursos)
	//------ belongsToMany
    static associate(models) {
        Interaccion.belongsToMany(models.Persona, {
            through: models.PersonaInteraccion,
            foreignKey: 'interaccion_id',
            otherKey: 'persona_id',
            as: 'personasAsociadas',
        });
    }

}

const InteraccionSchema = {
    id_interaccion:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    descripcion_interaccion: {
        type: DataTypes.STRING (240),
        allowNull: true, 
    },
    tipo_interaccion:{
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    fecha_inicio_interaccion:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin_interaccion:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    archivo_interaccion:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    observciones_interaccion:{
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    estado_interaccion:{
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}

module.exports = {Interaccion, InteraccionSchema};