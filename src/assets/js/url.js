const url = {
    toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return `${key}=${value}`;
    },
    // object转url查询参数
    toQueryString(obj) {
        let _this = this;
        let ret = [];
        for (let key in obj) {
            let value = obj[key];
            ret.push(_this.toQueryPair(key, value));
        }
        // return encodeURIComponent(ret.join('&'));
        return ret.join('&');
    }
}
export default url;
