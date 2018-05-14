<template>
    <transition name="fade">
        <div class="pop f-poc" v-show="pop.isShow">
            {{pop.msg}}
        </div>
    </transition>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'CuxPop',
    computed: {
        ...mapGetters({
            pop: 'getPop'
        })
    },
    methods: {
        ...mapActions([
            'setPop'
        ])
    },
    mounted: function() {},
    watch: {
        pop: function(val, oldVal) {
            if (val.isShow) {
                setTimeout(() => {
                    this.setPop({
                        msg: this.pop.msg,
                        showAlert: false
                    })
                }, 2000)
            }
        }
    }
}
</script>
<style lang="sass" scoped>
.pop {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.06rem;
    max-width: 2.25rem;
    padding: 0.13rem;
    font-size: 0.13rem;
    color: white;
    text-align: center;
    z-index: 10000;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.fade-enter {
    opacity: 0;
}

.fade-leave {
    opacity: 1;
}

.fade-enter-active {
    transition: opacity 0.5s;
    -webkit-transition: opacity 0.5s;
}

.fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
    -webkit-transition: opacity 0.5s;
}
</style>
