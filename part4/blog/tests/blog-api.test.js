const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const Blog  = require('../models/blog')

const listWithBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const blogApi = supertest(app)

describe('create test-blog-api.', () => {
    const TIMEOUT = 5000
  
    beforeEach(async () => {
      await Blog.deleteMany()
      const blogObj = listWithBlogs.map(b => new Blog(b))
      const promises = blogObj.map(b => b.save())
      await Promise.all(promises)
    })
  
    describe('a test that makes an HTTP GET request to the /api/blogs url.', () => {
      test(
        'blogs are returned as json',
        async () => {
          await blogApi
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        },
        TIMEOUT
      )
  
      test(
        'all blogs are returned',
        async () => {
          const res = await blogApi.get('/api/blogs')
          expect(res.body.length).toBe(listWithBlogs.length)
        },
        TIMEOUT
      )
  
      test(
        "id exists ?",
        async () => {
          const res = await blogApi.get('/api/blogs')
          res.body.forEach(e => {
            expect(e).toBeDefined()
          })
        },
        TIMEOUT
      )
    })
  
    describe('making an HTTP POST request to the /api/blogs url', () => {
      test(
        'post a new blog post and save to db',
        async () => {
          const newBlogPost = {
            title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
            author: 'Jeffrey Zhen',
            url:
              'https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a',
            likes: 6,
          }
          await blogApi
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)
          const blogsAfterPost = await helper.blogsInDb()
          expect(blogsAfterPost.length).toBe(listWithBlogs.length + 1)
        },
        TIMEOUT
      )
  
      test(
        'if likes is missing then likes = 0',
        async () => {
          const newBlogPost = {
            title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
            author: 'Jeffrey Zhen',
            url:
              'https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a',
          }
          const savedBlogPost = await blogApi
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)
          expect(savedBlogPost.body.likes).toBe(0)
        },
        TIMEOUT
      )
  
      test(
        'title and url are missing from post request then api responds with 400 status code',
        async () => {
          const newBlogPost = {
            author: 'Jeffrey Zhen',
            likes: 6,
          }
  
          await blogApi
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(400)
        },
        TIMEOUT
      )
    })
  
    describe('deleting a single blog post resource.', () => {
      test(
        'delete a blog post',
        async () => {
          const blogs = await helper.blogsInDb()
          await blogApi.delete(`/api/blogs/${blogs[0].id}`).expect(204)
        },
        TIMEOUT
      )
    })
  
    describe('updating the information of an individual blog post', () => {
      test(
        'update all fields of an individual blogpost',
        async () => {
          const blogs = await helper.blogsInDb()
          const updBlogPost = {
            likes: 25,
            title: 'The 10 Component Commandments',
            author: 'selbekk',
            url: 'https://dev.to/selbekk/the-10-component-commandments-2a7f',
          }
          await blogApi
            .put(`/api/blogs/${blogs[0].id}`)
            .send(updBlogPost)
            .expect(200)
  
          const blogsAfterUpd = await helper.blogsInDb()
          Object.entries(updBlogPost).forEach((b) => {
            expect(Object.entries(blogsAfterUpd[0])).toContainEqual(b)
          })
        },
        TIMEOUT
      )
  
      test(
        "update likes field",
        async () => {
          const blogs = await helper.blogsInDb()
          const newLikesVal = blogs[0].likes + 1
          const updatedBlogRes = await blogApi
            .put(`/api/blogs/${blogs[0].id}`)
            .send({ likes: newLikesVal })
            .expect(200)
          expect(updatedBlogRes.body.likes).toBe(newLikesVal)
        },
        TIMEOUT
      )
  
      test(
        'update request with empty body returns 400',
        async () => {
          const blogs = await helper.blogsInDb()
          await blogApi
            .put(`/api/blogs/${blogs[0].id}`)
            .send({})
            .expect(400)
        },
        TIMEOUT
      )
    })
  
    afterAll(() => {
      mongoose.connection.close()
    })
  })

