import Vue from 'vue'
import VueHead from 'vue-head'

import App from './App.vue'
import store from './store'

import BootstrapVue from 'bootstrap-vue';

import './assets/sass/main.scss'

Vue.use(BootstrapVue);
Vue.use(VueHead);

Vue.config.productionTip = false;

new Vue({
    store,
    render: function (h) { return h(App) }
}).$mount('#app')