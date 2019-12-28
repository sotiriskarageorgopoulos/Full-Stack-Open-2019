const _ = require('lodash')

const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 0
}

const totalLikes = (blog) => {
   return blog.reduce((totalLikes,blog) => totalLikes + blog.likes,0)
}

const favouriteBlog = (blogs) => {
  if(blogs.length === 0) return null
  return blogs.reduce((favouriteBlog,blog)=>favouriteBlog.likes > blog.likes?favouriteBlog:blog,blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogsByAuthor = _.countBy(blogs, 'author')
  const authors = _.map(blogsByAuthor, (b, a) => ({ author: a, blogs: b }))
  return _.maxBy(authors, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}