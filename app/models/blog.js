const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {virtuals: true}
})

blogSchema.virtual('likeTotal').get(function () {
  return this.likes.length
})

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog'
})

blogSchema.virtual('handle', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id'
})

blogSchema.virtual('score').get(function () {
  const now = Date.now()
  const likeAdjust = this.likeTotal * 3600000
  return (now - this.createdAt) - likeAdjust
})

module.exports = mongoose.model('Blog', blogSchema)
