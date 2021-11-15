import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { authentication } from "../../firebase/config";
import FormLogin from "../views/FormLogin.vue";
import FormRegister from "../views/FormRegister.vue";
import Form from "../components/Form.vue";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/login",
    component: Form,
    children: [
      {
        path: "",
        name: "FormLogin",
        component: FormLogin,
      },
      {
        path: "/register",
        name: "FormRegister",
        component: FormRegister,
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!authentication.currentUser) {
        next("/login");
      } else {
        next();
      }
    },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
