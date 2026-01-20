const { Model, DataTypes } = require('sequelize');
class Canton extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'canton',  //---- tabla en la bdd
            modelName: 'Canton',//---- nobmre del Modelo en el codigo
            schema: 'fcc_historiaclinica', //---eesquem en la base de datos
            timestamps: false, // no incluir fecha creacion y actualizacion
        };
    }

    static associate(models) {  //----relacion Provincia y Canton
        Canton.belongsTo(models.Provincia, {  //---- 1 Canton pertenece a 1 Provincia / 1 Provincia n Cantones
            foreignKey: 'id_provincia',
            as: 'provinciacanton',
        });
        Canton.hasMany(models.Parroquia, {  //------ 1 Canton tiene n Parroquia
            foreignKey: 'id_canton',
            as: 'cantonparroquia',
        });
    }

}

//------------
const CantonSchema = {
    id_canton:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_canton: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}

module.exports = {Canton, CantonSchema};  //------ se exportan clase del modelo y el esquema con las columnas