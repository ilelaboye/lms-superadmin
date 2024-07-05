import { RouteRecordRaw } from "vue-router";
import Login from "@/views/public/login.vue";
import Fpassword from "@/views/public/forgotPassword.vue";
import Vcode from "@/views/public/verifyCode.vue";
import Rpass from "@/views/public/resetPassword.vue";

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Login,
    name: "Login",
  },
  {
    path: "/fpassword",
    component: Fpassword,
    name: "Fpassword",
  },
  {
    path: "/vcode",
    component: Vcode,
    name: "Vcode",
  },
  {
    path: "/rpass",
    component: Rpass,
    name: "Rpass",
  },
];

export default publicRoutes;
