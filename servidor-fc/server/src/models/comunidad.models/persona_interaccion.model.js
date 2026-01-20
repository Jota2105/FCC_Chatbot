const { Model, DataTypes } = require('sequelize');

class PersonaInteraccion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'persona_interaccion',
            modelName: 'PersonaInteraccion',
            schema: 'fcc_historiaclinica',
            timestamps: true, // Enable timestamps for the join table
        };
    }

    static associate(models) {
        // No direct associations here, as this is a join table
        // Associations are defined in Persona and Interaccion models
    }
}

const PersonaInteraccionSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    persona_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'persona',
            key: 'id_persona',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    interaccion_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'interaccion',
            key: 'id_interaccion',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

module.exports = { PersonaInteraccion, PersonaInteraccionSchema };
