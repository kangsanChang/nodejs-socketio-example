var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// io.to(`${socketId}`).emit('hey', 'I just met you');

// WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
// named `socket.id` but the sender. Please use the classic `socket.emit()` instead.
let CEO_STATUS= false;
let CEO_ID = '';

app.io = require('socket.io')();
app.io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on('ceo_connected', () => {
    console.log('장사를 시작합니다...!');
    CEO_STATUS = true;
    CEO_ID = socket.id;
    console.log({CEO_STATUS, CEO_ID});
  })

  socket.on('disconnect', () => {
    console.log({'sockid': socket.id,CEO_STATUS, CEO_ID });
    if(socket.id === CEO_ID){
      console.log('장사 종료...');
      CEO_STATUS = false;
      CEO_ID = '';
    }
  });

  socket.on('order', (order) => {
    if(CEO_STATUS === true){
      app.io.emit('new_order', order);
    }else{
      socket.emit('closed');
    }
  });

  socket.on('serve_coffee', (id) => {
    app.io.to(`${id}`).emit('receive_coffee')
  })
})

module.exports = app;
