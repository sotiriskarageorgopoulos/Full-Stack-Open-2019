const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const phoneBook = require('./models/phonebook')

app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        ' ',
        tokens.url(req, res),
        ' ',
        tokens.status(req, res),
        ' ',
        tokens.res(req, res, 'content-length'),
        ' - ',
        tokens['response-time'](req, res),
        ' ms ',
        JSON.stringify(req.body)
    ].join('')
}))
app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-1234569",
        id: 1
    }, {
        name: "Ada Lovelace",
        number: "39-44-5323523690",
        id: 2
    }, {
        name: "Dan Abramov",
        number: "123456789087",
        id: 3
    }, {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }, {
        name: "Sotiris",
        number: "62722728282",
        id: 5
    }
]

app.get('/api/persons', (req, res) => {
    phoneBook
        .find({})
        .then(p => {
            res.json(p)
        })
        .catch(error => {
            console.log(error)
            response.status(404).end()
        })
})

app.get('/api/persons/:id', (req, res) => {
    phoneBook
        .findById(req.params.id)
        .then(p => {
          if(p){
            res.json(p)
          }
          else{
            res.status(404)
          }
        })
        .catch(error => {
          console.log(error)
          res.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons', (req, res) => {
    const person = new phoneBook({name: req.body.name, number: req.body.number})
    person
        .save()
        .then(p => {
            res.json(p)
        })
        .catch(error => console.log(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  phoneBook
  .findOneAndDelete(req.params.id)
    .then(p => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
