import { createRouter, createWebHistory } from "vue-router";
import {getAuth} from "firebase/auth";


const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main" },
    component: () => import("@/views/Categories.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main" },
    component: () => import("@/views/Detail.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main" },
    component: () => import("@/views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main" },
    component: () => import("@/views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main" },
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main" },
    component: () => import("@/views/Record.vue"),
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  const auth = getAuth();
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some((record) => record.meta.layout === "main");

  if (requiresAuth && !currentUser) {
    next('/login')
  }else{
    next()
  }
})

router.beforeEach((to,from,next)=>{
  const auth = getAuth();
  const currentUser = auth.currentUser
  const emptyLayoutPage = to.matched.some((record) => record.meta.layout === "empty");

  if (emptyLayoutPage && currentUser) {
    next('/')
  }else{
    next()
  }
})

export default router;
