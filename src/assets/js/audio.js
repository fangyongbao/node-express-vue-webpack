const audio = {
    create() {
        let _this = this;
        _this.audio = new Audio();
    },

    init(options) {
        let _this = this;
        _this.audio.src = options.src;
        _this.audio.load();
        if (options.autoPlay) {
            _this.audio.oncanplay = function() {
                _this.play();
            }
        }
    },

    play() {
        let _this = this;
        _this.audio.play();
    },

    pause() {
        let _this = this;
        _this.audio.pause();
    },

    // 获取播放百分比
    getPercent() {
        let _this = this;
        if (options.getPercent) {
            // 元素的currentTime属性指示的时间已更改
            _this.audio.ontimeupdate = function(e) {
                let playProgress = _this.audio.currentTime / _this.audio.duration * 100 + '%';
                return playProgress;
            }
        }
    }
}

audio.create();

export default audio;
