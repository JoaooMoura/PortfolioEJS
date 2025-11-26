const { Informacao, Disciplina, Projeto, sequelize } = require('../models');
const path = require('path');
const fs = require('fs');

const dadosEstudante = require('../data/estudante');
const dadosContato = require('../data/contato');
const dadosDisciplinas = require('../data/disciplinas');
const dadosProjetos = require('../data/projects');

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
      nomeCompleto: dadosEstudante.nomeCompleto,
      curso: dadosEstudante.curso,
      instituicao: dadosEstudante.instituicao,
      anoIngresso: dadosEstudante.anoIngresso,
      email: dadosContato.email,
      telefone: dadosContato.telefone
    });
    console.log('✓ Informações do estudante inseridas!');

    const disciplinasParaInserir = dadosDisciplinas.map((nome, index) => ({
      nome: nome,
      codigo: `DSW${String(index + 101).padStart(3, '0')}`,
      semestre: '2024/1',
      status: 'concluida',
      nota: (8.0 + Math.random() * 2).toFixed(1) //
    }));
    
    await Disciplina.bulkCreate(disciplinasParaInserir);
    console.log(`✓ ${disciplinasParaInserir.length} disciplinas inseridas!`);

    const projetosParaInserir = [
      {
        titulo: 'Ragnarok Store',
        descricao: 'Uma loja virtual de produtos esportivos desenvolvida com HTML, CSS e JavaScript',
        link: 'https://github.com/JoaooMoura/Projeto-PW---Ragnarok-Store',
        tecnologias: 'HTML, CSS, JavaScript',
        status: 'concluido',
        dataInicio: new Date('2024-03-01'),
        foto: '/uploads/projetos/ragnarok.png'
      },
      {
        titulo: 'RArdware',
        descricao: 'Aplicativo móvel de realidade aumentada para visualização de hardware, desenvolvido com React Native',
        link: 'https://github.com/JoaooMoura/TCC---RArdware',
        tecnologias: 'React Native, JavaScript, Expo',
        status: 'concluido',
        dataInicio: new Date('2024-01-15'),
        foto: '/uploads/projetos/rardware.jpeg'
      },
      {
        titulo: 'API - Primeiro Semestre',
        descricao: 'API desenvolvida no primeiro semestre do curso de DSM na FATEC',
        link: 'https://github.com/Team-Chronos/API-DSM-1SEMESTRE-2025',
        tecnologias: 'Node.js, Express, MySQL',
        status: 'concluido',
        dataInicio: new Date('2025-02-10'),
        foto: '/uploads/projetos/api1.jpg'
      }
    ];

    await Projeto.bulkCreate(projetosParaInserir);
    console.log(`✓ ${projetosParaInserir.length} projetos inseridos!`);

    console.log('\n✅ Migração concluída com sucesso!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
}

migrate();
