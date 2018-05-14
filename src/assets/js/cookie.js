/**
 * desc: cookie模块
 * date: 2017-04-19
 * author: marvin
 **/

const cookie = {
    /*
     * @param {type} name
     * @param {type} value
     * @param {type} expiresHours过期时间以h为单位
     */
    setCookie: function(name, value, expiresHours) {
        //编码
        var cookieString = name + "=" + escape(value);
        //判断是否设置过期时间
        if (expiresHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expiresHours * 3600 * 1000);
            cookieString = cookieString + "; expires=" + date.toUTCString();
        }
        document.cookie = cookieString;
    },
    getCookie: function(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                //解码
                return unescape(arr[1]);
            }
        }
        return "";
    },
    deleteCookie: function(name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=v; expires=" + date.toGMTString();
    }
}

export default cookie;
