var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path')

let PORT = process.env._PORT || 3000;
var db = require('../database-mongo');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, '/../react-client/dist')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'))
})
app.listen(PORT, function () {
  console.log('listening on port 3000!');
});

app.post('/signup', async (req, res) => {
  db.saveUser(req.body.username, req.body.password)
    .then(() => {res.status(201).json(true)})
    .catch((err) => {res.status(500).end(`user ${req.body.username} already in the database`)})
});

app.post('/login', async (req, res) => {
  db.findUser(req.body.username, req.body.password)
    .then(user => res.json(user))
    .catch(err => console.log(err))
});

app.post('/data', async (req, res) => {
  db.getData(req.body.username)
    .then(data => {res.status(201).json(data.reverse())})
    .catch((err)=> console.log({err}))
});

app.post('/todo/add', async (req, res) => {
  db.addTodo(req.body.todo, req.body.username)
    .then(data => {res.status(201).json(data.reverse())})
    .catch((err)=> console.log({err}))
});


app.post('/todo/update', async (req, res) => {
  db.updateTodo(req.body.username, req.body["todo[_id]"], req.body['todo[todo]'])
    .then(result => res.json(result.reverse()))
    .catch((err)=> console.log({err}))
});

app.post('/todo/delete', async (req, res) => {
  db.deletTodo(req.body["todo[_id]"], req.body.username)
    .then(result => res.json(result.reverse()))
    .catch((err)=> console.log({err}))
});

app.post('/todo/update/state', async (req, res) => {
  console.log(req.body)
  db.updateState(req.body.username, req.body._id, req.body.done)
    .then(result => res.json(result.reverse()))
    .catch((err)=> console.log({err}))
});

