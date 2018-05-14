import { mapGetters } from 'vuex'
import {
    API_URL
} from 'config'
import {
    toQueryString
} from 'util'

export default {
	data() {
		return {
			user_group_list: [],
            user_level_list: [],

            user_level: '',
            group_id: '',
            user_status: '',
            beg_date: '',
            end_date: '',
            total_in_low: '',
            total_in_max: '',
            total_out_low: '',
            total_out_max: '',
            total_money_low: '',
            total_money_max: '',
            withdrawable_money_low: '',
            withdrawable_money_max: '',
            total_bet_low: '',
            total_bet_max: '',
            profit_low: '',
            profit_max: '',
            last_login_ip: '',
            add_er: '',
            //是否展示更多搜索选项
            showMoreFilter: false,
            type: 'ID',
            con_input: '',
            list: [],
            page_size: 20,
            pagination: {
                current_page: 0,
                page_count: 0,
                page_size: 0,
                total_count: 0
            },
            filterData: {
                v1: '',
                v2: '',
                v3: '',
                v4: ''
            },
            ykFilterData: {
                v1: '',
                v2: '',
                v3: '',
                v4: ''
            }
		}
	},
    computed: {
        ...mapGetters([
            'getConfigList'
        ])
    },
    mounted() {
        this.user_group_list = this.getConfigList.user_group;
        this.user_level_list = this.getConfigList.user_level;

        this.getList(1);
    },
	methods: {
		search() {
            if (!this.validate()) return;
            this.getList(1);
        },
        validate() {
            let msg = '';
            if (typeof this.beg_date == 'object' && typeof this.end_date == 'object' && this.beg_date > this.end_date) {
                msg = '开始时间不能大于结束时间！';
            } else if (parseInt(this.total_in_low) > parseInt(this.total_in_max)) {
                msg = '最小金额不能大于最大金额！';
            } else if (parseInt(this.total_out_low) > parseInt(this.total_out_max)) {
                msg = '最小金额不能大于最大金额！';
            } else if (parseInt(this.total_money_low) > parseInt(this.total_money_max)) {
                msg = '最小金额不能大于最大金额！';
            } else if (parseInt(this.withdrawable_money_low) > parseInt(this.withdrawable_money_max)) {
                msg = '最小金额不能大于最大金额！';
            } else if (parseInt(this.total_bet_low) > parseInt(this.total_bet_max)) {
                msg = '最小金额不能大于最大金额！';
            } else if (parseInt(this.profit_low) > parseInt(this.profit_max)) {
                msg = '最小金额不能大于最大金额！';
            };

            if (msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确定'
                });
                return false;
            }
            return true;
        },
        clear() {
            this.con_input = '';
            this.user_level = '';
            this.group_id = '';
            this.user_status = '';
            this.beg_date = '';
            this.end_date = '';
            this.total_in_low = '';
            this.total_in_max = '';
            this.total_out_low = '';
            this.total_out_max = '';
            this.total_money_low = '';
            this.total_money_max = '';
            this.withdrawable_money_low = '';
            this.withdrawable_money_max = '';
            this.total_bet_low = '';
            this.total_bet_max = '';
            this.profit_low = '';
            this.profit_max = '';
            this.last_login_ip = '';
            this.filterData = {
                v1: '',
                v2: '',
                v3: '',
                v4: ''
            };
            this.ykFilterData = {
                v1: '',
                v2: '',
                v3: '',
                v4: ''
            };
        },
        //筛选条件
        handlefilter() {
            let obj = {};

            if (this.con_input !== '') {
                if (this.type === 'ID') {
                    obj.id = this.con_input;
                } else if (this.type === '用户名') {
                    obj.username = this.con_input;
                }
            }
            if (this.user_level !== '') {
                obj.user_level = this.user_level;
            }
            if (this.group_id !== '') {
                obj.group_id = this.group_id;
            }

            if (this.user_status !== '') {
                obj.user_status = this.user_status;
            }

            if (this.beg_date !== '') {
                obj.beg_date = parseInt(new Date(this.beg_date).getTime()/1000);
            }
            if (this.end_date !== '') {
                obj.end_date = parseInt(new Date(this.end_date).getTime()/1000);
            }
            if (this.total_in_low !== '') {
                obj.total_in_low = this.total_in_low;
            }
            if (this.total_in_max !== '') {
                obj.total_in_max = this.total_in_max;
            }
            if (this.total_out_low !== '') {
                obj.total_out_low = this.total_out_low;
            }
            if (this.total_out_max !== '') {
                obj.total_out_max = this.total_out_max;
            }
            if (this.total_money_low !== '') {
                obj.total_money_low = this.total_money_low;
            }

            if (this.total_money_max !== '') {
                obj.total_money_max = this.total_money_max;
            }
            if (this.withdrawable_money_low !== '') {
                obj.withdrawable_money_low = this.withdrawable_money_low;
            }
            if (this.withdrawable_money_max !== '') {
                obj.withdrawable_money_max = this.withdrawable_money_max;
            }
            if (this.total_bet_low !== '') {
                obj.bet_low = this.total_bet_low;
            }
            if (this.total_bet_max !== '') {
                obj.bet_max = this.total_bet_max;
            }

            if (this.profit_low !== '') {
                obj.wol_low = this.profit_low;
            }
            if (this.profit_max !== '') {
                obj.wol_max = this.profit_max;
            }
            if (this.last_login_ip !== '') {
                obj.last_login_ip = this.last_login_ip;
            }
            if (this.add_er !== '') {
                obj.last_update_user = this.add_er;
            }

            if (this.filterData.v1 !== '') {
                obj.bet_platform_id = this.filterData.v1;
            }
            if (this.filterData.v2 !== '') {
                obj.bet_sport_id = this.filterData.v2;
            }
            if (this.filterData.v3 !== '') {
                obj.bet_match_id = this.filterData.v3;
            }
            if (this.filterData.v4 !== '') {
                obj.bet_line_type_id = this.filterData.v4;
            }

            if (this.ykFilterData.v1 !== '') {
                obj.wol_platform_id = this.ykFilterData.v1;
            }
            if (this.ykFilterData.v2 !== '') {
                obj.wol_sport_id = this.ykFilterData.v2;
            }
            if (this.ykFilterData.v3 !== '') {
                obj.wol_match_id = this.ykFilterData.v3;
            }
            if (this.ykFilterData.v4 !== '') {
                obj.wol_line_type_id = this.ykFilterData.v4;
            }

            return obj;
        },
        //导出excel
        download(type) {
            if (!this.validate()) return;
            let data = this.handlefilter();
            if (type == 2) {
                data.is_follow = 2;
            } else if (type == 3) {
                data.is_vip = 2;
            }
            console.log(data)
            let queryStr = toQueryString(data);
            window.open(API_URL + 'user/excel?' + queryStr);
        },
	}

}