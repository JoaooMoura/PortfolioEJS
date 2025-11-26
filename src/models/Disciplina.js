const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disciplina = sequelize.define('Disciplina', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  codigo: { type: DataTypes.STRING(20), allowNull: false },
  semestre: { type: DataTypes.STRING(10), allowNull: false },
  status: { type: DataTypes.ENUM('cursando', 'concluida'), defaultValue: 'cursando' },
  nota: { type: DataTypes.DECIMAL(3, 1), allowNull: true }
}, { tableName: 'disciplinas', timestamps: true });

module.exports = Disciplina;
