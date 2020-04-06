import Vue from 'vue';
import axios from "axios";

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

Vue.config.productionTip = false;

let app = new Vue({
    store,
    render: function (h) { return h(App) }
});

axios.post("http://localhost/events").then(function(res) {
    store.state.eventTypes = res.data.eventTypes;
    store.state.eventsData = res.data.events;
    app.$mount("body");
});