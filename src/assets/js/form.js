const form = {
    isPhone(str) {
        var reg = /^1\d{10}$/;
        return reg.test(str);
    },
    isEmail(str) {
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]{2,})+$/;
        return reg.test(str);
    },
    // 大于等于0的整数
    isInitGreaterEqual0(str) {
        var reg = /^\d+$/;
        return reg.test(str);
    },
    // 大于0的整数
    isInitGreater0(str) {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        return reg.test(str);
    },
    // 正整数
    // isInit(){
    //  var reg = /^[0-9]*[1-9][0-9]*$/;
    //  return reg.test(str);
    // }
    isEmpty(str) {
        if (str.toString().length <= 0) {
            return true;
        } else {
            return false;
        }
    },
    //6-11字母数字组合
    isMix6_11(str) {
        var reg = !/^[a-zA-Z\d]{6,11}$/;
        return reg.test(str);
    },
    // url
    isUrl(str) {
        var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return reg.test(str);
    },
    // ip
    isIp(str) {
        var reg = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/;
        return reg.test(str);
    }
}
export default form;
