var express = require('express');
var request = require('request');
var config = require('./js/config');
var configDev = require('./js/configDev');
var configProd = require('./js/configProd');
var app = express();
var path = require('path');
// http日志中间件
var logger = require('morgan');
// 解析cookie
var cookieParser = require('cookie-parser');
app.use(cookieParser());

if (config.NODE_ENV == 'dev') {
    global.config = configDev;
} else {
    global.config = configProd;
}


// 解析session
// var session = require('express-session');
// var redis = require('redis');
// // session存储到redis
// var RedisStore = require('connect-redis')(session);
// // 设置redis存储Session
// var client = '';
// if (config.NODE_ENV == 'dev') {
//     client = redis.createClient({
//         host: '172.16.1.186',
//         port: 6379,
//         password: 'redispwd'
//     });
// } else {
//     client = redis.createClient({
//         host: '127.0.0.1',
//         port: 6379,
//         password: 'theoneredis'
//     });
// }
// client.on('ready', function(e) {
//     console.log('redis connect success...');
// });
// client.on("error", function(err) {
//     console.log("redis connect error:");
//     console.log(err);
// });
// app.use(session({
//     name: 'lat-session',
//     key: 'lat-session',
//     store: new RedisStore({
//         client: client,
//         prefix: 'lat-session:',
//         // session存活时间s
//         ttl: 1 * 60 * 60,
//         logErrors: true
//     }),
//     // 每次请求都重会重置cookie的 maxAge，session的maxAge也会被重置。 默认值为 false。
//     rolling: true,
//     // 即使 session 没有被修改，也保存 session 值，默认为 true。
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         // 客户端sessionId存活时间ms
//         maxAge: 1 * 60 * 60 * 1000,
//         httpOnly: true
//     },
//     // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改，建议使用 128 个字符的随机字符串
//     secret: 'lat'
// }));

// 解析body
var bodyParser = require('body-parser');

// 加载hbs模块
var hbs = require('express-hbs');

// 指定模板文件的后缀名为html
app.set('views', './server/views');
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.express3({
    // 设置公共html 路径
    // partialsDir: __dirname + "/server/views/partials",
    // defaultLayout: __dirname + "/server/views/layouts/default",
    // layoutsDir: __dirname + "/server/views/layouts",
    extname: ".html"
}));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// 设置语言
// app.use(function(req, res, next) {
//     var lang = req.cookies.language;
//     if (!req.cookies.language) {
//         var browserLanguage = req.headers['accept-language'].toLowerCase();
//         if (browserLanguage.indexOf('zh') > -1) {
//             res.cookie('language', "zh-cn", { maxAge: 9000000000 });
//             lang = "zh-cn";
//         } else {
//             res.cookie('language', "en", { maxAge: 9000000000 });
//             lang = "en";
//         }
//     }
//     global.lang = lang;
//     next();
// });

// // 判断是否登录
// app.use(function(req, res, next) {
//     // console.log('session:');
//     // console.log(req.session);
//     var query_token = req.query.token || '';
//     var isLogin = false;
//     if (query_token) {
//         var formData = {
//             access_token: query_token
//         }
//         request.post({
//             url: config.API_PATH + '/token/validate',
//             form: formData,
//         }, function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 var resData = JSON.parse(body);
//                 var status = resData.status;
//                 var data = resData.data;
//                 if (status.err_code == 0) {
//                     req.session.token = query_token;
//                     req.session.userObj = data;
//                     isLogin = true;
//                 }
//                 // console.log('/token/validate query_token:');
//                 // console.log(resData);
//             } else {
//                 console.log('/token/validate error:');
//                 console.log(body);
//             }
//             global.isLogin = isLogin;
//             next();
//         })
//     } else {
//         if (req.session && req.session.token) {
//             isLogin = true;
//         }
//         global.isLogin = isLogin;
//         next();
//     }
// });

// // 设置IP
// app.use(function(req, res, next) {
//     var ip = [];
//     if (req.ip) {
//         ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
//     }
//     if (ip == null) {
//         ip = '127.0.0.1';
//     } else {
//         ip = ip[0];
//     }
//     req.session.ip = ip;
//     next();
// });
console.log(config.NODE_ENV);
if (config.NODE_ENV == 'dev') {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('../build/webpack.dev.config.js');
    var compiler = webpack(webpackDevConfig);
    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    // 设置静态资源访问路径
    app.use(express.static(path.join(__dirname, '../client')));
}

// 导入router
require('./routes/root.js')(app);

// 404 handler
app.get('*', function(req, res) {
    res.render('404', {
        msg: 'page not find!'
    });
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('404', {
        msg: err.message
    });
});

module.exports = app;
