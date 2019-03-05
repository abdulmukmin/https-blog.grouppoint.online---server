const   Article = require('../models/article.js')
        mailer = require('../helpers/mailer.js');

class ArticleController{

    static create(req, res){
        if (!req.body.title || !req.body.description){
            res.status(400).json({'message':'Invalid input'})
        }
        else {
            let article = new Article({
                title: req.body.title,
                description: req.body.description,
                author: req.decoded.id,
            })
            article.save((err, newArticle)=> {
                if (err){
                    res.status(400).json({'error found':'call developer!'})
                }
                else {
                    if (req.decoded.follower.length > 0){
                        for ( let i = 0; i < req.decoded.follower.length; i++ ){
                            let subject = `New ${req.decoded.username} Article`
                            let resultText = `${req.body.title}, access blog.grouppoint.online to read more...`
                            mailer ( req.decoded.follower[i], subject, resultText, (err ) => {
                                if ( err) {
                                    console.log(err)
                                    res.status(500).json({'found error':err})
                                }
                            })
                        }
                        res.status(200).json(newArticle)
                    }else{
                        res.status(200).json(newArticle)
                    }
                }
            })
        }
    }

    static createComment(req, res){

        if (!req.body.content){
            res.status(400).json({'message':'Invalid input'})
        }

        let comments = {
            UserId: req.decoded.id,
            content: req.body.content,
            date: new Date()
        };

        Article.findOneAndUpdate(
            {_id: req.params.id}, 
            {$push: {comments: comments}})
        .then( article => {
            res.status(200).json( article )
        })
        .catch( err => {
            res.status(500).json( err.message )
        })
    }

    static readOwnArticle(req, res){
        Article.find({author: req.decoded.id})
        .then( articles => {
            res.status(200).json( articles )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( err.message )
        })

    }

    static readOneArticle(req, res){
        Article.findOne({_id: req.params.id})
        .populate('author', 'username')
        .populate({
            path: 'CommentId',
            populate: { path: 'UserId' }
        })
        .then( article => {            
            //create object article
            let articleObj ={
                title: article.title,
                description: article.description,
                author: article.author.username,
                authorId: article.author._id,
                updatedAt: article.updatedAt
            }

            //create array comments
            let commentsArr = article.CommentId
            let newCommentsArr = []
            for (let i = 0; i < commentsArr.length; i++){
                let obj = {
                   description: commentsArr[i].content,
                   username: commentsArr[i].UserId.username,
                   createdAt: commentsArr[i].createdAt,
                   id: commentsArr[i]._id,
               }
               newCommentsArr.push(obj)
            }
            articleObj.comments = newCommentsArr
            res.status(200).json( articleObj )       
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( err.message )
        })

    }

    static readAll(req, res){
        Article.find()
        .populate('comments.UserId')
        .then( articles => {
            res.status(200).json(articles)
        })
        .catch( err => {
            res.status(500).json( err.message )
        })

    }

    static update ( req, res ) {
        Article.updateOne({_id: req.params.id},{
            title: req.body.title,
            description: req.body.description,
            author: req.decoded.id,
        })
            .then( article => {
                res.status(200).json( article )
            })
            .catch( err => {
                console.log( err )
                res.status(500).json( err.message )
            })
    }

    static delete ( req, res ) {
        Article.deleteOne({_id: req.params.id})
            .then( result => {
                res.status(200).json( "success delete article" )
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( err.message )
            })
    }
}

module.exports = ArticleController
