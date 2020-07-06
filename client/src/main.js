import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import ErrorFilter from "./common/error.filter";

Vue.config.productionTip = false;
Vue.filter("error", ErrorFilter);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
