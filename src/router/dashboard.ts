import { RouteRecordRaw } from "vue-router";
import Layout from "@/views/dashboard/layout.vue";

import Dashboard from "@/views/dashboard/dashboard.vue";
import Students from "@/views/dashboard/students/index.vue";
import Teachers from "@/views/dashboard/teachers/index.vue";
import Chats from "@/views/dashboard/chats.vue";

const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        name: "Dashboard",
      },
      {
        path: "/teachers",
        component: Teachers,
        name: "teachers",
      },
      {
        path: "/students",
        component: Students,
        name: "students",
      },
      {
        path: "/chats",
        component: Chats,
        name: "chats",
      },
    ],
  },
];

export default dashboardRoutes;
