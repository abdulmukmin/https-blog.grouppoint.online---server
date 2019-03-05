const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    CommentId: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article