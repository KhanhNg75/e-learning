var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var expressValidator = require('express-validator')
var favicon = require('serve-favicon')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var router = express.Router()

var config = require('./config/database')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(config.database)
var db = mongoose.connection

var routes = require('./routes/index')
var users = require('./routes/users')
var student = require('./routes/student')
var admin = require('./routes/admin')
var teacher = require('./routes/teacher')

// Init App
var app = new express();

var http = require("http").Server(app)
var io = require("socket.io")(http)

var Log = require('log'),
    log = new Log('debug')

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// BodyParser Middleware
app.use(expressLayouts)
app.set('layout', 'layout')
app.set('layout', 'layoutAdmin')
app.set('layout', 'layoutTeacher')
app.set('layout', 'layoutStudent')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(config.database.secret))

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Express Session
app.use(session({
    secret: 'code',
    saveUninitialized: true,
    resave: true,
    cookie: { httpOnly: true, maxAge: 3600000 }
}))

//Io Connection
/*

io.on('connection', socket => {
  socket.emit('request',  … ); emit an event to the socket
  io.emit('broadcast',  … ); // emit an event to all connected sockets
  socket.on('reply', () => {  …  }); // listen to the event
});
https://github.com/socketio/socket.io
https://github.com/socketio/socket.io-client/blob/master/docs/API.md#socket
https://github.com/socketio/socket.io/blob/master/docs/emit.md

*/

io.on('connection', function(socket) {

    socket.on("creat-room", function(data) {
        socket.join(data)
        socket.Phong = data
        socket.emit("server-send-room-socket", data)
    });

    socket.on('stream', function(image) {
        // io.sockets.in(socket.Phong).emit('stream', image);
        io.in(socket.Phong).emit('stream', image);
        // io.to(socket.Phong).emit('stream', image);
        // socket.broadcast.to(socket.Phong).emit('stream', image);
    });

    socket.on("user-chat", function(data) {
        io.sockets.in(socket.Phong).emit("server-chat", data)
    });

    socket.on('error', () => console.log('errored'));
})

// Passport init
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

// Connect Flash
app.use(flash())

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    res.locals.data = req.session.data
    next()
})


require('./config/passport')(passport)

app.use('/', routes)
app.use('/users', users)
app.use('/student', student)
app.use('/admin', admin)
app.use('/teacher', teacher)

// Upload File to Local
var upload = require('./app/config/multer.config.js')

global.__basedir = __dirname

require('./app/routers/file.router.js')(app, router, upload)

var port = process.env.PORT || 3000
http.listen(port, function() {
    log.info('Server is running on port %s', port)
})