import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from './stores/authStore'
import { createPinia } from 'pinia'
import piniaPersistedstate from "pinia-plugin-persistedstate"

const app = createApp(App)
const pinia = createPinia(piniaPersistedstate)
app.use(router)
app.use(pinia)

const site_key = import.meta.env.VITE_RECAPTCHA_SITE_KEY
app.use(VueReCaptcha, {
  siteKey: site_key, // replace with actual key
  loaderOptions: {
    autoHideBadge: true,
  }
});


const authStore = useAuthStore();
// const initializeApp = async () => {
//   const authStore = useAuthStore();
//   app.mount("#app"); 
//   await authStore.fetchUserType();
  
// };

// initializeApp();

authStore.fetchUserType().finally(() => {
  app.mount('#app')
})
