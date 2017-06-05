var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

const dbUsers = require('../db/users');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login', { head: commonModule.head });

});

router.post('/', function(req, res, next) {

 if(!dbUsers[req.body['username']]) {

    res.render('message', {type:'error', message:'用户名不存在'});
    return;
 }

 if(!req.body['password'] || dbUsers[req.body['username']] != req.body['password']) {

    res.render('message', {type:'error', message:'用户名或密码不正确'});
    return;
 }

 res.cookie('uid', req.body['username'], { expires: new Date(Date.now() + 3600000), httpOnly: true, domain: req.domain, path: '/'});
 res.render('message', {type:'success', message:'登录成功', path:'/'});

});

router.get('/logout', function (req, res, next) {

  res.clearCookie('uid');
  res.render('message', {type:'success', message:'登出成功', path:'/'});
});

module.exports = router;
