const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 0
}

const totalLikes = (blog) => {
   return blog.reduce((totalLikes,blog) => totalLikes + blog.likes,0)
}

module.exports = {
  dummy,
  totalLikes
}