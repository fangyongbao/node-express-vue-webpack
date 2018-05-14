/**
 * 合并router模块
 * @date 2016/12/14
 * @author marvin
 */

module.exports = function(app) {
    // 首页
    app.use('/', require('./index'));
};
