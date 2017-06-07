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

        return;  
    }

    if(!dbUsers[req.cookies.uid]) {
        
        res.redirect('/login');
        return;  
    }
}

exports.userInfo = function (req) {

    return req.cookies.uid
}

exports.getDataFromQueryString = function (req, data) {

    let json = {};
    let arr = [];
    json['date'] = req.query['date'];

    if(req.query['searchkey']) {

        arr = req.query['searchkey'].split(',');

        arr.forEach(function (v,i,a) {

            let via = v.split(':');
            json[via[0]] = via[1];
        });
    }

    for(let item in json) {
        
        if(item == 'date') continue;

        data = exports.getData(item, json[item], data);
    }

    return data;
}

exports.getData = function (item, val, data) {

   return data.filter(function(v,i,a) {
        
        return v[item] ? v[item] == val : false;
    });
}