/**
 * @des: 设置pop状态和文字
 * @author maicon
 * @date 2017/03/27
 */

import * as types from '../mutation-types'

const state = {
        info: {
                msg: '',
                isShow: false
        }
}
const mutations = {
        [types.SET_POP](state, popInfo) {
                state.info = popInfo
        }
}

export default {
        state,
        mutations
}
