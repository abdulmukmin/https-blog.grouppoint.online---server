const   app   = require('../app'),
        chai = require('chai'),
        chaiHttp = require('chai-http'),
        expect = chai.expect,
        User = require('../models/user');

chai.use(chaiHttp)

describe('Users', () => {

    beforeEach((done) => {
        User.create({
            username: 'test0',
            email: 'test0@mail.com',
            password: 'test0!'
        })
        .then(()=> {
            done()
        })
    })

    afterEach((done)=> {
        User.remove({}, ()=> {
            done()
        })
    })

    it('username register field must be filled', (done)=> {
        let obj = {
            username: '',
            email: 'test1@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('/users/register')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert valid username')
                done()
            })
    })
/*
    it('username registered length must be minimum 4 character', (done)=> {
        let obj = {
            username: 'tes',
            email: 'test1@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert username name with minimum 4 characters and maximum 20 characters and not contain special character')
                done()
            })
    })

    it('username registered length must be maximum 20 character', (done)=> {
        let obj = {
            username: 'test1test1test1test1test1',
            email: 'test1@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert username name with minimum 4 characters and maximum 20 characters and not contain special character')
                done()
            })
    })

    it('username registered must not contain special character', (done)=> {
        let obj = {
            username: 'test1@',
            email: 'test1@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert username name with minimum 4 characters and maximum 20 characters and not contain special character')
                done()
            })
    })

    it('username must be unique', (done)=> {
        let obj = {
            username: 'test0',
            email: 'test1@mail.com',
            password: 'test1!'
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please check your email to continue registration process..')
                done()
            })
    })

    it(`format email must filled`, (done)=> {
        let obj = {
            username: 'test1',
            email: '',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert valid email')
                done()
            })
    })

    it(`format email must be valid (include '@' and '.' after.)`, (done)=> {
        let obj = {
            username: 'test1',
            email: 'test1mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert valid email')
                done()
            })
    })

    it(`email must be unique`, (done)=> {
        let obj = {
            username: 'test1',
            email: 'test0@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please check your email to continue registration process..')
                done()
            })
    })

    it(`password must be filled`, (done)=> {
        let obj = {
            username: 'test1',
            email: 'test1@mail.com',
            password: ''  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert valid password')
                done()
            })
    })

    it('password registered length must be minimum 4 character', (done)=> {
        let obj = {
            username: 'tes',
            email: 'test1@mail.com',
            password: 'tes'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('Please insert password with minimum 4 character')
                done()
            })
    })

    it('password registered must contain special character', (done)=> {
        let obj = {
            username: 'test1test1test1test1test1',
            email: 'test1@mail.com',
            password: 'test1!'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('User validation failed: Password must contain at least 1 special character')
                done()
            })
    })

    it('password registered must contain number', (done)=> {
        let obj = {
            username: 'test1test1test1test1test1',
            email: 'test1@mail.com',
            password: 'test@'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('User validation failed: Password must contain at least 1 number')
                done()
            })
    })

    it('password registered must contain alpabeth', (done)=> {
        let obj = {
            username: 'test1test1test1test1test1',
            email: 'test1@mail.com',
            password: '12#$'  
        }

        chai.request(app)
            .post('users/')
            .send(obj)
            .end((err, result)=> {
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('error')
                expect(result.body.error).to.equal('User validation failed: Password must contain at least 1 alpabeth')
                done()
            })
    })

    it('POST /users/register should return new registered user', (done) => {
        let obj = {
            username: 'test1',
            email: 'test1@mail.com',
            password: 'test1!'
        }
    
        chai.request(app)
          .post('/users/register')
          .send(obj)
          .end((err, result) => {
            expect(result).to.have.status(201)
            expect(result.body).to.have.property('name')
            expect(result.body).to.have.property('email')
            expect(result.body).to.have.property('password')
    
            expect(result.body.name).to.equal(obj.name)
            expect(result.body.email).to.equal(obj.email)
            expect(result.body.password).to.not.equal(obj.password)
    
            done()
          })
    })

    it('POST /users/login should success log in user with email and return logged in user token', (done) => {
    chai.request(app)
        .post('/users/login')
        .send({identity: 'test0@mail.com', password: 'test0!'})
        .end((err, result) => {
        expect(result).to.have.status(201)
        expect(result.body).to.have.property('jtoken')
        done()
        })
    })

    it('POST /users/login should success log in user with username and return logged in user token', (done) => {
    chai.request(app)
        .post('/users/login')
        .send({identity: 'test0', password: 'test0!'})
        .end((err, result) => {
        expect(result).to.have.status(201)
        expect(result.body).to.have.property('jtoken')
        done()
        })
    })*/
})