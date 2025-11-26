const express = require('express');
const path = require('path');
const { syncDatabase } = require('./src/models');
require('dotenv').config();

const portfolioRoutes = require('./src/routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', portfolioRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { error: err.message });
});

(async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar:', error);
  }
})();

module.exports = app;
