/**
 * 用户中心
 * @date 2016/12/15
 * @author marvin
 */

var express = require('express');
var request = require('request');
var async = require('async');
var util = require('../js/util');
var config = require('../js/config');
var helper = require('../js/helper');
var router = express.Router();

var seo = {
    title: '',
    keywords: '',
    description: ''
}

router.post('/getCode', function(req, res, next) {
    var formData = req.body;
    request.post({
        url: config.API_PATH + '/k8/create-verify-code',
        form: formData,
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        // console.log('/k8/create-verify-code:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            var resData = JSON.parse(body);
            res.send(resData);
        } else {
            console.log('/k8/create-verify-code error:');
            console.log(body);
        }
    })
});

router.post('/register/normal', function(req, res, next) {
    var formData = req.body;
    request.post({
        url: config.API_PATH + '/k8/register',
        form: formData,
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        // console.log('/k8/register:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            var resData = JSON.parse(body);
            var status = resData.status;
            var data = resData.data;
            if (status.err_code == 0) {
                req.session.token = data.access_token;
                req.session.userObj = data;
            }
            res.send(resData);
        } else {
            console.log('/k8/register error:');
            console.log(body);
        }
    })
});

router.post('/register/fast', function(req, res, next) {
    var formData = req.body;
    request.post({
        url: config.API_PATH + '/k8/quick-reg',
        form: formData,
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var resData = JSON.parse(body);
            var status = resData.status;
            var data = resData.data;
            if (status.err_code == 0) {
                req.session.token = data.access_token;
                req.session.userObj = data;
            }
            res.send(resData);
        } else {
            console.log('/k8/quick-reg error:');
            console.log(body);
        }
    })
});

router.post('/login', function(req, res, next) {
    var formData = req.body;
    request.post({
        url: config.API_PATH + '/k8/login',
        form: formData,
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        // console.log('/k8/login:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            var resData = JSON.parse(body);
            var status = resData.status;
            var data = resData.data;
            if (status.err_code == 0) {
                req.session.token = data.access_token;
                req.session.userObj = data;
            }
            res.send(resData);
        } else {
            console.log('/k8/login error:');
            console.log(body);
        }
    })
});

router.post('/mobile-login', function(req, res, next) {
    var formData = req.body;
    request.post({
        url: config.API_PATH + '/k8/mobile-login',
        form: formData,
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        // console.log('/k8/mobile-login:');
        // console.log(body);
        if (!error && response.statusCode == 200) {
            var resData = JSON.parse(body);
            var status = resData.status;
            var data = resData.data;
            if (status.err_code == 0) {
                req.session.token = data.access_token;
                req.session.userObj = data;
            }
            res.send(resData);
        } else {
            console.log('/k8/mobile-login error:');
            console.log(body);
        }
    })
});

router.post('/logout', function(req, res, next) {
    var token = '';
    if (req.session && req.session.token) {
        token = req.session.token;
    }
    request.post({
        url: config.API_PATH + '/k8/logout',
        form: {
            access_token: token
        },
        headers: {
            'x-forwarded-for': req.session.ip
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // console.log('/k8/logout:');
            // console.log(data);
            if (data.status.err_code == 0 || data.status.err_code == 1006) {
                delete req.session.token;
                delete req.session.userObj;
            }
            res.send(JSON.parse(body));
        } else {
            console.log('/k8/logout error:');
            console.log(body);
        }
    })
});

module.exports = router;
