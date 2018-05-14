/**
 * 测试页面
 * @date 2017/06/07
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

router.get('/index.html', function(req, res, next) {
    res.render('tpl/index.html', {
    	config: global.config
    });
});

router.get('/index2.html', function (req, res, next) {
    res.render('tpl/index.html', {
        config: global.config
    });
});

module.exports = router;
