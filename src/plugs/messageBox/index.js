import manage from '../manage';
let messageBox = {};
messageBox.install = function(Vue, options) {
    let msgBox = function(opts) {
        let constructor = Vue.extend(require('./messageBox.vue'));
        // 创建msgBox实例
        let instance = new constructor({
            data: opts
        });
        // 手动挂载
        let msgBox = instance.$mount();
        let $el = msgBox.$el;
        document.body.appendChild($el);
        msgBox.visible = true;
        msgBox.coverIndex = manage.getIndex();
        msgBox.index = manage.getIndex();
    };

    msgBox.alert = function(opts) {
        opts.mode = 'alert';
        return msgBox(opts);
    };

    msgBox.confirm = function(opts) {
        opts.mode = 'confirm';
        return msgBox(opts);
    };
    Vue.prototype.$messageBox = msgBox;
    Vue.prototype.$alert = msgBox.alert;
    Vue.prototype.$confirm = msgBox.confirm;
};

export default messageBox;
