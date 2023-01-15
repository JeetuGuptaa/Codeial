module.exports.profile = function(req, res){
    return res.render('userProfile');
}

module.exports.data = function(req, res){
    return res.end("<h1>Successfully got the request</h1>");
}

module.exports.signup = function(req, res){
    return res.render('signUp');
}