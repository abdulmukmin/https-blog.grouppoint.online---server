const 	mongoose = require('mongoose'),
    	Schema = mongoose.Schema,
    	bcrypt = require('bcryptjs');
require('dotenv').config();

const 	UserSchema = new Schema({
    	username: { 
            type: String, 
            validate: {
                validator: function(v) {
                    return /^([a-zA-Z0-9_-]){4,20}$/.test(v);
                },
                message: props => `Please insert username name with minimum 4 characters and maximum 20 characters`
            },
            required: [true, "Please insert valid username"], 
            index: { unique: [true, 'Please check your email to continue registration process..'] } 
        },
    	password: { 
            type: String
        },
        email: { 
            type: String, 
            validate: {
                validator: function(v) {
                    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
                },
                message: props => `Please insert valid email`
            },
            required: [true, "Please insert valid email"], 
            index: { unique: [true, 'Please check your email to continue registration process..'] } 
        },
        follower: [{
            type: String
        }]
        
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(Number(process.env.bSecret), function(err, salt) {
        if (err){
            console.log(err)
            res.status(500).json(err.message)
        };

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err){
                console.log(err)
                res.status(500).json(err.message)
            };

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema)
