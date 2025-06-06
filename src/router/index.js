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
    meta: { requiresAuth: true}
  },
  {

    path: "/user/dashboard",
    name: "Dashboard",
    component: () => import("../views/user/Dashboard.vue"),
    meta: { requiresAuth: true }
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await new Promise((resolve) => {
      const unwatch = authStore.$subscribe(() => {
        if (authStore.isInitialized) {
          unwatch()
          resolve()
        }
      })
    })
  }
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log(authStore.isAuthenticated)
    next({ name: 'login' })
  } else {
    next()
  }
});


export default router
