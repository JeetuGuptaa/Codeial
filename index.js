const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const User = require('./models/user.js');
const session = require('express-session');//used to encrypt the cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//to permanently store our session on mongo
const MongoStore = require('connect-mongo');
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'));
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//for session cookie
app.use(session({
    name : 'codeial', 
    secret : "blahsomething", // encryption ket that will be used to encrypt the cookie
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
//use router 
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }

    console.log(`Server successfully running on port : ${port}`);
});