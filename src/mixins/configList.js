import {
    getGroup,
    getUserStatus,
    getUserGroupStatus,
    getCouponType,
    getRiskStatus,
    getRiskType
} from 'actions';
export default {
    methods: {
        getGroup(groupId) {
            let _this = this;
            return getGroup(_this.$store, groupId);
        },
        getUserStatus(id) {
            let _this = this;
            return getUserStatus(_this.$store, id);
        },
        getUserGroupStatus(id) {
            let _this = this;
            return getUserGroupStatus(_this.$store, id);
        },
        getCouponType(id) {
            let _this = this;
            return getCouponType(_this.$store, id);
        },
        getRiskStatus(id) {
            let _this = this;
            return getRiskStatus(_this.$store, id);
        },
        getRiskType(id) {
            let _this = this;
            return getRiskType(_this.$store, id);
        }
    }
}
