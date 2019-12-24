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

app.get('/info',(req,res) => {
  const requestTime = new Date().toUTCString()
  phoneBook.count({}, function(err, c) {
    if (err) {
      console.log(err);
    } else {
      let entriesInfo = `Phonebook has info for ${c} people`
      res.send(`<p>${entriesInfo}</p><p>${requestTime}</p>`) 
    }
  });
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

app.post('/api/persons', (req, res, next) => {
    const person = new phoneBook({name: req.body.name, number: req.body.number})
    person
        .save()
        .then(p => {
            res.json(p)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  phoneBook
  .findOneAndDelete(req.params.id)
    .then(p => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  phoneBook
  .findOneAndUpdate({name:req.body.name},{number:req.body.number},{new: true})
    .then(p => {
      res.json(p)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
