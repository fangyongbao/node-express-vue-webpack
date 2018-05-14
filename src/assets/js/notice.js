const notice = {
    init() {
        if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    },
    send(options) {
        if (window.Notification && Notification.permission !== "denied") {
            var n = new Notification(options.title, {
                // 提示主体内容
                body: options.body,
                // 通知面板左侧图标地址
                icon: options.icon,
                // 任意类型和通知相关联的数据
                data: options.data,
                // 通知显示时候，设备震动硬件需要的振动模式
                vibrate: options.vibrate,
                // 是否有声音
                silent: options.silent,
                // 音频地址
                sound: options.sound,
                // 标签
                //tag: options.tag
            });
            n.onshow = function() {
                setTimeout(n.close.bind(n), options.time || 4000);
            };
            n.onclick = function(e) {
                if (typeof options.handleClick === 'function') {
                    options.handleClick(e);
                }
            };
            return n;
        }
    }
};

notice.init();

export default notice;
