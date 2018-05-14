<template>
    <div id="app" class="g-body">
        <div class="g-main">
            <transition :name="fade">
                <router-view></router-view>
            </transition>
            <cux-loading></cux-loading>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            isLoading: false,
            viewAnimate: ''
        }
    },
    computed: mapGetters({
        direction: 'getDirection'
    }),
    methods: {
        ...mapActions([
            'setLoadStatus',
        ])
    },
    watch: {
        '$route': function(val, oldVal) {
            this.setLoadStatus({
                msg: '加载中...',
                isShow: true
            })
            setTimeout(() => {
                this.setLoadStatus({
                    msg: '',
                    isShow: false
                })
            }, 400)
        }
    },
    created() {
    }
}
</script>
<style lang="sass">
html,
body {
    height: 100%;
}

.g-body {
    height: 100%;
    position: relative;
    overflow: hidden;
    .g-main {
        height: 100%;
        .view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #EEF1F4;
            padding-top: 0.88rem;
        }
    }
}
</style>
