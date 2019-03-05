// const   app   = require('../app'),
//         chai = require('chai'),
//         chaiHttp = require('chai-http'),
//         expect = chai.expect,
//         Article = require('../models/article'),
//         User = require('../models/user'),
//         jwt = require('jsonwebtoken');

// let jtoken0
// let userId0
// let articleId
// let jtoken1

// chai.use(chaiHttp)

// describe('Article', ()=> {
//     beforeEach((done) => {
//         User.create({
//             username: 'test0',
//             email: 'test0@mail.com',
//             password: 'test0!'
//         })
//         .then(()=> {
//             User.findOne({email: 'test0@mail.com'})
//                 .then(result_user => {
//                     let user = {
//                         id: result_user._id,
//                         username: result_user.username,
//                         email: result_user.email,
//                         phone: result_user.phone
//                     }

//                     jtoken0 = jwt.sign(user, process.env.jSecret)
//                     userId0 = String(user.id)

//                     dummyArticle = {
//                         title: 'first Test Article',
//                         description: 'This is first description on first Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//                         createdAt: new Date(),
//                         modifyAt: new Date(),

//                     }

//                     Article.create(dummyArticle)
//                         .then(article => {
//                             articleId = String(article._id)
//                             done()
//                         })
//                 })
//         })
//     })

//     beforeEach((done) => {
//         User.create({
//             username: 'test1',
//             email: 'test1@mail.com',
//             password: 'test1!'
//         })
//         .then((user) => {
//             User.findOne({email: 'test1@mail.com'})
//                 .then(user_result => {
//                     let user = {
//                         id: user_result._id,
//                         username: user_result.username,
//                         email: user_result.email,
//                         password: user_result.password
//                     }

//                     jtoken1 = jwt.sign(user, process.env.jSecret)
//                     var userId1 = String(user._id)

//                     done()
//                 })
//         })
//     })

//     afterEach((done) => {
//         Article.remove({}, () => {
//             User.remove({}, () => {
//                 done()
//             })
//         })
//     })

//     it('GET /articles should return all article', (done) => {
//         chai.request(app)
//             .get('/articles')
//             .end((err, result) => {
//                 expect(result).to.have.status(200)
//                 expect(result.body).to.be.a('array')
//                 expect(result.body).to.have.lengthOf(1)
//                 expect(result.body[0]).to.have.property('title')
//                 expect(result.body[0]).to.have.property('description')
//                 expect(result.body[0]).to.have.property('creatAt')
        
//                 expect(result.body[0].title).to.equal(dummyArticle.title)
//                 expect(result.body[0].assignee._id).to.equal(userId0)
//                 expect(result.body[0].description).to.equal(dummyArticle.description)
        
//                 done()                
//             })
//     })

//     it('GET /articles/:id should return spesific article', (done) => {
//         chai.request(app)
//             .get(`/articles/${articleId}`)
//             .end((err, result) => {
//                 expect(result).to.have.status(200)
//                 expect(result.body).to.be.a('object')
                
//                 expect(result.body).to.have.property('title')
//                 expect(result.body).to.have.property('description')
//                 expect(result.body).to.have.property('creatAt')
        
//                 expect(result.body.title).to.equal(dummyArticle.title)
//                 expect(result.body.assignee._id).to.equal(userId0)
//                 expect(result.body.description).to.equal(dummyArticle.description)
        
//                 done()                
//             })
//     })

//     it('POST /articles should return new article', (done) => {
//         let newArticle = {
//             title: 'Second Test Article',
//             description: 'This is second description on second Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(200)
//                 expect(result.body).to.have.property('title')
//                 expect(result.body).to.have.property('description')
//                 expect(result.body).to.have.property('creatAt')

//                 expect(result.body.title).to.equal(newArticle.title)
//                 expect(result.body.description).to.equal(newArticle.description)
//                 expect(result.body.createdAt).to.equal(newArticle.createdAt)

//                 done()
//             })
//     })

//     it('PUT /articles:id should return updated article', (done) => {
//         let updateArticle = {
//             title: 'updated - first Test Article',
//             description: 'updated - This is first description on first Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             modifyAt: new Date(),  
//         }

