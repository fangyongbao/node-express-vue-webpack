/**
 * 配置文件
 * @author marvin
 */
// 环境变量，'dev'表示开发环境，'prod'表示生产环境。开发环境使用未压缩的静态资源，生产环境使用压缩的静态资源
var NODE_ENV = 'prod';
// 静态资源版本号，发布新版本时记得修改
var VERSION = '1.0.0';
// 设置静态资源访问地址，例如：'http://www.best-html5.net/cubee/lat/',以'/'结尾
var STATIC_RUL = '';
var API_PATH = 'http://frontend.theone';
var K8_PRODUCT_ID = 'A02';
var K8_KEY = 'A02SPORT06301508';
var IFRAME_URL = 'http://k8.staging.agent1818.com';
var HOT_RELOAD_RUL = '';
module.exports = {
    NODE_ENV: NODE_ENV,
    VERSION: VERSION,
    STATIC_RUL: STATIC_RUL,
    API_PATH: API_PATH,
    K8_PRODUCT_ID: K8_PRODUCT_ID,
    K8_KEY: K8_KEY,
    IFRAME_URL: IFRAME_URL,
    HOT_RELOAD_RUL: HOT_RELOAD_RUL
};
