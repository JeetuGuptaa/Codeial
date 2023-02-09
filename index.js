const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');//will be used to save production logs into a file
const app = express();
require('./config/view_helper')(app);
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const User = require('./models/user.js');
const session = require('express-session');//used to encrypt the cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const path = require('path')
//to permanently store our session on mongo
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const port = 8000;

//chat engine setup for socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log("Chat server listening on port 5000");


app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, env.asset_path)));
app.use(logger(env.morgan.mode, env.morgan.options))
app.use('/uploads', express.static('./uploads'));//this tells server for req coming with /uploads make uploads folder availabe to them
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//for session cookie
app.use(session({
    name : 'codeial', 
    secret : env.session_cookie_key, // encryption ket that will be used to encrypt the cookie
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000 * 60 * 100
     },
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1/User',
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setp ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
//whenever any request comes in this middle ware is called and if the user is authenticated then 
//the user is passed on to the locals, where it will be visible in the views
app.use(passport.setAutherizedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

//use router 
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }

    console.log(`Server successfully running on port : ${port}`);
});