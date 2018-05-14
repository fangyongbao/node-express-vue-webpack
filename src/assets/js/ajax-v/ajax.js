import Vue from 'vue';
import VueResource from 'vue-resource'
import {
    STATIC_RUL
} from '../config'
import { sign } from './sign'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;

const Ajax = function(url, method, data, beforeSend, success, error) {
    let initPar = {
        timestamp: parseInt(new Date().getTime() / 1000),
        login_id: '',
        user_id: '',
        platform: 'ios',
        versionNum: '2.94',
        form: '',
        iostype: '',
        idfa: ''
    };
    initPar = Object.assign(initPar, data);
    if (sign.setSign(initPar)) {
        sendRequest();
    } else {
        sign.getData(function() {
            sendRequest();
        })
    }

    function sendRequest() {
        let params = {
            "data": JSON.stringify(initPar),
            "sign": sign.setSign(initPar)
        };
        Vue.http.post(STATIC_RUL + url, params, {
            timeout: 6000,
            before: function() {
                beforeSend();
            }
        }).then(function(d) {
            success(JSON.parse(d.data));
        }, function(d) {
            error(d);
        }).catch(function(d) {
            console.log('ajax catch:');
            console.log(d);
        })
    }
}

export {
    Ajax
};
