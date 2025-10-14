const projects = require('../data/projects')

const getHomePage = (req, res) => {
    res.render('pages/index'), {
        title: 'Home',
        projects: projects
    }
}

const getProjetosPage = (req, res) =>{
    res.render('pages/projetos', {
        title: 'Meus Projetos',
        projects: projects
    })
}

const getSobrePage = (req, res) => {
    res.render('pages/sobre', {
        title: 'Sobre Mim'
    })
}

module.exports = {
    getHomePage,
    getProjetosPage,
    getSobrePage
}
