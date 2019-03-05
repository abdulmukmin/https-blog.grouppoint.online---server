const   User = require('../models/user.js'),
        mailer = require('../helpers/mailer.js'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcryptjs');
require('dotenv').config()

class UserController{

    static register(req, res){

        /*User.findOne({username: req.body.username})
            .then( user => {
                if (user){
                    res.status(400).json({ 'message' : 'Please insert valid username'})
                }
                else {
                    User.findOne({email: req.body.email})
                    .then( user => {
                        if (user){
                            let subject = `Someone try to register with your email!`
                            let resultText = `You receive this email cause some one try to register to blog.grouppoint.online, if your forgot your email address please choose forgot password to reset your password`
                            mailer ( user.email, subject, resultText, (err ) => {
                                if ( err) {
                                    console.log(err)
                                    res.status(500).json({'found error':err})
                                }
                                else res.status(200).json('To complete the sign up process, you need to check your emails and click a link' )
                            })
                        }
                        else {
                            let randomPassword = Math.random().toString(36).slice(-8);
                            let user = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: randomPassword,
                                role: req.body.role || 'notAdmin'
                            })
                            user.save( (err, data) => {
                                if (err) {
                                    console.log(err)
                                    res.status(401).json(err.message)
                                }
                                else {
                                    let subject = `Your blog.grouppoint.online password`
                                    let resultText = `Your poll blog.grouppoint.online is ${randomPassword} , please change your password for your account securly..`
                                    mailer ( data.email, subject, resultText, (err ) => {
                                        if ( err) {
                                            console.log(err)
                                            res.status(500).json({'found error':err})
                                        }
                                        else res.status(200).json( "User restration sucess" )
                                    })
                                }
                            })
                        }
                    })
                }
        })*/

        let randomPassword = Math.random().toString(36).slice(-8);
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: randomPassword,
            role: req.body.role || 'notAdmin'
        })
        User.create( newUser )
            .then( user => {
                res.status(201).json( user )
            })
            .catch( error => {
                let path = Object.keys(error.errors)
                let message = []
                path.forEach(p => {
                    message.push( error.errors[p].message)
                })
                res.status(400).json({ error: message})
            })
        

    }

    static signIn(req, res){
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ 'message' : 'Invalid input'})
        } else {
            
            User.findOne({email: req.body.email})
            .populate('author')
            .then( user => {
                if (user){
                    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                        if (err){
                            console.log(err)
                            res.status(500).json('Please call developer!')
                        }else{
                            if (isMatch) {
                                let data = { id : user._id},
                                jtoken = jwt.sign( data, process.env.jSecret)
                                let dataArr = {
                                    jtoken,
                                    username: user.username
                                }
                                res.status(200).json( dataArr )
                            } else {
                                res.status(400).json('your username or password is incorrect')
                            }
                        }
                    });
                }
                else {
                    res.status(400).json('your username or password is incorrect')
                }
            })
        }
    }

    static updatePassword ( req, res ) {
        if (!req.body.lastPass || !req.body.newPass) {
            res.status(400).json({ 'message' : 'Invalid input'})
        } else {
            
            User.findOne({email: req.decoded.email})
            .then( user => {
                if (user){
                    bcrypt.compare(req.body.lastPass, user.password, function(err, isMatch) {
                        if (err){
                            console.log(err)
                            res.status(500).json('Please call developer!')
                        }else{
                            user.password = req.body.newPass
                            user.save()
                                .then ( result => {
                                    res.status(200).json( result )
                                })
                                .catch ( err => {
                                    res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
                                })
                        }
                    });
                }
                else {
                    res.status(400).json('your username or password is incorrect')
                }
            })
        }
    }

    static deleteProfile(req, res){
        
    }

    static followUser(req, res){
        
        User.findOneAndUpdate(
            {_id: req.body.authorId}, 
            {$push: {follower: req.body.followerEmail}})
        .then( article => {
            res.status(200).json( "Success to be a follower" )
        })
        .catch( err => {
            res.status(500).json( "Please contact developer!" )
        })
    }

    static editUser(req, res){
        
    }

}

module.exports = UserController