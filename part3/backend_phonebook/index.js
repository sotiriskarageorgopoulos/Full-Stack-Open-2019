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
       id: 6
    }
  ]

  app.get('/api/persons',(req,res)=>{
      res.json(persons)
  })

  const PORT = 3001

  app.listen(PORT,()=>{
      console.log(`Server running on port: ${PORT}`)
  })