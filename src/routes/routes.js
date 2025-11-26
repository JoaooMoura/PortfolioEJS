const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const portfolioController = require('../controllers/portfolioController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads/projetos'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tipos = /jpeg|jpg|png|gif|webp/;
    const extname = tipos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = tipos.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/', portfolioController.index);
router.get('/sobre', portfolioController.sobre);
router.get('/contato', portfolioController.contato);
router.get('/dashboard', portfolioController.dashboard);

router.get('/disciplinas', portfolioController.disciplinas);
router.get('/disciplinas/cadastro', portfolioController.getFormularioNovaDisc);
router.post('/disciplinas', portfolioController.addNovaDisc);
router.get('/disciplinas/editar/:id', portfolioController.getFormularioEditarDisciplina);
router.post('/disciplinas/editar/:id', portfolioController.editarDisciplina);
router.post('/disciplinas/deletar/:id', portfolioController.deletarDisciplina);

router.get('/projetos', portfolioController.projetos);
router.get('/cadastroProjeto', portfolioController.criarProjetoForm);
router.post('/projetos/criar', upload.single('foto'), portfolioController.criarProjeto);
router.get('/projetos/editar/:id', portfolioController.editarProjetoForm);
router.post('/projetos/editar/:id', upload.single('foto'), portfolioController.editarProjeto);
router.post('/projetos/deletar/:id', portfolioController.deletarProjeto);

module.exports = router;
