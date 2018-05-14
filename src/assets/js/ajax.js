/**
 * desc: ajax promise模块
 * date: 2017-04-19
 * author: marvin
 **/

import Vue from 'vue';
import virtualComponent from 'virtualComponent';
import virtualRouter from 'virtualRouter';
import VueResource from 'vue-resource';
import {
    API_URL
} from './config';
Vue.use(VueResource);
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;

const ajaxp = function(url, method, data) {
    let initPar = {};
    initPar = Object.assign(initPar, data);
    let params = initPar;
    let promise = new Promise((resolve, reject) => {
        Vue.http.post(API_URL + url, params, {
            timeout: 6000,
        }).then(function(res) {
            let {
                data: { data, status }
            } = res;

            if (status.err_code == 6003) {
                virtualComponent.$message({
                    duration: 2000,
                    message: status.err_msg + ':' + data,
                    type: 'error'
                });
            }

            if (status.err_code == 6012) {
                virtualComponent.$message({
                    duration: 2000,
                    message: status.err_msg + ':' + data,
                    type: 'error'
                });
                setTimeout(() => {
                    virtualRouter.push('/login');
                }, 2000);
            } else {
                resolve(res.data);
            }
        }, function(err) {
            reject(err);
        }).catch(function(err) {
            console.log('ajax catch:');
            console.log(err);
        })
    });
    return promise;
}

export default ajaxp;
