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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}