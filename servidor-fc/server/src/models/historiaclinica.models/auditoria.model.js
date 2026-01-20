const { Model, DataTypes, Sequelize } = require("sequelize");

class Auditoria extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "auditoria",
      modelName: "Auditoria",
      schema: "fcc_historiaclinica",
      timestamps: false,
    };
  }
  static associate(models) {
    Auditoria.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario_auditoria',
    });
  }
}

const AuditoriaSchema = {
  id_auditoria: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  modulo: {
    allowNull: true,
    type: DataTypes.STRING(40),
  },
  operacion: {
    allowNull: true,
    type: DataTypes.STRING(40),
  },
  detalle: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      return this.getDataValue('fecha');
    },
    set(value) {
      this.setDataValue('fecha', value);
    }
  },
  hora_ingreso: {
    type: DataTypes.TIME,
    allowNull: true,
    get() {
      return this.getDataValue('hora_ingreso');
    },
    set(value) {
      this.setDataValue('hora_ingreso', value);
    }
  },
  hora_salida: {
    type: DataTypes.TIME,
    allowNull: true,
    get() {
      return this.getDataValue('hora_salida');
    },
    set(value) {
      this.setDataValue('hora_salida', value);
    }
  }
};

module.exports = { Auditoria, AuditoriaSchema };
