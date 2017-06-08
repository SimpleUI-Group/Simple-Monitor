var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

const dbUsers = require('../db/users');

/* render login html */
router.get('/', (req, res, next) => {

  res.render('login', { head: commonModule.head });

});


/** post login username and password */
router.post('/', (req, res, next)  => {

 if(!dbUsers[req.body['username']]) {

    res.render('message', {type:'error', message:'用户名不存在'});

    return;
 }

 //not password or password not ture
 if(!req.body['password'] || dbUsers[req.body['username']] != req.body['password']) {

    res.render('message', {type:'error', message:'用户名或密码不正确'});
    return;
 }

 commonModule.setCookie(req, res, 'uid', req.body['username']);

 res.render('message', {type:'success', message:'登录成功', path:'/'});

});


router.get('/logout', (req, res, next) => {

  res.clearCookie('uid');
  
  res.render('message', {type:'success', message:'登出成功', path:'/'});
});

module.exports = router;
