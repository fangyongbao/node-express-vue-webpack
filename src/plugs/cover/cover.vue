<template>
    <transition name="cux-fade">
        <div class="m-cover" v-if="visible" :style="{zIndex: index}"></div>
    </transition>
</template>
<script>
export default {
    name: 'cover',
    props: {
        index: {
            type: Number,
            default: 101
        },
        visible: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style lang="sass" scoped>
.cux-fade-enter {
    animation: cux-fade-in .2s ease;
}

.cux-fade-leave {
    animation: cux-fade-out .2s ease forwards;
}

@keyframes cux-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes cux-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.cux-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}
</style>
