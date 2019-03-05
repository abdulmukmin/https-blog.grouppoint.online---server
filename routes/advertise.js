const   express = require('express'),
        router = express.Router(),
        AdvertiseController = require('../controllers/advertise_controller.js'),
        Middlewares = require('../middlewares/index.js');
        
router.get('/my', Middlewares.authentication, AdvertiseController.readOwn);
router.get('/', AdvertiseController.readAll);

router.use(Middlewares.authentication)    
router.post('/', AdvertiseController.create);


module.exports = router;