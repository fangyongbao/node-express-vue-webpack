let emit = {};
emit.install = function(Vue, options) {
    /**
     * desc: 向所有子/孙组件广播事件, 子组件需要通过  _this.$on('eventName', (res) => {}) 注册监听
     * date: 2017-06-01
     * author: marvin
     * @param {string} eventName 事件名称
     * @param {string|Object|Array} params 事件参数
     * @param {number} $vue 当前组件实例
     * @return {string} '' 返回空
     **/
    Vue.prototype.$broadcast = (eventName, params, $vue) => {
        params = params ? params : '';
        let childs = $vue.$children;
        //遍历所有一级子组件
        for (let child of childs) {
            let args = [eventName, params];
            // 在每个子组件上均触发指定的事件
            child.$emit.apply(child, args);
            // child.$emit(eventName, params);
            // 若子组件有子集, 继续广播
            if (child.$children.length) {
                let args = [eventName, params, child];
                child.$broadcast.apply(child, args);
            }
        }
        return '';
    };

    /**
     * desc: 向所有父组件派发事件, 父组件需要通过  _this.$on('eventName', (res) => {}) 注册监听
     * date: 2017-06-01
     * author: marvin
     * @param {string} eventName 事件名称
     * @param {string|Object|Array} params 事件参数
     * @param {number} $vue 当前组件实例
     * @return {string} '' 返回空
     **/
    Vue.prototype.$dispatch = (eventName, params, $vue) => {
        console.log($vue);
        params = params ? params : '';
        let parent = $vue.$parent;
        while (parent) {
            let args = [eventName, params];
            // 在每个父组件上均触发指定的事件
            parent.$emit.apply(parent, args);
            parent = parent.$parent;
        }
        return '';
    };
}

export default emit;
