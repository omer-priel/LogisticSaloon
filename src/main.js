import Vue from 'vue';
import VueHead from 'vue-head';

import Bootstrap from 'bootstrap/dist/js/bootstrap.min';
import BootstrapVue from 'bootstrap-vue';

require("./js/here/mapsjs-core.js");
require("./js/here/mapsjs-data.js");
require("./js/here/mapsjs-service.js");
require("./js/here/mapsjs-ui.js");
require("./js/here/mapsjs-mapevents.js");

import App from './App.vue';
import store from './store';

import './assets/sass/main.scss';

Vue.use(BootstrapVue);
Vue.use(VueHead);

Vue.config.productionTip = false;

new Vue({
    el: 'body',
    store,
    render: function (h) { return h(App) }
});