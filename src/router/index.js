import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/Home.vue"),
    meta: { disableLoader: true }
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
    meta: { disableLoader: true }
  }, {

    path: "/auth/start-selling",
    name: "start-selling",
    component: () => import("../views/auth/StartSelling.vue")
  },

  {
    path: "/auth/magic-login",
    name: "magic-login",
    component: () => import("../views/auth/MagicLogin.vue")
  },

  {
    path: "/auth/register",
    name: "register-seller",  
    component: () => import("../views/auth/ResgisterSeller.vue"),
    meta: { disableLoader: true }
  },
  {
    path: "/user/profile",
    name: "profile",
    component: () => import("../views/user/Profile.vue"),
    // meta: { requiresAuth: true, disableLoader: true }
  },
  {

    path: "/user/dashboard",
    name: "Dashboard",
    component: () => import("../views/user/Dashboard.vue")
  },
   {

    path: "/user/account",
    name: "account",
    component: () => import("../views/user/Account.vue")
  }
   


]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
   scrollBehavior(to, from, savedPosition) {
        // Check if there's a saved position (e.g., from browser history)
        if (savedPosition) {
          return savedPosition;
        }
    
        // Determine scroll position based on the route or some condition
        if(to.hash){
          return {
            el: to.hash,
            behavior: 'smooth',
          };
        }
    
        // Scroll to the top by default
        return { top: 0 };
      },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    const unwatch = authStore.$subscribe(() => {
      unwatch()
      proceed()
    })
  } else {
    proceed()
  }

  function proceed() {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
});


export default router
