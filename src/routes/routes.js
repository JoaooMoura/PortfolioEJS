const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/projetos/cadastro', portfolioController.getFormularioNovoProjeto);
router.get('/disciplinas/cadastro', portfolioController.getFormularioNovaDisc);
router.get('/', portfolioController.getHomePage);
router.get('/sobre', portfolioController.getSobrePage);
router.get('/projetos', portfolioController.getProjetosPage);
router.get('/disciplinas', portfolioController.getDisciplinasPage);
router.get('/contato', portfolioController.getContatoPage);
router.get('/dashboard', portfolioController.getDashboardPage);
router.post('/projetos', portfolioController.addNovoProjeto);
module.exports = router;