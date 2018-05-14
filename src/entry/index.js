// import 'babel-polyfill';
import Vue from 'vue';
import 'global.scss';
import App from '../pages/app';
import router from '../routers/indexRouter';
import store from '../vuex';

// import component
import CuxHeader from '../components/header'
import CuxArea from '../components/area'
import CuxPullRefreshI from '../components/pull-refresh-iscroll'
import CuxPullRefreshX from '../components/pull-refresh-xscroll'
import CuxPullRefreshN from '../components/pull-refresh-nscroll'
import CuxRadio from '../components/radio'
import CuxCheckbox from '../components/checkbox'
import CuxSelect from '../components/select'
import CuxSelectScroll from '../components/select-scroll'
import CuxDateTime from '../components/datetime'
import CuxDialog from '../components/dialog'
import CuxRange from '../components/range'
import FocusRipple from '../components/internal/focusRipple'
import CuxAddressBook from '../components/address-book'
import CuxSwiper from '../components/swiper'
import CuxLoading from '../components/loading'
import CuxPreviewer from '../components/previewer'
import CuxQrcode from '../components/qrcode'
import CuxQq from '../components/qq'
import CuxTab from '../components/tab'
import CuxMarquee from '../components/marquee'
import CuxDragSort from '../components/drag-sort'
import CuxUploadImg from '../components/uploadImg'

// import plug
import language from '../plugs/language/';
import messageBox from '../plugs/messageBox/';
import emit from '../plugs/emit/';

const components = [
    CuxHeader,
    CuxArea,
    CuxPullRefreshI,
    CuxPullRefreshX,
    CuxPullRefreshN,
    CuxRadio,
    CuxCheckbox,
    CuxSelect,
    CuxSelectScroll,
    CuxDateTime,
    CuxDialog,
    CuxRange,
    FocusRipple,
    CuxAddressBook,
    CuxSwiper,
    CuxLoading,
    CuxPreviewer,
    CuxQrcode,
    CuxQq,
    CuxTab,
    CuxMarquee,
    CuxDragSort,
    CuxUploadImg
];

// 注册全局组件
components.forEach((component) => {
    Vue.component(component.name, component);
});

// 注册全局messageBox插件
Vue.use(messageBox);
// 注册全局emit插件
Vue.use(emit);
// 注册全局language插件
let lang = require('../lib/languages/en');
Vue.use(language, {
    locale: lang.default
});

// const FastClick = require('fastclick');
// FastClick.attach(document.body);

const app = new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
