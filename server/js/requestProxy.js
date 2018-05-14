// 公共数据请求模块
var request = require('request');
var config = require('../js/config');

function getPlatfromInfo(platfromId, callback) {
    var formatData = {
        id: platfromId
    };
    request.post({
        url: config.API_PATH + '/platform/view',
        form: formatData
    }, function(error, response, body) {
        // console.log('/platform/view:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            var data = body.data;
            var status = body.status;
            var backData = {};
            if (status.err_code == 0) {
                backData = {
                    code: 1,
                    data: data
                };
            } else {
                backData = {
                    code: -1,
                    msg: status.err_msg
                }
            }
            callback(null, backData);
        } else {
            console.log('/platform/view error:');
            console.log(body);
            callback(body, null);
        }
    })
}

function getMarquee(callback) {
    var formatData = {};
    request.post({
        url: config.API_PATH + '/content/marquees',
        form: formatData
    }, function(error, response, body) {
        // console.log('/content/marquees:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            var data = body.data;
            var status = body.status;
            var backData = {};
            if (status.err_code == 0) {
                backData = {
                    code: 1,
                    data: data
                };
            } else {
                backData = {
                    code: -1,
                    msg: status.err_msg
                }
            }
            callback(null, backData);
        } else {
            console.log('/content/marquees error:');
            console.log(body);
            callback(body, null);
        }
    })
}

module.exports = {
    getPlatfromInfo: getPlatfromInfo,
    getMarquee: getMarquee
};
