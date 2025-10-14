const express = require('express')
const path = require('path')
const routes = require('./src/routes/routes')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'public')))

app.use('/', routes)

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
