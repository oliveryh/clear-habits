///////////
// START //
///////////

// create global app object
var express = require('express');
var app = express();

////////////
// MODELS //
////////////

var mongoose = require('mongoose');
require('./models/User');
require('./models/Task');
require('./config/passport');

////////////////
// MIDDLEWARE //
////////////////

// cross site access
var cors = require('cors');
app.use(cors());

// HTTP request logger
app.use(require('morgan')('dev'));

// parse incoming request bodies (req.body) in middleware before handlers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use PUT / DELETE where the client doesn't allow it
app.use(require('method-override')());

// serve static files
app.use(express.static(__dirname + '/public'));

// session
var session = require('express-session');
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

// production and development logging handling
var errorhandler = require('errorhandler');
var isProduction = process.env.NODE_ENV === 'production';

if(isProduction){

  // connect to external mongodb
  mongoose.connect(process.env.MONGODB_URI);

  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });

} else {

  // connect to local mongodb
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);

  // print stack trace to output
  app.use(errorhandler());
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });

}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//////////////////
// START SERVER //
//////////////////

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
