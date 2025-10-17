const fs = require('fs');
const path = require('path');

const projects = require('../data/projects');
const estudante = require('../data/estudante');
const disciplinas = require('../data/disciplinas');
const contato = require('../data/contato');
const { promiseHooks } = require('v8');

const getHomePage = (req, res) => {
    res.render('pages/index', {
        title: 'Home',
        estudante: estudante, 
        projects: projects.slice(0, 3) 
    });
};

const getSobrePage = (req, res) => {
    res.render('pages/sobre', {
        title: 'Sobre Mim',
        estudante: estudante 
    });
};

const getProjetosPage = (req, res) => {
    res.render('pages/projetos', {
        title: 'Meus Projetos',
        projects: projects
    });
};
const addNovoProjeto = (req, res) => {
    const novoProjeto = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        link: req.body.link
    };

    projects.push(novoProjeto);

    const filePath = path.join(__dirname, '..', 'data', 'projects.js');

    const updatedData = `module.exports = ${JSON.stringify(projects, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar o arquivo:", err);
            return res.redirect('/projetos');
        }

        console.log("Arquivo projects.js atualizado com sucesso!");
        res.redirect('/projetos');
    });
};
const excluirProjeto = (req, res) => {
    const idParaExcluir = Number(req.params.id);

    const indexParaExcluir = projects.findIndex(p => p.id === idParaExcluir);

    if (indexParaExcluir > -1) {
        projects.splice(indexParaExcluir, 1); 
    }

    const filePath = path.join(__dirname, '..', 'data', 'projects.js');

    const updatedData = `module.exports = ${JSON.stringify(projects, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar o arquivo após exclusão:", err);
        } else {
            console.log("Projeto excluído e arquivo salvo com sucesso!");
        }
        res.redirect('/projetos');
    });
};
const getFormularioEditarProjeto = (req, res) => {
    const idParaEditar = Number(req.params.id);

    const projeto = projects.find(p => p.id === idParaEditar);
    if (!projeto) {
        return res.redirect('/projetos');
    }

    res.render('pages/editarProjeto', {
        title: 'Editar Projeto',
        projeto: projeto
    });
};
const salvarProjetoEditado = (req, res) => {
    const idParaEditar = Number(req.params.id);
    const dadosAtualizados = req.body;

    const indexParaEditar = projects.findIndex(p => p.id === idParaEditar);

    if (indexParaEditar > -1) {
        projects[indexParaEditar].title = dadosAtualizados.title;
        projects[indexParaEditar].description = dadosAtualizados.description;
        projects[indexParaEditar].imageUrl = dadosAtualizados.imageUrl;
        projects[indexParaEditar].link = dadosAtualizados.link;
    }

    const filePath = path.join(__dirname, '..', 'data', 'projects.js');
    const updatedData = `module.exports = ${JSON.stringify(projects, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar o projeto editado:", err);
        } else {
            console.log("Projeto editado e salvo com sucesso!");
        }
        res.redirect('/projetos');
    });
};
const getFormularioNovaDisc = (req, res) => {
    res.render('pages/cadastroDisciplinas', {
        title: 'Adicionar Disciplina'
    });
};
const addNovaDisc = (req, res) => {
    const novaDisciplina = req.body.nome;

    disciplinas.push(novaDisciplina);

    const filePath = path.join(__dirname, '..', 'data', 'disciplinas.js');

    const updatedData = `module.exports = ${JSON.stringify(disciplinas, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar o arquivo de disciplinas:", err);
        } else {
            console.log("Arquivo disciplinas.js atualizado com sucesso!");
        }
        res.redirect('/disciplinas');
    });
};
const excluirDisciplina = (req, res) => {
    const indexParaExcluir = Number(req.params.index);

    disciplinas.splice(indexParaExcluir, 1);

    const filePath = path.join(__dirname, '..', 'data', 'disciplinas.js');

    const updatedData = `module.exports = ${JSON.stringify(disciplinas, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao excluir disciplina:", err);
        } else {
            console.log("Disciplina excluída com sucesso!");
        }
        res.redirect('/disciplinas');
    });
};



const getFormularioEditarDisciplina = (req, res) => {
    
    const indexParaEditar = Number(req.params.index);

    
    const disciplina = disciplinas[indexParaEditar];

    
    res.render('pages/editarDisciplinas', {
        title: 'Editar Disciplina',
        disciplina: disciplina,
        index: indexParaEditar 
    });
};
const salvarDisciplinaEditada = (req, res) => {
    
    const indexParaEditar = Number(req.params.index);
    const novoNome = req.body.nome;

    
    disciplinas[indexParaEditar] = novoNome;

    
    const filePath = path.join(__dirname, '..', 'data', 'disciplinas.js');
    const updatedData = `module.exports = ${JSON.stringify(disciplinas, null, 4)};`;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error("Erro ao salvar a disciplina editada:", err);
        } else {
            console.log("Disciplina editada e salva com sucesso!");
        }
        res.redirect('/disciplinas');
    });
};

const getDisciplinasPage = (req, res) => {
    res.render('pages/disciplinas', {
        title: 'Minhas Disciplinas',
        disciplinas: disciplinas 
    });
};

const getContatoPage = (req, res) => {
    res.render('pages/contato', {
        title: 'Contato',
        contato: contato
    });
};

const getDashboardPage = (req, res) => {
    const estatisticas = {
        totalProjetos: projects.length,
        totalDisciplinas: disciplinas.length,
        tecnologias: ["Node.js", "Express", "EJS", "JavaScript", "HTML", "CSS", "React Native"]
    };
    res.render('pages/dashboard', {
        title: 'Dashboard',
        stats: estatisticas
    });
};
const getFormularioNovoProjeto = (req, res) => {
    res.render('pages/cadastroProjeto', {
        title: 'Adicionar Novo Projeto'
    });
};
module.exports = {
    getHomePage,
    getSobrePage,
    getProjetosPage,
    getDisciplinasPage,
    getContatoPage,
    getDashboardPage,
    getFormularioNovoProjeto,
    addNovoProjeto,
    getFormularioNovaDisc,
    addNovaDisc,
    excluirProjeto,
    excluirDisciplina,
    getFormularioEditarProjeto,
    salvarProjetoEditado,
    getFormularioEditarDisciplina,
    salvarDisciplinaEditada
};