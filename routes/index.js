var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

/* GET home page. */
router.get('/', function(req, res, next) {

  commonModule.isLogin(req, res, next);

  router.redirect('/log');
  
});

module.exports = router;
