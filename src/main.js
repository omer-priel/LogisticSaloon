import Vue from 'vue';
import VueHead from 'vue-head';

require("./js/here/mapsjs-core.js");
require("./js/here/mapsjs-data.js");
require("./js/here/mapsjs-service.js");
require("./js/here/mapsjs-ui.js");
require("./js/here/mapsjs-mapevents.js");

import App from './App.vue';
import store from './store';
import router from "./router";
import BootstrapVue from 'bootstrap-vue';

import './assets/sass/main.scss';

Vue.use(BootstrapVue);
Vue.use(VueHead);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: function (h) { return h(App) }
}).$mount('#app')