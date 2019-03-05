const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const advertiseSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    status: {type: Boolean, require: true},
    expireDate: {type: Date}
},{
    timestamps: true
})

const Advertise = mongoose.model('Advertise', advertiseSchema)

module.exports = Advertise;