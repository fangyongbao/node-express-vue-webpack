/**
 * desc: 时间模块
 * date: 2016-09-02
 * author: maicon
 **/

function formatNumber(n) {
    var n = n.toString();
    return n[1] ? n : '0' + n;
}

const time = {
    formatTime: function(date, full) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var str = '';
        if (full) {
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
        } else {
            return [year, month, day].map(formatNumber).join('-');
        }
    },
    timeSpace: function(seconds) {
        let myDate = new Date();
        let cursecds = parseInt(myDate.getTime() / 1000);
        let difsecds = cursecds - seconds;
        let timeStr = '';
        if (difsecds / 60 < 5) {
            timeStr = "刚刚";
        } else if (difsecds / 3600 < 1) {
            timeStr = difsecds / 60;
            timeStr = parseInt(timeStr) + "分钟前";
        } else if ((difsecds / 3600 > 1) && (difsecds / 86400 < 1)) {
            timeStr = difsecds / 3600;
            timeStr = parseInt(timeStr) + "小时前";
        } else if (difsecds / 86400 > 1) {
            timeStr = difsecds / 86400;
            if (timeStr < 7) {
                timeStr = parseInt(timeStr) + "天前";
            } else if (timeStr < 14) {
                timeStr = "1周前";
            } else if (timeStr < 21) {
                timeStr = "2周前";
            } else if (timeStr < 28) {
                timeStr = "3周前";
            } else if (timeStr < 60) {
                timeStr = "1个月前";
            } else if (timeStr < 90) {
                timeStr = "2个月前";
            } else if (timeStr < 120) {
                timeStr = "3个月前";
            } else if (timeStr < 150) {
                timeStr = "4个月前";
            } else if (timeStr < 180) {
                timeStr = "5个月前";
            } else if (timeStr < 210) {
                timeStr = "6个月前";
            } else if (timeStr < 240) {
                timeStr = "7个月前";
            } else if (timeStr < 270) {
                timeStr = "8个月前";
            } else if (timeStr < 300) {
                timeStr = "9个月前";
            } else if (timeStr < 330) {
                timeStr = "10个月前";
            } else if (timeStr < 360) {
                timeStr = "11个月前";
            } else {
                timeStr = "1年前";
            }
        }
        return timeStr;
    },
    restTime: function(y, m, d, h, min, s) {
        let nowDate = new Date();
        let endDate = new Date(y, m - 1, d, h, min, s);
        let leftTime = endDate.getTime() - nowDate.getTime();
        let leftsecond = parseInt(leftTime / 1000);
        let day = Math.floor(leftsecond / (60 * 60 * 24));
        let hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
        let minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
        let second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }
}

export default time;
