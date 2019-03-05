const   VisitorComment = require('../models/comment'),
        Article = require('../models/article'),
        mailer = require('../helpers/mailer.js');

class CommentController{

    static create(req, res){
        let comments = new VisitorComment ({
            ArticleId: req.params.id,
            UserId: req.decoded.id,
            content: req.body.content,
            date: new Date()
        })
        comments.save((err, newComment) => {
            if (err){
                console.log(err)
                res.status(400).json(err.message)
            }
            else {
                Article.findOneAndUpdate(
                    {_id: req.params.id}, 
                    {$push: {CommentId: newComment._id}},
                    {new: true})
                    .populate('author')
                    .populate({
                        path: 'CommentId',
                        populate: { path: 'UserId', select: 'username' }
                    })
                    .then( article => {
                        let commentsArr = article.CommentId
                        //create array comments
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

                        //email comment information to selain author
                        if (String(req.decoded.id) != article.author._id) {
                            let subject = `Your article get comment from ${req.decoded.username}`
                            let resultText = `${req.decoded.username} write comment "${req.body.content}" in article "${article.title}"`
                            mailer ( article.author.email, subject, resultText, (err ) => {
                                if ( err) {
                                    console.log(err)
                                    res.status(500).json({'found error':err})
                                }
                            })
                        }

                        res.status(200).json( newCommentsArr )
                    })
                    .catch( err => {
                        console.log(err)
                        res.status(500).json( err.message )
                    })
            }           
        })
    }

    static readOwn(req, res){
        VisitorComment.find({UserId: req.decoded.id})
                .then( comments => {
                    res.status(200).json( comments )
                })
                .catch( err => {
                    console.log(err)
                    res.status(500).json( err.message )
                })

    }

    static delete ( req, res ) {
        VisitorComment.deleteOne({_id: req.params.id})
            .then( result => {
                Article.findOneAndUpdate(
                    {CommentId: req.params.id}, 
                    {$pull: {CommentId: req.params.id}})
                .then( article => {
                    res.status(200).json( "comment success deleted" )
                })
                .catch( err => {
                    res.status(500).json( err.message )
                })
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( err.message )
            })
    }
}

module.exports = CommentController