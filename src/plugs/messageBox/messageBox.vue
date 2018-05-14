<template>
    <div class="cux-toast-wrapper">
        <cover :visible="visible" :index="coverIndex"></cover>
        <transition name="cux-fade-up">
            <div class="cux-toast-body" v-if="visible" :style="{zIndex: index}">
                <i class="cux-close" @click="close"></i>
                <div class="cux-toast-header">
                    {{title}}
                </div>
                <div class="cux-toast-content" :class="{'has-icon': type}">
                    <div class="cux-icon" :data-type="type" v-if="type"></div>
                    <div class="cux-desc">{{desc}}</div>
                </div>
                <div class="cux-toast-footer">
                    <a href="javascript:;" @click="close" class="btn btn-close" v-if="mode == 'confirm'">{{closeBtnText}}</a>
                    <a href="javascript:;" @click="sure" class="btn btn-sure">{{sureBtnText}}</a>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import cover from '../cover/cover.vue';
export default {
    name: 'toast',
    data() {
        let _this = this;
        return {
            // 标题
            title: '',
            // 内容
            desc: '',
            // 类型 success|error|warning|message
            type: '',
            //模式 alert|confirm
            mode: 'alert',
            // 关闭的回调
            closeCall: null,
            // 确认的回调
            sureCall: null,
            // 关闭按钮文本， 为空则不显示
            closeBtnText: _this.$l('cux.messageBox.cancel'),
            // 确认按钮文本， 为空则不显示
            sureBtnText: _this.$l('cux.messageBox.sure'),
            closed: false,
            visible: false,
            index: 101,
            coverIndex: 100
        };
    },
    components: {
        cover
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                let _this = this;
                _this.visible = false;
                setTimeout(() => {
                    _this.$destroy(true);
                    _this.$el.parentNode.removeChild(this.$el);
                }, 300);
            }
        }
    },
    methods: {
        close() {
            let _this = this;
            _this.closed = true;
            if (typeof _this.closeCall === 'function') {
                _this.closeCall(_this);
            }
        },
        sure() {
            let _this = this;
            _this.closed = true;
            if (typeof _this.sureCall === 'function') {
                _this.sureCall(_this);
            }
        }
    }
};
</script>
<style lang="sass" scoped>
.cux-fade-up-enter-active {
    animation: cux-fade-up-in .3s
}

.cux-fade-up-leave-active {
    animation: cux-fade-up-out .3s
}

@keyframes cux-fade-up-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@keyframes cux-fade-up-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}

.cux-toast-body {
    position: fixed;
    left: 50%;
    top: 30%;
    width: 300px;
    margin-left: -150px;
    background: #FFFFFF;
    border-radius: 4px;
    color: #2D3859;
    .cux-close {
        width: 20px;
        height: 20px;
        background: url('./close.png') no-repeat center;
        background-size: contain;
        position: absolute;
        right: 20px;
        top: 15px;
    }
    .cux-toast-header {
        font-size: 16px;
        text-align: center;
        padding: 20px 0 0;
    }
    .cux-toast-content {
        padding: 20px 20px;
        position: relative;
        &.has-icon {
            .cux-desc {
                margin-left: 50px;
            }
        }
        .cux-icon {
            width: 34px;
            height: 34px;
            position: absolute;
            left: 20px;
            top: 50%;
            margin-top: -17px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 10px;
            &[data-type="success"] {
                background-image: url('./icon-success.png');
            }
            &[data-type="error"] {
                background-image: url('./icon-error.png');
            }
            &[data-type="warning"] {
                background-image: url('./icon-warning.png');
            }
            &[data-type="message"] {
                background-image: url('./icon-message.png');
            }
        }
        .cux-desc {
            font-size: 14px;
            line-height: 1.5;
            color: #4E5063;
        }
    }
    .cux-toast-footer {
        margin-top: 10px;
        display: flex;
        flex-flow: row;
        border-top: 1px solid #D8D8D8;
        &>a {
            flex: 1;
            font-size: 16px;
            color: #358AD6;
            height: 36px;
            text-align: center;
            text-decoration: none;
            line-height: 36px;
            &:nth-child(2) {
                border-left: 1px solid #D8D8D8;
            }
        }
    }
}
</style>
