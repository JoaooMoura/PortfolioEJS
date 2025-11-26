const sequelize = require('../config/database');
const Informacao = require('./Informacao');
const Disciplina = require('./Disciplina');
const Projeto = require('./Projeto');

const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✓ Banco de dados sincronizado!');
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
};

module.exports = { sequelize, Informacao, Disciplina, Projeto, syncDatabase };
