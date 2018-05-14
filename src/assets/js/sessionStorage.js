/**
 * desc: 本地存储模块
 * date: 2016-09-02
 * author: maicon
 **/

const sessionStorage = {
    set: function(key, value) {
        window.sessionStorage[key] = value;
    },
    get: function(key) {
        return window.sessionStorage[key] == undefined ? "" : window.sessionStorage[key];
    },
    setObject: function(key, value) {
        try {
            window.sessionStorage[key] = JSON.stringify(value);
        } catch (e) {
            alert("本地储存写入错误，若为safari浏览器请关闭无痕模式浏览。");
        }
    },
    getObject: function(key) {
        return JSON.parse(window.sessionStorage[key] || '{}');
    },
    remove: function(key) {
        window.sessionStorage.removeItem(key);
    }
}

export {
    sessionStorage
};
