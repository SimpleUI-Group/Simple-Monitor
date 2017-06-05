var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

/* GET home page. */
router.get('/', function(req, res, next) {

  commonModule.isLogin(req, res, next);

  res.render('index', { head: commonModule.head, userInfo: commonModule.userInfo(req)});
});

module.exports = router;
