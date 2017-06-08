# Simple-Monitor

[点击这里查看中文版README](./README-CHINESE.md)

## LICENSE

### MIT License  Arbitrary modification

## INSTALL

```javascript

npm install

npm start

http://localhost:3000

username:admin

password:admin

```

## TEST

```javascript

http://localhost:3000/tmp/test.html

```

## key

### you can filter the log in the background through the key:value.

### Such as: info:'test','type'' type'test

### click query will be selected to meet the 2 conditions of the data do not support fuzzy screening

### If you do not choose the default ### time for today's log list

## SMonitor.js

```javascript
/**
 * Configuring the requested config through the URL
 * http://your domain/log/send
*/

SMonitor.config({
    url:'/log/send'
});

```

```javascript

/**
* Send a log to the background via the send method

* The required parameters for uid and info without the login state uid is free to fill out a random number

* Any field key:value can be customized

*Example */

SMonitor.send({
    'uid':'try',
    'type':'trycatch',
    'info':'try error JSON.parse',
    'name':e.name,
    'message':e.message,
    'key':'value', //Custom field
    'key2':'value2', //Custom field
});

```


## RECORD STEP

```javascript

/**
* The cache method is used to record user actions

* Parameter for actionName, message

* message Only String types are accepted at present

*Example */

SMonitor.cache('action','The user clicked the button at the first step');
SMonitor.cache('action','The user clicked the button at the Second step');
SMonitor.cache('action','The user clicked the button at the Third step');

```

```javascript

/**
* The user action step is sent back to the background via the send method

* Like direct send, you can only get the previous cache record by getCache

* Cache and getCache just provide ways to cache data

* Completely customized to record, and then sent through send

*Example */

SMonitor.send({
    'uid':'action',
    'type':'userAction',
    'info':'Analog user operation',
    'message':SMonitor.getCache('action'),
    'key2':'value2',//Custom field
});

```

