const express = require('express')
const mongoose = require('mongoose')

const app = express()

const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp"
const Todo = require('./models').Todo

mongoose.connect(databaseUrl, {useNewUrlParser: true});

app.get('/api/todos', function(req, res) {
    Todo.find().exec((err, todos) => {
        if (err) {
            res.send(err)
            return
        }
        res.json(todos)
    })
})

app.listen(3000)