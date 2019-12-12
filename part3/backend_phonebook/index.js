const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let persons = [
    {
      name: "Arto Hellas",
      number: "040-1234569",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523690",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "123456789087",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    },
    {
       name: "Sotiris",
       number: "62722728282",
       id: 5
    }
  ]

  app.get('/api/persons',(req,res) => {
      res.json(persons)
  })

  app.get('/api/persons/:id',(req,res) => {
      const id = Number(req.params.id)
      let person = persons.find(p=>p.id === id)
      if(person){
          res.json(person)
      }
      else{
          res.status(404).end()
      }
  })

  app.get('/info',(req,res) => {
     const requestTime = new Date().toUTCString()
     let entriesInfo = `Phonebook has info for ${persons.length} people`
     res.send(`<p>${entriesInfo}</p><p>${requestTime}</p>`) 
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
  }) 

  
  app.post('/api/persons',(req,res) => {
      let bodyReq = req.body
      let isExistsName = persons.filter(p => p.name.toLowerCase() === bodyReq.name.toLowerCase() 
                                       || p.name.toUpperCase() === bodyReq.name.toUpperCase())
      if((bodyReq.name.trim().length === 0 || bodyReq.number.trim().length === 0) && isExistsName.length === 0) {
        res.status(400).json({error: "name is missing or number is missing or both are missing!!!"})
      }
      else if(isExistsName.length !== 0) {
        res.status(400).json({error: "The name already exists in the phonebook!!!"})
      }
      else {
      const person = {
        name: bodyReq.name,
        number: bodyReq.number,
        id: generateId()
      }
      persons = persons.concat(person)
      res.json(person)
     }
  })

  const PORT = 3001

  app.listen(PORT,() => {
      console.log(`Server running on port: ${PORT}`)
  })

  const generateId = () => {
    return Math.floor(Math.random()*100000000)
  }