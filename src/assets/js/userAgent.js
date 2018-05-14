/**
 * desc: userAgent模块
 * date: 2016-09-02
 * author: maicon
 **/

let _uas = navigator.userAgent.toLowerCase();
const userAgent = {
    is_pc: function() {
        let agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        let flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (_uas.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    is_ipad: function() {
        if (_uas.match(/ipad/i)) {
            return true;
        } else {
            return false;
        }
    },
    is_iphone: function() {
        if (_uas.match(/iphone/i)) {
            return true;
        } else {
            return false;
        }
    },
    is_ios: function() {
        if (_uas.match(/iphone/i) || _uas.match(/ipad/i) || _uas.match(/ipod/i)) {
            return true;
        } else {
            return false;
        }
    },
    is_android: function() {
        if (_uas.match(/android/i)) {
            return true;
        } else {
            return false;
        }
    },
    // uc浏览器
    is_uc: function() {
        if (_uas.match(/UCBrowser/i)) {
            return true;
        } else {
            return false;
        }
    },
    // 火狐浏览器
    is_firefox: function() {
        if (_uas.match(/Firefox/i)) {
            return true;
        } else {
            return false;
        }
    },
    // chrome浏览器
    is_chrome: function() {
        if (_uas.match(/Chrome/i)) {
            return true;
        } else {
            return false;
        }
    },
    // qq浏览器
    is_qq: function() {
        if (_uas.match(/MQQBrowser/i)) {
            return true;
        } else {
            return false;
        }
    },
    // qq新闻客户端
    is_qqnews: function() {
        if (_uas.match(/qqnews/i)) {
            return true;
        } else {
            return false;
        }
    },
    // 微博客户端
    is_weibo: function() {
        if (_uas.match(/TXMicroBlog/i)) {
            return true;
        } else {
            return false;
        }
    },
    // 微信
    is_weixin: function() {
        if (_uas.match(/MicroMessenger/i)) {
            return true;
        } else {
            return false;
        }
    }
}

export {
    userAgent
};
