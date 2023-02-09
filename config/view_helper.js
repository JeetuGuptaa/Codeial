//it will help views find the right file to access
const env = require('./environment');
const fs = require('fs');
const path = require('path');
module.exports = (app)=>{
    app.locals.assetPath = function(filePath){//we will be providing it the filePath
        if(env == 'development') return filePath;//if we are in development mode return the filepath
        else{
            return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
        }
    }
}