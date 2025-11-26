const fs = require('fs');
const path = require('path');

const projects = require('../data/projects');
const estudante = require('../data/estudante');
const disciplinas = require('../data/disciplinas');
const contato = require('../data/contato');

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
    addNovaDisc
};