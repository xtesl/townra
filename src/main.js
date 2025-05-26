import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)
app.use(router)
const site_key = import.meta.env.VITE_RECAPTCHA_SITE_KEY
app.use(VueReCaptcha, {
  siteKey: site_key, // replace with actual key
  loaderOptions: {
    autoHideBadge: true,
  }
})

app.mount('#app')
