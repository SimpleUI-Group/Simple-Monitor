var express = require('express');
var router = express.Router();

const commonModule = require('../module/common');

/* GET home page. */
router.get('/', function(req, res, next) {

  const dblog = require('../db/log/test/2017-6-2');

  commonModule.isLogin(req, res, next);

  res.render('log', { head: commonModule.head, userInfo: commonModule.userInfo(req), list: dblog});
});


router.get('/detail', function(req, res, next) {

  const dblog = require('../db/log/test/2017-6-2')[0];

  commonModule.isLogin(req, res, next);

  res.render('logDetail', { head: commonModule.head, userInfo: commonModule.userInfo(req), detail: dblog});
});


router.post('/send', function(req, res, next) {

  let result = {result:'1'};

  let data = req.body;


  for(let item in data) {

    try {
      data[item] = JSON.parse(data[item]);
    }catch(e) {}
  }

  let nowTime = new Date();

      data['date'] = nowTime.getFullYear() + '-' + (parseInt(nowTime.getMonth()) + 1) + '-' + nowTime.getDay();

      const datedir = data['date'];

      data['date'] += ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds()

      const fs = require('fs');

      fs.readFile('../db/log/' + data['type'] + '/' + datedir + '.json', 'utf-8', function (err, data2) {


        let nowData = [];
            nowData.push(data);

        if(!err) {
          nowData = data2;
          nowData.push(data);
        }



        fs.writeFile('../db/log/' + data['type'] + '/' + datedir + '.json', JSON.stringify(nowData), function(err) {
          if (err) {
              res.send("{'result': '0'}");
              return;
          }

          res.send("{'result': '1'}");

        });


      });
});

module.exports = router;
