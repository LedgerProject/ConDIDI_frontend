import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import User from "../views/user/Index";
import Events from "../views/user/events/Index";
import Settings from "../views/user/Settings";
import Profile from "../views/user/Profile";
import EventDetails from "../views/user/events/EventDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/signIn",
    name: "Sign In",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/SignIn.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/signUp",
    name: "Sign Up",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/SignUp.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/help",
    name: "Help",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Help.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/notificationNotice",
    name: "Notification Notice",
    component: () =>
      import(
        /* webpackChunkName: "notificationNotice" */ "../views/legal/NotificationNotice.vue"
      ),
    meta: {
      guest: true,
    },
  },
  {
    path: "/privacyPolicy",
    name: "Privacy Policy",
    component: () =>
      import(
        /* webpackChunkName: "privacyPolicy" */ "../views/legal/PrivacyPolicy.vue"
      ),
    meta: {
      guest: true,
    },
  },
  {
    path: "/termsOfService",
    name: "Terms of Service",
    component: () =>
      import(
        /* webpackChunkName: "termsOfService" */ "../views/legal/TermsOfService.vue"
      ),
    meta: {
      guest: true,
    },
  },
  {
    path: "/stories",
    name: "Stories",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Stories.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/user",
    name: "Dashboard",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/events",
    name: "Events",
    component: Events,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/events/:id",
    name: "Events",
    component: EventDetails,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('auth', store.getters.isSignedIn)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isSignedIn) {
      next();
      return;
    }
    next("/signIn");
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isSignedIn) {
      next("/user");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
