<script setup>
import MobileBottomBar from './MobileBottomBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeTab = ref('home')
const currentPage = ref('home')
const cartCount = ref(0)
const isAuthenticated = ref(false)
const isSeller = ref(false)


const router = useRouter();

const props = defineProps({
       activeTabProp: {
        type: String,
        required: true
       }
})

const handleNavigation = (tab) => {
  
  // Update active tab
  activeTab.value = tab
  currentPage.value = tab
  
  // Here you would typically use Vue Router
  // Example with Vue Router:
  // router.push({ name: tab })
  
  // Or handle specific navigation logic
  switch(tab) {
    case 'home':
        router.push('/')
      break
    case 'sell':
       router.push("/auth/register")
      break
    case 'cart':
      // Navigate to cart page
      break
    case 'profile':
      // Navigate to profile page
      break
    case 'dashboard':
      // Navigate to seller dashboard
      break
    case 'account':
      router.push("/user/account")
      break
    default:
      console.log('Unknown navigation target:', tab)
  }


}

const handleLogout = () => {

  isAuthenticated.value = false
  isSeller.value = false
  activeTab.value = 'home'
  currentPage.value = 'home'
}
</script>


<template>
   <MobileBottomBar
      :active-tab="activeTabProp"
      :cart-count="cartCount"
      :is-authenticated="isAuthenticated"
      :is-seller="isSeller"
      @navigate="handleNavigation"
      @logout="handleLogout"
    />
</template>