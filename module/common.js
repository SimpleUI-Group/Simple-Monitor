const CONFIG_MAIN = require('../config/mainSite');
const dbUsers = require('../db/users');

exports.head = {
    title:CONFIG_MAIN.siteTitle,
    keyWords:CONFIG_MAIN.keyWords,
    desc:CONFIG_MAIN.desc,
}

exports.isLogin = (req, res, next) => {

    if (req.path != '/login' && !req.cookies.uid) {
 
        res.redirect('/login');

        return;  
    }

    if(!dbUsers[req.cookies.uid]) {

        res.redirect('/login');
        return;  
    }
}

exports.userInfo = (req) => {

    return req.cookies.uid
}

exports.setCookie = (req, res, key, value) => {

    let cookieValue = value;

    if(!value) {

        cookieValue = req.cookies[key];
    }

    res.cookie(key, cookieValue, { expires: new Date(Date.now() + 3600000), httpOnly: true, domain: req.domain, path: '/'});
}


exports.getDataFromQueryString = (req, data) => {

    let json = {};
    let arr = [];
    json['date'] = req.query['date'];

    if(req.query['searchkey']) {

        arr = req.query['searchkey'].split(',');

        arr.forEach((v,i,a) => {

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

exports.getData = (item, val, data) => {

   return data.filter((v,i,a) => {
        
        return v[item] ? v[item] == val : false;
    });
}