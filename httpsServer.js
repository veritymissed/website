var createError = require('http-errors');

var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if(req.protocol === 'http'){
    res.redirect(301, `https://${req.headers.host}${req.url}`)
  }
  next()
})
app.use(express.static(path.join(__dirname, './build')));

var fs = require('fs')
var privateKey  = fs.readFileSync(__dirname + '/cert/sslforfree/private.key');
var certificate = fs.readFileSync(__dirname + '/cert/sslforfree/certificate.crt');
var credentials = { key: privateKey, cert: certificate};
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, './buld', 'index.html'))
})

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


var http = require('http');
var https = require('https');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.APP_PORT || '8000');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var httpsServer = https.createServer(credentials ,app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(normalizePort(80), 'verityfolio.site');
server.on('error', onError);
server.on('listening', onListening);

httpsServer.listen(normalizePort(443), 'verityfolio.site');
httpsServer.on('error', onError);
httpsServer.on('listening', function(){
  var addr = httpsServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
// app.on('error', onError);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
