let locale = {};
let language = {};
language.install = function(Vue, options) {
    if (options.locale) {
        locale = options.locale;
    }
    Vue.prototype.$l = (path) => {
        const array = path.split('.');
        let current = locale;
        // console.log(current);
        for (let i = 0, j = array.length; i < j; i++) {
            const property = array[i];
            const value = current[property];
            if (!value) return '';
            current = value;
        }
        return current;
    };
}

export default language;
