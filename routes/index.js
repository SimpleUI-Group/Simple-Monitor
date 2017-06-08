var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

/* GET home page. */
router.get('/', (req, res, next) => {

  commonModule.isLogin(req, res, next);

  res.redirect('/log');
  
});

module.exports = router;
