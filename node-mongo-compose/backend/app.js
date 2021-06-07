//? exportar o servidor web express
const express = require('express')

//? exportar o node-restfull. 
//?Serve para implementar o web server muito mais fácil.
const restful = require('node-restful')

//? iniciar o server. usando o construtor do express
const server = express()

//? vai chamar o mongoose. que está disponível a partir do node-restful
const mongoose = restful.mongoose

const bodyParser = require('body-parser')
const cors = require('cors')

//* Database
//? o mongoose vai usar a API de Promise do node
mongoose.Promise = global.Promise
//? fazendo a conexão do banco de dados mongoDb
//? db é o nome do servidor que está sendo referenciado no arquivo docker-compose.yml
mongoose.connect('mongodb://db/mydb')

//* middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

//* ODM - mapeamento objeto documento
//? model name
//? Define um modelo ou o recupera.Os modelos definidos na instância do mongoose estão disponíveis para todas as conexões criadas pela mesma instância do mongoose. 
const Client = restful.model('Client', {
    name: { type: String, require: true}
})

//* Rest API 
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

//*Routers - rotas
Client.register(server, '/clients')

//* start server
//? servidor vai ser iniciado na porta 3000
server.listen(3000)