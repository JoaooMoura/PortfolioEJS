const { Informacao, Disciplina, Projeto } = require('../models');
const path = require('path');
const fs = require('fs');

exports.index = async (req, res) => {
  try {
    const informacao = await Informacao.findOne();
    const projetos = await Projeto.findAll({ limit: 3, order: [['createdAt', 'DESC']] });
    res.render('pages/index', { informacao, projetos, title: 'Início' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.sobre = async (req, res) => {
  try {
    const informacao = await Informacao.findOne();
    res.render('pages/sobre', { informacao, title: 'Sobre Mim' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.disciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll({ order: [['nome', 'ASC']] });
    res.render('pages/disciplinas', { disciplinas, title: 'Minhas Disciplinas' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.getFormularioNovaDisc = (req, res) => {
  res.render('pages/cadastroDisciplinas', { title: 'Adicionar Disciplina' });
};

exports.addNovaDisc = async (req, res) => {
  try {
    const { nome } = req.body;
    await Disciplina.create({ 
      nome,
      codigo: `DSW${Date.now().toString().slice(-3)}`,
      semestre: '2024/2',
      status: 'cursando',
      nota: null
    });
    res.redirect('/disciplinas');
  } catch (error) {
    res.status(500).send('Erro ao adicionar disciplina');
  }
};

exports.getFormularioEditarDisciplina = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) {
      return res.status(404).send('Disciplina não encontrada');
    }
    res.render('pages/editarDisciplinas', {
      title: 'Editar Disciplina',
      disciplina: disciplina.toJSON()
    });
  } catch (error) {
    res.status(500).send('Erro ao carregar formulário');
  }
};

exports.editarDisciplina = async (req, res) => {
  try {
    const { nome } = req.body;
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) {
      return res.status(404).send('Disciplina não encontrada');
    }
    await disciplina.update({ nome });
    res.redirect('/disciplinas');
  } catch (error) {
    res.status(500).send('Erro ao editar disciplina');
  }
};

exports.deletarDisciplina = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) {
      return res.status(404).send('Disciplina não encontrada');
    }
    await disciplina.destroy();
    res.redirect('/disciplinas');
  } catch (error) {
    res.status(500).send('Erro ao deletar disciplina');
  }
};

exports.projetos = async (req, res) => {
  try {
    const projetos = await Projeto.findAll({ order: [['createdAt', 'DESC']] });
    res.render('pages/projetos', { projetos, title: 'Meus Projetos' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.criarProjetoForm = async (req, res) => {
  try {
    res.render('pages/cadastroProjeto', { title: 'Cadastrar Projeto' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.criarProjeto = async (req, res) => {
  try {
    const { titulo, descricao, link, tecnologias, status, dataInicio } = req.body;
    let fotoPath = null;
    if (req.file) {
      fotoPath = `/uploads/projetos/${req.file.filename}`;
    }
    await Projeto.create({
      titulo,
      descricao,
      link,
      tecnologias,
      status,
      dataInicio: dataInicio || new Date(),
      foto: fotoPath
    });
    res.redirect('/projetos');
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).render('error', { error: error.message });
  }
};

exports.editarProjetoForm = async (req, res) => {
  try {
    const projeto = await Projeto.findByPk(req.params.id);
    if (!projeto) return res.status(404).render('error', { error: 'Projeto não encontrado' });
    res.render('pages/editarProjeto', { projeto, title: 'Editar Projeto' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.editarProjeto = async (req, res) => {
  try {
    const { titulo, descricao, link, tecnologias, status, dataInicio } = req.body;
    const projeto = await Projeto.findByPk(req.params.id);
    if (!projeto) return res.status(404).render('error', { error: 'Projeto não encontrado' });
    let fotoPath = projeto.foto;
    if (req.file) {
      if (projeto.foto) {
        const caminhoAntigo = path.join(__dirname, '../../public', projeto.foto);
        if (fs.existsSync(caminhoAntigo)) {
          fs.unlinkSync(caminhoAntigo);
        }
      }
      fotoPath = `/uploads/projetos/${req.file.filename}`;
    }
    await projeto.update({
      titulo,
      descricao,
      link,
      tecnologias,
      status,
      dataInicio: dataInicio || projeto.dataInicio,
      foto: fotoPath
    });
    res.redirect('/projetos');
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).render('error', { error: error.message });
  }
};

exports.deletarProjeto = async (req, res) => {
  try {
    const projeto = await Projeto.findByPk(req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    if (projeto.foto) {
      const caminhoFoto = path.join(__dirname, '../../public', projeto.foto);
      if (fs.existsSync(caminhoFoto)) {
        fs.unlinkSync(caminhoFoto);
      }
    }
    await projeto.destroy();
    res.redirect('/projetos');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.contato = async (req, res) => {
  try {
    const informacao = await Informacao.findOne();
    res.render('pages/contato', { informacao, title: 'Contato' });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const totalDisciplinas = await Disciplina.count();
    const projetosConcluidos = await Projeto.count({ where: { status: 'concluido' } });
    const tecnologias = await Projeto.findAll({ attributes: ['tecnologias'] });
    const techMap = {};
    tecnologias.forEach(p => {
      if (p.tecnologias) {
        p.tecnologias.split(', ').forEach(tech => {
          techMap[tech] = (techMap[tech] || 0) + 1;
        });
      }
    });
    const topTechs = Object.entries(techMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tech, count]) => ({ tech, count }));
    res.render('pages/dashboard', {
      totalDisciplinas,
      projetosConcluidos,
      topTechs,
      title: 'Dashboard'
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
};
