var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var about = require('./routes/about');
var colabore = require('./routes/colabore');
var parcero = require('./routes/parcero');
var portfolio = require('./routes/portfolio');
var d3 = require('./routes/d3');
var items = require('./routes/items');
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app rutas
app.use('/', index);
app.use('/about', about);
app.use('/colabore', colabore);
app.use('/parcero', parcero);
app.use('/portfolio', portfolio);
app.use('/d3', d3);
app.use('/items', items);

// catch 404 and forward to error handler
app.use(function(req, res, next) {1
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // registra un nuevo helper
  // {{ifeq}}
  hbs.registerHelper('ifeq', function(a,b,opts){
    if(a===b){
      return opts.fn(this);
    }
  });

  // render the1 error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
