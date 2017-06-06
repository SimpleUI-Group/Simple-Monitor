(function (window) {

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
    var config = {};
    var SMonitor = {
        send: function (data) {

            config.data = data;

            request(config);
        },
        config: function (conf) {
            
            config = conf;
        }
    }
    window.SMonitor = SMonitor;

})(window);