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

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    let blogObj = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, info: value }))
    .value()
    let sumOfLikes = new Array(blogObj.length).fill(0)
    let author = []
    for(let i=0; i< blogObj.length;i++){
        author[i] = blogObj[i].author
        for(let j=0; j<blogObj[i].info.length;j++){
             sumOfLikes[i] += blogObj[i].info[j].likes 
        }
    }
    let pos=0
    let maxLikes = sumOfLikes[pos]
    for(let i=pos+1; i< blogObj.length;i++){
        if(maxLikes < sumOfLikes[i]){
            maxLikes = sumOfLikes[i]
            pos = i
        }
    }
    return {author:author[pos],likes:maxLikes}
  }


 const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(b => b.toJSON());
  };

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb
}