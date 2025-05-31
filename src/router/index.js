import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/auth/login.vue"
import RegisterSeller from "../views/auth/ResgisterSeller.vue"
import MagicLogin  from "../views/auth/MagicLogin.vue"
import StartSelling from "../views/auth/StartSelling.vue"
import TestProductTour from "../views/TestProductTour.vue"
import Profile from '../views/user/Profile.vue'
import { useAuthStore } from '../stores'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { disableLoader: true }
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
    meta: { disableLoader: true }
  }, {

    path: "/auth/start-selling",
    name: "start-selling",
    component: StartSelling
  },

  {
    path: "/auth/magic-login",
    name: "magic-login",
    component: MagicLogin
  },

  {
    path: "/auth/register",
    name: "register-seller",  
    component: RegisterSeller, 
    meta: { disableLoader: true }
  },
  {
    path: "/user/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true, disableLoader: true }
  },

  {
    path: "/tour",
    name: "tour",
    component: TestProductTour
  },
   


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
  try {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: "home" });
    } else {
      next();
    }
  } catch (error) {
    next(); 
  }
});

export default router
