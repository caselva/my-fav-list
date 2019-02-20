const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://dbKing:2fast4u@rocket-league-cars-shard-00-00-r2q2u.mongodb.net:27017,rocket-league-cars-shard-00-01-r2q2u.mongodb.net:27017,rocket-league-cars-shard-00-02-r2q2u.mongodb.net:27017/test?ssl=true&replicaSet=rocket-league-cars-shard-0&authSource=admin&retryWrites=true', (err, client) => {
  if (err) return console.log(err)
  db = client.db('rocket-league-cars') // Database with RL cars
  app.listen(5000, () => {
    console.log('listening on 5000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.post('/cars', (req, res) => {
  db.collection('cars').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  db.collection('cars').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {cars: result})
  })
})