const express = require('express')
const app = express()

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

  app.get('/api/persons',(req,res)=>{
      res.json(persons)
  })

  app.get('/api/persons/:id',(req,res)=>{
      const id = Number(req.params.id)
      let person = persons.find(p=>p.id === id)
      if(person){
          res.json(person)
      }
      else{
          res.status(404).end()
      }
  })

  app.get('/info',(req,res)=>{
     const requestTime = new Date().toUTCString()
     let entriesInfo = `Phonebook has info for ${persons.length} people`
     res.send(`<p>${entriesInfo}</p><p>${requestTime}</p>`) 
  })

  const PORT = 3001

  app.listen(PORT,()=>{
      console.log(`Server running on port: ${PORT}`)
  })