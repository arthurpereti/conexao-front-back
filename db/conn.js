const { Sequelize } = require('sequelize')  // puxando o sequelize para utlizar todas as funções
const sequelize = new Sequelize('e_commerce', 'root', 'senai', { // colocando as informações do meu banco
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Banco conectado com sucesso')
// }).catch(()=>{
//     console.error("Banco não foi conectado")
// })

module.exports = sequelize