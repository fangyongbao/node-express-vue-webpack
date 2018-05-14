/**
 * desc: 本地存储模块
 * date: 2016-09-02
 * author: maicon
 **/

const localStorage = {
    set: function(key, value) {
        window.localStorage[key] = value;
    },
    get: function(key) {
        return window.localStorage[key] == undefined ? "" : window.localStorage[key];
    },
    setObject: function(key, value) {
        try {
            window.localStorage[key] = JSON.stringify(value);
        } catch (e) {
            alert("本地储存写入错误，若为safari浏览器请关闭无痕模式浏览。");
        }
    },
    getObject: function(key) {
        return JSON.parse(window.localStorage[key] || '{}');
    },
    remove: function(key) {
        window.localStorage.removeItem(key);
    }
}

export {
    localStorage
};
