import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/auth/login.vue"
import RegisterSeller from "../views/auth/ResgisterSeller.vue"
import MagicLogin  from "../views/auth/MagicLogin.vue"

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
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
