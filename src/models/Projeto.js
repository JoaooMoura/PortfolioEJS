const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projeto = sequelize.define('Projeto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING(150), allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.STRING(255), allowNull: true },
  tecnologias: { type: DataTypes.STRING(255), allowNull: true },
  status: { type: DataTypes.ENUM('em andamento', 'concluido'), defaultValue: 'em andamento' },
  dataInicio: { type: DataTypes.DATE, allowNull: true },
  foto: { type: DataTypes.STRING(255), allowNull: true }
}, { tableName: 'projetos', timestamps: true });

module.exports = Projeto;
