var express = require('express');


var path = require('path');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var reload = require('reload');
var dataFile = require('./data/data.json');
var io = require('socket.io')();
var mongoose = require('mongoose');

var config = require('./../config');

mongoose.connect(config.mongoUri);

// var database;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));


//static assets folder
//app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000 );
app.set('appData', dataFile);

app.locals.siteTitle = 'Roux Meetups';
app.locals.allSpeakers = dataFile.speakers;

//var routes = require('./routes/index');
//var users = require('./routes/users');

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/


var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

io.attach(server);
io.on('connection', function(socket) {
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });
});

reload(server, app);

