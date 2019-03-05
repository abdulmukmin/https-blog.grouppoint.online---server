const   Advertise = require('../models/advertise.js')
        mailer = require('../helpers/mailer.js');

class AdvertiseController{

    static create(req, res){
        if (!req.body.title || !req.body.description){
            res.status(400).json({'message':'Invalid input'})
        }
        else {
            let advertise = new Advertise({
                title: req.body.title,
                description: req.body.description,
                UserId: req.decoded.id,
                status: false
            })
            advertise.save((err, newAdvertise)=> {
                if (err){
                    console.log(err)
                    res.status(400).json({'error found':'call developer!'})
                }
                else {
                    console.log(newAdvertise)
                    res.status(200).json(newAdvertise)
                }
            })
        }
    }

    static readAll(req, res){
        Advertise.find()
        .populate('UserId')
        .then( advertise => {
            if (advertise.length > 5) {
                let limit = 5,
                    randomed = [], //yang udah kerandom maksudnya
                    advertiseArr = [];

                for ( let i = 0; i < limit; i++){
                    let random = Math.floor(Math.random() * Math.floor(advertise.length));
                    if ( randomed.indexOf(random) === -1 ) {
                        randomed.push(random)
                        advertiseArr.push(advertise[random])
                    } else {
                        i--
                    }
                }
                res.status(200).json(advertiseArr)
            } else {
                res.status(200).json(advertise)
            }
        })
        .catch( err => {
            res.status(500).json( err.message )
        })

    }


    static readOwn(req, res){
        Advertise.find({UserId: req.decoded.id})
        .then( advertise => {
            res.status(200).json( advertise )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json( err.message )
        })

    }

}

module.exports = AdvertiseController