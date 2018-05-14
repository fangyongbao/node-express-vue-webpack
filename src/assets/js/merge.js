const merge = {
    //浅拷贝
    copy(source) {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments');
        }
        var targetObj = source.constructor === Array ? [] : {};
        for (var keys in source) {
            if (source.hasOwnProperty(keys)) {
                targetObj[keys] = source[keys];
            }
        }
        return targetObj;
    },

    //深拷贝
    deepCopy(source) {
        var _this = this;
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'shallowClone');
        }
        var targetObj = source.constructor === Array ? [] : {};
        for (var keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = _this.deepCopy(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    },

    // 利用JSON.stringify实现深拷贝
    deepCopy2(source) {
        var str = JSON.stringify(source);
        return JSON.parse(str);
    },

    //获取某个数组中包含另外数组元素的个数
    getArrCotainNum(targetArr, arr) {
        let num = 0;
        for (let i = 0; i < targetArr.length; i++) {
            if (arr.indexOf(targetArr[i]) > -1) {
                num++;
            }
        }
        return num;
    },

    //将数组元素合并到另一个数组
    mergeArr(targetArr, arr) {
        for (let i = 0; i < targetArr.length; i++) {
            if (arr.indexOf(targetArr[i]) == -1) {
                arr.push(targetArr[i]);
            }
        }
    },

    //从数组中去除包含另的另一个数组的元素
    rmArrEl(targetArr, arr) {
        for (let i = 0; i < targetArr.length; i++) {
            let $i = arr.indexOf(targetArr[i]);
            if ($i > -1) {
                arr.splice($i, 1);
            }
        }
    }

};

export default merge;
