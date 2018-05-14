import ajaxp from 'ajaxp';
import time from 'time';
import url2 from 'url2';
import merge from 'merge';
import {
    API_URL
} from 'config';
import fourFilter from 'fourFilter';
import configList from './configList.js';
import {
    getChuanById
}
from 'bet';
import { mapGetters } from 'vuex';
export default {
    name: 'platformLinkage',
    data() {
        return {
            //项目列表
            sportList: [],
            //分组列表
            groupList: [],
            //玩法列表
            bettypeList: [],
            toggle: false,
            //是否展示更多搜索选项
            showMoreFilter: false,
            filter: {
                start_time: '',
                end_time: '',
                duri_type: '3',
                money_min: '',
                money_max: '',
                win_lost: '',
                // 平台
                platform_id: '',
                // 项目
                sport: '',
                // 分组
                game: '',
                // 玩法
                type: ''
            },
            filterFour: {
                // 平台
                v1: '',
                // 项目
                v2: '',
                // 分组
                v3: '',
                // 玩法
                v4: ''
            },
            total_money: '',
            win_or_lost: '',
            large_num: '',
            large_money: '',
            list: [],
            page_current: 1,
            page_size: 10,
            pagination: {
                current_page: 0,
                page_count: 0,
                page_size: 0,
                total_count: 0
            }
        }
    },
    components: {
        fourFilter
    },
    mixins: [configList],
    computed: {
        ...mapGetters({
            configList: 'getConfigList'
        })
    },
    methods: {
        search() {
            let _this = this;
            _this.page_current = 1;
            _this.getList(1);
        },
        // 联动数据同步
        filtersync() {
            let _this = this;
            _this.filter.platform_id = _this.filterFour.v1;
            _this.filter.sport = _this.filterFour.v2;
            _this.filter.game = _this.filterFour.v3;
            _this.filter.type = _this.filterFour.v4;
        },
        filterData(data) {
            for (let key in data) {
                if (data[key] == '') {
                    delete data[key];
                }
            }
            return data;
        },
        resetFilter() {
            let _this = this;
            _this.filter = {
                start_time: '',
                end_time: '',
                duri_type: '3',
                money_min: '',
                money_max: '',
                win_lost: '',
                // 平台
                platform_id: '',
                // 项目
                sport: '',
                // 分组
                game: '',
                // 玩法
                type: ''
            };
            _this.filterFour = {
                // 平台
                v1: '',
                // 项目
                v2: '',
                // 分组
                v3: '',
                // 玩法
                v4: ''
            }
        },
        filterDataChange() {
            let _this = this;
            _this.filter.duri_type = '';
        },
        filterDuration(id) {
            let _this = this;
            _this.filter.start_time = '';
            _this.filter.end_time = '';
            _this.filter.duri_type = id;
        },
        resizeDate() {
            let _this = this;
            if (typeof _this.filter.start_time === 'object') {
                _this.filter.start_time = time.formatTime(_this.filter.start_time, 1);
            }
            if (typeof _this.filter.end_time === 'object') {
                _this.filter.end_time = time.formatTime(_this.filter.end_time, 1);
            }
        },
        resizeList() {
            let _this = this;
            _this.list.map((item) => {
                item.cgStatus = false;
            });
        },
        //展开、收起更多搜索选项
        toggleCg(key) {
            let _this = this;
            let s = _this.list[key].cgStatus;
            _this.list[key].cgStatus = !s;
            _this.toggle = !_this.toggle;
        },
        //展开、收起更多搜索选项
        toggleFilter() {
            this.showMoreFilter = !this.showMoreFilter;
        },
        // 备注
        note(key, orderId, note) {
            let _this = this;
            _this.$prompt('请输入', '备注', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: note,
                inputPlaceholder: '请输入',
                inputPattern: /\S/,
                inputErrorMessage: '备注不能为空'
            }).then(({
                value
            }) => {
                let d = {
                    order_id: orderId,
                    note: value
                };
                ajaxp('order/note', 'post', d).then((res) => {
                    let {
                        data,
                        status
                    } = res;
                    if (status.err_code == 0) {
                        _this.list[key].note = value;
                        _this.$message({
                            duration: 1000,
                            message: '修改成功！',
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            duration: 1000,
                            message: status.err_msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err) {
                    console.log('ajax catch:');
                    console.log(err.message);
                });
            }).catch(() => {});
        },
        getList(page) {
            let _this = this;
            _this.filtersync();
            _this.resizeDate();
            let data = {
                // 代表已结算
                order_type: _this.order_type,
                page: page,
                page_size: _this.page_size,
            };
            data = _this.filterData(Object.assign(data, _this.filter));
            // console.log('filter date:');
            // console.log(data);
            ajaxp('order/list', 'post', data).then((res) => {
                let {
                    data,
                    status
                } = res;
                if (status.err_code == 0) {
                    let {
                        list,
                        pagination,
                        total_money,
                        win_or_lost,
                        large_num,
                        large_money
                    } = data;
                    _this.list = list;
                    _this.pagination = pagination;
                    _this.total_money = total_money;
                    _this.win_or_lost = win_or_lost;
                    _this.large_num = large_num;
                    _this.large_money = large_money;
                    _this.resizeList();
                } else {
                    _this.$message({
                        duration: 1000,
                        message: status.err_msg + ':' + data,
                        type: 'error'
                    });
                }
            }).catch(function(err) {
                console.log('ajax catch:');
                console.log(err.message);
            });
        },
        checkFilter() {
            let _this = this;
            let notice = '';
            if (!_this.filter.start_time) {
                notice = '请选择开始时间';
            } else if (!_this.filter.end_time) {
                notice = '请选择结束时间';
            } else if ((_this.filter.end_time - _this.filter.start_time > 30 * 24 * 60 * 60 * 1000) || _this.filter.duri_type > 3) {
                notice = '最多可导出30天的数据';
            }
            return notice;
        },
        exportExcel() {
            let _this = this;
            let notice = _this.checkFilter();
            if (notice) {
                _this.$message({
                    duration: 1000,
                    message: notice,
                    type: 'warning'
                });
            } else {
                _this.filtersync();
                _this.resizeDate();
                let data = merge.deepCopy(_this.filter);
                data.order_type = _this.order_type;
                let queryStr = url2.toQueryString(_this.filterData(data));
                window.open(API_URL + 'order/export?' + queryStr, '_blank');
            }
        },
        sizeChange(size) {
            let _this = this;
            _this.page_size = size;
            _this.getList(1);
        },
        pageChange(page) {
            let _this = this;
            _this.getList(page);
        },
        goAnalyse(item, type) {
            this.$router.push({
                path: '/bet/' + type + '/betAnalyse',
                query: {
                    platform_id: item.platform_id,
                    match_id: item.match_id,
                    line_type_id: item.line_type_id,
                    is_live: item.is_live,

                    your_bet: item.your_bet,
                    point: item.point,
                    home_score: item.home_score,
                    away_score: item.away_score,
                    line_type_name: item.line_type_name,
                    home_team: item.home_team,
                    away_team: item.away_team,
                    sport_name: item.sport_name,
                    league_name: item.league_name,
                    odds: item.odds,
                    bet_id: item.bet_id,
                    risk_level: item.risk_level
                }
            })
        }
    },
    beforeMount() {
        let _this = this;
        _this.getChuanById = getChuanById;
    },
    mounted() {
        let _this = this;
        _this.getList(1);
    }
}
