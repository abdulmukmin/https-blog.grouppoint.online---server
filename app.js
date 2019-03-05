var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articles');
var commentRouter = require('./routes/comment');
var advertiseRouter = require('./routes/advertise');

var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.mUsername}:${process.env.mSecret}@ds135844.mlab.com:35844/bloggrouppoint`, { useNewUrlParser: true });
if(process.env.NODE_ENV == 'test') {
    db_connection = 'mongodb://localhost/blogPoint-test'
}

var cors = require('cors')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Yeahh.. mongoose connected!`)
});

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/advertises', advertiseRouter);

module.exports = app;
