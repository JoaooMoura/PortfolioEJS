const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Informacao = sequelize.define('Informacao', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nomeCompleto: { type: DataTypes.STRING(100), allowNull: false },
  curso: { type: DataTypes.STRING(100), allowNull: false },
  instituicao: { type: DataTypes.STRING(100), allowNull: false },
  anoIngresso: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: true },
  telefone: { type: DataTypes.STRING(20), allowNull: true }
}, { tableName: 'informacoes', timestamps: true });

module.exports = Informacao;
