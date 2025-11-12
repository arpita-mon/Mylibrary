const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('findOneAndDelete', async function(next) {
  const authorId = this.getQuery()._id
  const books = await mongoose.model('Book').find({ author: authorId })

  if (books.length > 0) {
    next(new Error('This author still has books'))
  } else {
    next()
  }
})


module.exports = mongoose.model('Author', authorSchema)