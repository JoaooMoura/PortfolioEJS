const { Informacao, Disciplina, Projeto, sequelize } = require('../models');
const path = require('path');
const fs = require('fs');

async function migrate() {
  try {
    await sequelize.sync({ force: true });
    console.log('✓ Tabelas criadas!');

    const criarPastasUpload = () => {
      const dirs = [
        path.join(__dirname, '../../public/uploads'),
        path.join(__dirname, '../../public/uploads/projetos')
      ];
      dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`✓ Pasta criada: ${dir}`);
        }
      });
    };
    criarPastasUpload();

    await Informacao.create({
      nomeCompleto: 'João Moura',
      curso: 'Desenvolvimento de Software Multiplataforma',
      instituicao: 'FATEC São José dos Campos',
      anoIngresso: 2024,
      email: 'joao.moura@fatec.sp.gov.br',
      telefone: '(12) 98765-4321'
    });
    console.log('✓ Informações inseridas!');

    await Disciplina.bulkCreate([
      { nome: 'Desenvolvimento Web I', codigo: 'DSW101', semestre: '2024/1', status: 'concluida', nota: 9.5 },
      { nome: 'Banco de Dados', codigo: 'DSW102', semestre: '2024/1', status: 'concluida', nota: 8.8 },
      { nome: 'Programação Orientada a Objetos', codigo: 'DSW103', semestre: '2024/2', status: 'cursando', nota: null },
      { nome: 'Engenharia de Software', codigo: 'DSW104', semestre: '2024/2', status: 'cursando', nota: null }
    ]);
    console.log('✓ Disciplinas inseridas!');

    await Projeto.bulkCreate([
      {
        titulo: 'Sistema de Gerenciamento Acadêmico',
        descricao: 'Plataforma para gestão de alunos, disciplinas e notas',
        link: 'https://github.com/JoaooMoura/PortfolioEJS',
        tecnologias: 'Node.js, Express, MySQL, EJS',
        status: 'concluido',
        dataInicio: new Date('2024-03-01'),
        foto: null
      },
      {
        titulo: 'API RESTful de Livros',
        descricao: 'API para gerenciar uma biblioteca digital com operações CRUD completas',
        link: 'https://github.com/JoaooMoura/biblioteca-api',
        tecnologias: 'Node.js, Express, PostgreSQL, Sequelize',
        status: 'concluido',
        dataInicio: new Date('2024-01-15'),
        foto: null
      },
      {
        titulo: 'Aplicação de Lista de Tarefas',
        descricao: 'Aplicação web interativa para gerenciamento de tarefas',
        link: 'https://github.com/JoaooMoura/todo-app',
        tecnologias: 'React, JavaScript, CSS3',
        status: 'em andamento',
        dataInicio: new Date('2024-05-01'),
        foto: null
      }
    ]);
    console.log('✓ Projetos inseridos!');

    console.log('✅ Migração concluída com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
}

migrate();
