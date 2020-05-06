import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   redirect: () => import("../vivews/login.vue")
  // },
  {
    path: "/",
    // name: "index",
    component: () => import("../vivews/index.vue"),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        component: () => import("../vivews/home.vue")
      },
      {
        path: '/me',
        name: 'me',
        component: () => import("../vivews/me.vue")
      },
      {
        path: '/order',
        name: 'order',
        component: () => import("../vivews/order.vue")
      },
      {
        path: '/address',
        name: 'address',
        component: () => import("../vivews/address.vue")
      },
      {
        path: '/city',
        name: 'city',
        component: () => import("../vivews/city.vue")
      }

    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../vivews/login.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../vivews/search.vue")
  },
  {
    path: "/shop",
    name: "shop",
    redirect:"/goods",
    component: () => import("../vivews/shops/shops"),
    children:[
      {
        path: "/goods",
        name: "goods",
        component: () => import("../vivews/shops/goods")
      },
      {
        path: "/seller",
        name: "seller",
        component: () => import("../vivews/shops/seller")
      },
      {
        path: "/commit",
        name: "commit",
        component: () => import("../vivews/shops/commit")
      },
    ]
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  linkActiveClass:'active',
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const silogin = localStorage.ele_login ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    silogin ? next() : next("/login")
  }
});
export default router;
