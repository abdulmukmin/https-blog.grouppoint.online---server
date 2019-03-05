const   express = require('express'),
        router = express.Router(),
        CommentController = require('../controllers/comment_controller.js'),
        Middlewares = require('../middlewares/index.js');
        
        
router.use(Middlewares.authentication)
        
router.post('/:id', CommentController.create);
router.get('/my', CommentController.readOwn);
router.delete('/:id', CommentController.delete);

module.exports = router;