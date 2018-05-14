/**
 * 服务端公共函数封装
 * @author maicon
 */

var http = require('http');
var querystring = require('querystring');
var config = require('./config');
var md5 = require('md5-hex');
var util = {

    /**
     * 数据请求模块
     * @param   {}           req      请求对象
     * @param   {}           res      响应对象
     * @param   {}           next     将控制权交给下一个中间件
     * @param   {string}     url      请求的url
     * @param   {object}     data     请求的数据
     * @param   {Function}   callBack 请求结束的回调
     * @example util.request(req, res, next, url, postData, function(data) { console.log(data); });
     */
    request: function(req, res, next, url, data, callBack) {
        var data = querystring.stringify(data);
        var options = {
            hostname: config.API_PATH_B,
            port: 80,
            path: url,
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded;charset=utf-8",
                'Content-Length': data.length,
                'Keep-Alive': true,
                'timeout': 30000
            }
        }
        var nodeRequest = http.request(options, function(resN) {
            var result = '';
            resN.setEncoding('utf8');
            resN.on('data', function(data) {
                result = data;
            }).on('end', function() {
                callBack(JSON.parse(result));
            });
        }).on('error', function(e) {
            console.log('request error: ' + e.message);
            callBack(JSON.parse(e.message));
        });
        nodeRequest.write(data);
        nodeRequest.end();
    },

    getTime: function() {
        var date = new Date();
        var dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        return dateStr;
    },

    getKey: function(obj) {
        var str = [];
        for (var key in obj) {
            str.push(key);
        }
        return str;
    },

    sortBy: function(Obj) {
        let _this = this;
        var _ObjKey = _this.getKey(Obj);
        var _return = [];
        _ObjKey.sort(function(a, b) {
            return a > b ? 1 : -1;
        });
        for (var i in _ObjKey) {
            _return.push(Obj[_ObjKey[i]]);
        }
        _return.push(config.K8_KEY);
        return _return;
    },

    // 请求参数加密
    sign: function(data) {
        let _this = this;
        var obj = _this.sortBy(data);
        obj = obj.join('');
        // console.log('sign str:');
        // console.log(obj);
        return md5(obj);
    },

    toQueryPair: function(key, value) {
        if (typeof value == 'undefined') {
            return key + '=' + '';
        }
        return key + '=' + value;
    },

    // object转url查询参数
    toQueryString: function(obj) {
        let _this = this;
        let ret = [];
        for (let key in obj) {
            let value = obj[key];
            ret.push(_this.toQueryPair(key, value));
        }
        // return encodeURIComponent(ret.join('&'));
        return ret.join('&');
    }
}

module.exports = util;
