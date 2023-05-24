const express = require('express')
const app = express()
const exphbs = require("express-handlebars")
const conn = require('./db/conn')
const Produto = require('./models/Produto')

const PORT = 3000
const hostname = 'localhost'

// ------- CONFIG EXPRESS ------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

// ------- CONFIG EXPRESS-HANDLEBARS ------
app.engine('handlebars', exphbs.engine()) // fica monitorando o template / respónsavel por montar a página (header e footer)
app.set('view engine', 'handlebars')
// app.set('.views', 'views') // Definindo a pasta que vai estar as minhas páginas

// Definindo as rotas do meu sistema 
app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/consulta', async(req,res)=>{
    const dados = await Produto.findAll({raw:true}) // está pegando todos os meus produtos do banco de dados
    console.log(dados)
    res.render('consulta', {valores: dados})
})

app.post('/cadastrar', async (req,res)=>{
    const nome = req.body.nome
    const qtde = Number(req.body.qtde)
    const preco = Number(req.body.preco)

    console.log(nome, qtde, preco)
    await Produto.create({nome, qtde, preco})

    res.redirect('/cadastrar')
})

app.get('/cadastrar', (req,res)=>{
    res.render('cadastrar')
})



// --------------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch(()=>{
    console.error("Não foi possível conectar ao banco de dados")
})
