import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import store from "./store/store";
import router from "./router/router";
import { authentication } from "../firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
onAuthStateChanged(authentication, (user) => {
  store.dispatch("setUser", user);
  new Vue({
    render: (h) => h(App),
    router,
    store,
  }).$mount("#app");
});
