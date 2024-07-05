import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import publicRoutes from "./public";
import dashboardRoutes from "./dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [...publicRoutes],
  
  },
  {
    path: "/",
    children: [...dashboardRoutes],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
