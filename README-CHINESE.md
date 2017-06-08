# Simple-Monitor

[Click view README of ENGLISH](./README.md)


## LICENSE

### MIT License 可任意修改

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

### 你可以通过key:value 的形式在后台进行筛选日志

### 如: info:'测试','type':'测试type'

### 点击query 将会筛选出 满足这2个条件的数据,不支持模糊筛选

### 如果不选择时间 则 默认为今日的log 列表

## SMonitor.js

```javascript
/**
 * 通过 config 配置 请求的 url
 * http://你的域名/log/send
*/

SMonitor.config({
    url:'/log/send'
});

```

```javascript

/**
* 通过send 方法 发送日志 去 后台

* 必填参数为 uid 和 info  若是没有登录态的 uid 可以自由填写一个随机数

* 可自定义任意字段 key:value

*例子 */

SMonitor.send({
    'uid':'try',
    'type':'trycatch',
    'info':'try 抓到错误 JSON.parse',
    'name':e.name,
    'message':e.message,
    'key':'value', //自定义字段
    'key2':'value2', //自定义字段
});

```


## RECORD STEP

```javascript

/**
* 通过cache 方法 用来记录用户操作步骤

* 参数为 actionName, message

* message 目前只接受 String 类型

*例子 */

SMonitor.cache('action','用户点击了第一步的按钮');
SMonitor.cache('action','用户点击了第二步的按钮');
SMonitor.cache('action','用户点击了第三步的按钮');

```

```javascript

/**
* 通过send 方法 将记录用户操作步骤 发送给后台

* 和直接send 一样, 只不过可以通过getCache获取之前 cache 记录的步骤

* cache 和 getCache 只是提供了缓存数据的方法

* 完全可以自己自定义去记录然后通过send 发送

*例子 */

SMonitor.send({
    'uid':'action',
    'type':'userAction',
    'info':'模拟用户操作',
    'message':SMonitor.getCache('action'),
    'key2':'value2',//自定义字段
});

```