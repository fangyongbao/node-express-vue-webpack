import * as types from './mutation-types'

// 设置城市联动状态
export const setAreaStatus = ({ commit, state }, areaStatus) => {
  commit(types.SET_AREA_STATUS, { areaStatus })
}

// 设置视图切换方向
export const setDirection = ({ commit, state }, direction) => {
  commit(types.SET_DIRECTION, { direction })
}

// loading
export const setLoadStatus = ({ commit, state }, loadInfo) => {
    commit(types.SET_LOAD_STATUS, loadInfo )
}

// pop
export const setPop = ({ commit, state }, popInfo) => {
    commit(types.SET_POP, popInfo )
}
