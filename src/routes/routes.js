const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolioController')

router.get('/', portfolioController.getHomePage)

router.get('/projetos', portfolioController.getProjetosPage)

router.get('/sobre', portfolioController.getSobrePage)

module.exports = router