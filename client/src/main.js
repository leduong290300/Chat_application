import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import store from "./store/store";
import router from "./router/router";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
