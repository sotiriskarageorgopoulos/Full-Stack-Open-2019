const mongoose = require('mongoose')

const phonebookSchema =  mongoose.Schema({
    name:String,
    number:Number,
    id:Number
 })

if(process.argv.length === 5){
    let password = process.argv[2]

    const url = `mongodb+srv://sotfullstack:${password}@cluster0-xvryx.mongodb.net/test?retryWrites=true&w=majority`

    mongoose.connect(url,{useNewUrlParser:true})

    const phoneBook = mongoose.model('phonebook',phonebookSchema)

    const person = new phoneBook({
       name:process.argv[3],
       number:process.argv[4]
    })

    person.save().then(res=>{
       console.log(`added ${person.name} number ${person.number}`)
       mongoose.connection.close()
    })
}
else if(process.argv.length === 3){
    let password = process.argv[2]

    const url = `mongodb+srv://sotfullstack:${password}@cluster0-xvryx.mongodb.net/test?retryWrites=true&w=majority`

    mongoose.connect(url,{useNewUrlParser:true})

    const phoneBook = mongoose.model('phonebook',phonebookSchema)

    phoneBook.find({}).then(res=>{
        console.log('phonebook:')
        res.forEach(p => console.log(`${p.name} ${p.number}`))
        mongoose.connection.close()
    })
}