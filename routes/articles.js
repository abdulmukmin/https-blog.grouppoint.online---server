const   express = require('express'),
        router = express.Router(),
        ArticleController = require('../controllers/article_controller.js'),
        Middlewares = require('../middlewares/index.js');
        
router.get('/', ArticleController.readAll);
router.get('/my', Middlewares.authentication, ArticleController.readOwnArticle);
router.get('/:id', ArticleController.readOneArticle);

router.use(Middlewares.authentication)

router.post('/:id/comment', ArticleController.createComment);        
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

module.exports = router;