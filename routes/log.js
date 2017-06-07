var express = require('express');
var router = express.Router();
const fs = require('fs');

const commonModule = require('../module/common');

/* GET home page. */
router.get('/', function(req, res, next) {

  let nowDate = req.query['date'], nowUid='';

  if(!req.query['date']) {

      let nowTime = new Date(),
      
      nowMonth = parseInt(nowTime.getMonth()) + 1,

      nowDateStr = nowTime.getDate();


      nowDate = nowTime.getFullYear() + '-' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '-' + (nowDateStr < 10 ? '0' + nowDateStr : nowDateStr);
  }
  let dblog;
  
  try {
    dblog = fs.readFileSync('../db/log/' + nowDate + '.json', 'utf-8');
    dblog = JSON.parse(dblog);


  }catch(e) {

    dblog = [];
  }

  commonModule.isLogin(req, res, next);

  let listData = commonModule.getDataFromQueryString(req, dblog);


  res.cookie('uid', req.cookies.uid, { expires: new Date(Date.now() + 3600000), httpOnly: true, domain: req.domain, path: '/'});
  res.render('log', { 
      head: commonModule.head, 
      userInfo: commonModule.userInfo(req), 
      list: listData, 
      formkey:{
        date:req.query['date'] || '',
        searchkey:req.query['searchkey'] || '',
      }
  });

  dblog = [];
  listData = [];
});


router.get('/detail', function(req, res, next) {
  
  const dblog = require('../db/log/' + req.query['date'])[req.query['num']-1];

  commonModule.isLogin(req, res, next);

  res.cookie('uid', req.cookies.uid, { expires: new Date(Date.now() + 3600000), httpOnly: true, domain: req.domain, path: '/'});
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

  let nowTime = new Date(),
      
      nowMonth = parseInt(nowTime.getMonth()) + 1,

      nowDate = nowTime.getDate();


      data['date'] = nowTime.getFullYear() + '-' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '-' + (nowDate < 10 ? '0' + nowDate : nowDate);

      data['datedir'] = data['date'];

      data['date'] += ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds()

      fs.readFile('../db/log/' + data['datedir'] + '.json', 'utf-8', function (err, data2) {


        let nowData = [];
            data['id'] = 1;
            nowData.push(data);

        if(!err) {
          nowData = JSON.parse(data2);
          data['id'] = nowData.length + 1;
          nowData.push(data);
        }



        fs.writeFile('../db/log/' + data['datedir'] + '.json', JSON.stringify(nowData), function(err) {
          if (err) {
              res.send("{'result': '0'}");
              return;
          }

          res.send("{'result': '1'}");

        });


      });
});

module.exports = router;
