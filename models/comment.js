const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const commentSchema = new Schema({
    ArticleId: {type: mongoose.Schema.Types.ObjectId, ref:'Article'},
    content: {type: String, required: true},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true
})

const VisitorComment = mongoose.model('Comment', commentSchema)

module.exports = VisitorComment