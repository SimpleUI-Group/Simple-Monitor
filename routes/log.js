var express = require('express');
var router = express.Router();
const fs = require('fs');

const commonModule = require('../module/common');

/* render today log */
router.get('/', (req, res, next) => {

  let nowDate = req.query['date'], nowUid='';

  // default date is today
  if(!req.query['date']) {

      let nowTime = new Date(),
      
      nowMonth = parseInt(nowTime.getMonth()) + 1,

      nowDateStr = nowTime.getDate();


      nowDate = `${nowTime.getFullYear()}-${nowMonth < 10 ? '0' + nowMonth : nowMonth}-${nowDateStr < 10 ? '0' + nowDateStr : nowDateStr}`;

  }



  fs.readFile(`${__dirname}/../db/log/${nowDate}.json`, 'utf-8', (err, data) => {


        let dblog = [],
            listData=[];

        // not err dblog is data
        if (!err) {
            dblog = JSON.parse(data);
        }


        commonModule.isLogin(req, res, next);

        //queryString to parser listdata
        listData = commonModule.getDataFromQueryString(req, dblog);

        commonModule.setCookie(req, res, 'uid');

        res.render('log', { 
            head: commonModule.head, 
            userInfo: commonModule.userInfo(req), 
            list: listData, 
            formkey:{
              date:req.query['date'] || '',
              searchkey:req.query['searchkey'] || '',
            }
        });

        //clear somethings
        dblog = null;
        listData = null;

    });
});


router.get('/detail', (req, res, next) => {
  
  fs.readFile(`${__dirname}/../db/log/${req.query['date']}.json`, 'utf-8', (err, data) => {

    if(err) {
      res.end('出错了!');
      return;
    }

    const dblog = JSON.parse(data)[req.query['num']-1];

    commonModule.isLogin(req, res, next);

    commonModule.setCookie(req, res, 'uid');
    res.render('logDetail', { head: commonModule.head, userInfo: commonModule.userInfo(req), detail: dblog});

  });
});


router.post('/send', (req, res, next) => {

  let result = {result:'1'};

  let data = req.body;


  for(let item in data) {

    try {

      data[item] = JSON.parse(data[item]);

    }catch(e) {

    }
  }

  let nowTime = new Date(),
      
      nowMonth = parseInt(nowTime.getMonth()) + 1,

      nowDate = nowTime.getDate();


      data['date'] = nowTime.getFullYear() + '-' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '-' + (nowDate < 10 ? '0' + nowDate : nowDate);

      data['datedir'] = data['date'];

      data['date'] += ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds()


      fs.readFile(`${__dirname}/../db/log/${data['datedir']}.json`, 'utf-8', (err, data2) => {


        let nowData = [];
            data['id'] = 1;
            nowData.push(data);


        if(!err) {

          nowData = JSON.parse(data2);
          data['id'] = nowData.length + 1;
          nowData.push(data);
        }



        fs.writeFile(`${__dirname}/../db/log/${data['datedir']}.json`, JSON.stringify(nowData), (err) => {

          res.header("Access-Control-Allow-Origin", "*");

          if (err) {
              res.send("{'result': '0'}");
              return;
          }

          res.send("{'result': '1'}");

        });


      });
});

module.exports = router;
