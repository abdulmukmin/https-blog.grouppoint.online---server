const jwt = require('jsonwebtoken'),
      User = require('../models/user.js');
require('dotenv').config();

class Middleware{

  static authentication(req, res, next){
  	if (req.headers.jtoken){
  	  jwt.verify(req.headers.jtoken, process.env.jSecret, function(err, decoded) {
	      if (err) res.status(500).json(err.message)
			
				User.findOne({_id: decoded.id})
						.then((result)=> {
							if (result){
								req.decoded = {
									id: result._id,
									username: result.username,
									job: result.job,
									follower: result.follower,
									email: result.email
								}
								next()
							}
							else{
								res.status(500).json("Upps sorry, but sername or email not found, or your password incorrect..!")
							}
						})
						.catch((err)=> {
							console.log(err)
							res.status(500).json(err.message)
						})
			});

  	} else {
  		res.status(500).json("Please login frist..")
  	}
  }

  static authorization(req, res, next){
	if (req.decoded.job === 'administrator'){
		next()
	} 
	else res.status(500).json("Sorry, but your unauthorize!")
  }
};

module.exports = Middleware
