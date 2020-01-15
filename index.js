var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var compression = require('compression');
var fs = require('fs');

require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();
app.set('port', process.env.PORT || 80);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression({ filter: shouldCompress }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
var ca = fs.readFileSync('/etc/letsencrypt/live/swap.ginete.in/fullchain.pem');
var cert = fs.readFileSync( '/etc/letsencrypt/live/swap.ginete.in/fullchain.pem' );
var key = fs.readFileSync( '/etc/letsencrypt/live/swap.ginete.in/privkey.pem' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};

const spdy = require('spdy');
spdy.createServer(options, app).listen(443);

app.use(function(req, res, next) {
  if (req.secure) {
      next();
  } else {
      res.redirect('https://' + req.headers.host + req.url);
  }
});

var http = require('http');
http.createServer(app).listen(80);
*/

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
