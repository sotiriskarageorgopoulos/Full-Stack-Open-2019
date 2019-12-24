const mongoose = require('mongoose')
const url = process.env.MONGODB_URI 
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema =  mongoose.Schema({
    name:{
      type:String,
      unique:true,
      required:true,
      minlength:3
    },
    number:{
      type:Number,
      minlength:8,
      required:true, 
    },
    id:Number
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('phoneBook', phonebookSchema)  

