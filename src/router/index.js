import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/auth/login.vue"
import RegisterSeller from "../views/auth/ResgisterSeller.vue"
import MagicLogin  from "../views/auth/MagicLogin.vue"
import StartSelling from "../views/auth/StartSelling.vue"
import TestProductTour from "../views/TestProductTour.vue"
import Profile from '../views/user/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
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
  },

  {
    path: "/tour",
    name: "tour",
    component: TestProductTour
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta?.requiresLoader && to.path !== from.path) {
//     const { showLoader } = useGlobalLoader()
//     const message = to.meta.loaderMessage || 'Loading page...'
//     showLoader(message)
//   }
//   next()
// })

// router.afterEach(() => {
//   const { hideLoader } = useGlobalLoader()
//   // Small delay to ensure content is loaded
//   setTimeout(() => {
//     hideLoader()
//   }, 500)
// })

export default router
