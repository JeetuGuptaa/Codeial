const express = require('express');
const db = require('./config/mongoose.js');
const User = require('./models/user.js');
const app = express();
const port = 8000;

//use router 
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assets'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }

    console.log(`Server successfully running on port : ${port}`);
});