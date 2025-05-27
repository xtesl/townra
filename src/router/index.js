import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/auth/login.vue"
import RegisterSeller from "../views/auth/ResgisterSeller.vue"
import MagicLogin  from "../views/auth/MagicLogin.vue"
import StartSelling from "../views/auth/StartSelling.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login
  }, {

    path: "/auth/register",
    name: "register-seller",
    component: RegisterSeller
  },

  {
    path: "/auth/magic-login",
    name: "magic-login",
    component: MagicLogin
  },

  {
    path: "/auth/register",
    name: "register-seller",  
    component: StartSelling
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
