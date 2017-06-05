const CONFIG_MAIN = require('../config/mainSite');
const dbUsers = require('../db/users');

exports.head = {
    title:CONFIG_MAIN.siteTitle,
    keyWords:CONFIG_MAIN.keyWords,
    desc:CONFIG_MAIN.desc,
}

exports.isLogin = function (req, res, next) {

    if (req.path != '/login' && !req.cookies.uid) {
 
        res.redirect('/login');  
    }
}

exports.userInfo = function (req) {

    return req.cookies.uid
}