//         chai.request(app)
//             .put(`/articles/${articleId}`)
//             .send(updateArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(200)
//                 expect(result.body).to.have.property('title')
//                 expect(result.body).to.have.property('description')
//                 expect(result.body).to.have.property('creatAt')
//                 expect(result.body).to.have.property('modifyAt')

//                 expect(result.body.title).to.equal(updateArticle.title)
//                 expect(result.body.description).to.equal(updateArticle.description)
//                 expect(result.body.createdAt).to.equal(updateArticle.createdAt)
//                 expect(result.body.modifyAt).to.equal(updateArticle.modifyAt)

//                 done()
//             })
//     })

//     it('DELETE /articles/:id should return deleted article id', (done) => {
//         chai.request(app)
//             .delete(`/articles/${articleId}`)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(200)
//                 expect(result.body).to.have.property('message')
//                 expect(result.body).to.have.property('result')
//                 expect(result.body.result).to.have.property('title')
//                 expect(result.body.result).to.have.property('description')
//                 expect(result.body.result).to.have.property('createdAt')
        
//                 expect(result.body.message).to.equal('Article deleted!')
//                 expect(result.body.result._id).to.equal(articleId)
//                 expect(result.body.result.title).to.equal(dummyArticle.title)
//                 expect(result.body.result.description).to.equal(dummyArticle.description)
//                 expect(result.body.result.createdAt).to.equal(dummyArticle.createdAt)
        
//                 done()
//             })
//     })

//     it('PUT /articles/:id should return error if user update another user\'s article', (done) => {
//         let updateArticle = {
//             title: 'updated - first Test Article',
//             description: 'updated - This is first description on first Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             modifyAt: new Date(),  
//         }

//         chai.request(app)
//             .put(`/articles/${articleId}`)
//             .send(updateArticle)
//             .set('jtoken', jtoken1)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('user is not valid')
//                 done()
//             })
//     })

//     it('DELETE /articles/:id should return error if user delete another user\'s article', (done) => {
//         chai.request(app)
//             .delete(`/articles/${articleId}`)
//             .set('jtoken', jtoken1)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('user is not valid')
//                 done()
//             })
//     })

//     it('POST /articles should return error if title is null', (done) => {
//         let newArticle = {
//             description: 'This is second description on second Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `title` is required.'.toLowerCase())
//                 done()
//             })
//     })

//     it('POST /articles should return error if title less than 10', (done) => {
//         let newArticle = {
//             title: 'first tes',
//             description: 'This is second description on second Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).to.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `title` is at least 10 character'.toLowerCase())
//                 done()
//             })
//     })

//     it('POST /articles should return error if title more than 30', (done) => {
//         let newArticle = {
//             title: 'first test first test first test first test',
//             description: 'This is second description on second Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).to.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `title` is at most 30 character'.toLowerCase())
//                 done()
//             })
//     })

//     it('POST /articles should return error if description is null', (done) => {
//         let newArticle = {
//             title: 'first Test Article',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `description` is required.'.toLowerCase())
//                 done()
//             })
//     })

//     it('POST /articles should return error if description less than 200 character', (done) => {
//         let newArticle = {
//             title: 'first Test Article',
//             description: 'This is first description on first Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `description` is at least 200 character.'.toLowerCase())
//                 done()
//             })
//     })

//     it('POST /articles should return error if description more than 6000 character', (done) => {
//         let newArticle = {
//             title: 'first Test Article',
//             description: 'This is first description on first Article, bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... bla bla bla bla bla... ',
//             createdAt: new Date(),
//             modifyAt: new Date(),

//         }

//         chai.request(app)
//             .post('/articles')
//             .send(newArticle)
//             .set('jtoken', jtoken0)
//             .end((err, result) => {
//                 expect(result).to.have.status(401)
//                 expect(result.body).throw.have.property('err')
//                 expect(result.body.err.toLowerCase()).to.equal('article validation failed: subject: path `description` is at most 6000 character.'.toLowerCase())
//                 done()
//             })
//     })
// })