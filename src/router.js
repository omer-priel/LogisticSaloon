import Vue from "vue";
import VueRouter from "vue-router";

import cards from "./components/Cards.vue";
import charts from "./components/Charts.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { 
        path: "/cards", 
        name: "cards",
        component: cards
     },
    { 
        path: "/charts",
        name: "charts", 
        component: charts 
    }
  ]
});
