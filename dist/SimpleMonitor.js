(function (window) {

    //这里封装了一个 ajax 方法
    var request = function (args) {

        var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4) {

                if (ajax.status == 200) {
                    
                    args.callback && args.callback(JSON.parse(ajax.responseText));
                }else {

                   args.error && args.error(ajax.statusText);
                }
            }
        };

        ajax.open("POST", args.url, true);

        ajax.setRequestHeader("Content-type","application/json"); 

        ajax.send(JSON.stringify(args.data));
    }
    //几个常量
    var config = {},
        cacheData = {};
    
    var SMonitor = {

        /**
         * data:{
         *   uid:'',
         *   info:'',
         *   message:''
         * }
         */
        send: function (data, isSendAll) {

            var timeout = null;

            timeout = setTimeout(function () {

                config.data = data;

                if(isSendAll) {

                    config.data.step = JSON.stringify(cacheData);
                }

                request(config);

                clearTimeout(timeout);
            },0);
        },

        //存用户操作步骤
        cache: function (key, data) {

            cacheData[key] = cacheData[key] ? cacheData[key] : [];
            cacheData[key].push(data);
        },

        //按 key 得到 存储的 cache
        getCache:function (key) {

            var data = JSON.parse(JSON.stringify(cacheData[key]));

            cacheData[key] = null;

            return data;
        },

        /**
         * url 必填
         */
        config: function (conf) {
            
            config = conf;
        }
    }
    window.SMonitor = SMonitor;

})(window);