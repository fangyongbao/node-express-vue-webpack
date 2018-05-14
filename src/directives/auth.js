/*
 * desc:    v-auth 指令实现权限控制
 * date:    2017/06/30
 * author:  marvin
 */

import localStorage from 'localStorage';
let auth = {};
auth.install = function(Vue, options) {
    Vue.directive('auth', {
        // 绑定到元素时调用
        bind: function(el, binding) {

        },
        // 被绑定元素插入到父节点时调用
        inserted: function(el, binding) {
            let authList = localStorage.getObject('userInfo').auth_nodes;
            if (authList.indexOf(parseInt(binding.value)) == -1) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        },
        // 被绑定元素所在的模版更新时调用
        update: function(el, binding) {
            let authList = localStorage.getObject('userInfo').auth_nodes;
            if (authList.indexOf(parseInt(binding.value)) == -1) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        }
    });
}

export default auth;
