<template>
  <!-- Mobile Bottom Navigation Bar -->
  <div class="md:hidden fixed bottom-0 left-0 right-0 z-50">
    <div class="bg-white border-t border-gray-200 px-4 py-1 shadow-lg">
      
      <!-- For Unauthenticated Users -->
      <div v-if="!isAuthenticated" class="flex items-center justify-around">
        
        <!-- Home -->
        <button @click="navigateTo('home')" :class="buttonClass('home')">
          <i class="pi pi-home text-xl mb-1"></i>
          <span class="text-xs font-medium">Home</span>
        </button>

        <!-- Sell -->
        <button @click="navigateTo('sell')" :class="buttonClass('sell')">
          <i class="pi pi-plus text-xl mb-1"></i>
          <span class="text-xs font-medium">Sell</span>
        </button>

        <!-- Account -->
        <button @click="navigateTo('account')" :class="buttonClass('account')">
          <i class="pi pi-user text-xl mb-1"></i>
          <span class="text-xs font-medium">Account</span>
        </button>

        <!-- Cart -->
        <button @click="navigateTo('cart')" :class="buttonClass('cart')">
          <div class="relative mb-1">
            <i class="pi pi-shopping-cart text-xl"></i>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center min-w-[20px]">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </div>
          <span class="text-xs font-medium">Cart</span>
        </button>

      </div>

      <!-- For Authenticated Regular Users -->
      <div v-else-if="isAuthenticated && !isSeller" class="flex items-center justify-around">
        
        <!-- Home -->
        <button @click="navigateTo('home')" :class="buttonClass('home')">
          <i class="pi pi-home text-xl mb-1"></i>
          <span class="text-xs font-medium">Home</span>
        </button>

        <!-- Sell -->
        <button @click="navigateTo('sell')" :class="buttonClass('sell')">
          <i class="pi pi-plus text-xl mb-1"></i>
          <span class="text-xs font-medium">Sell</span>
        </button>

        <!-- Cart -->
        <button @click="navigateTo('cart')" :class="buttonClass('cart')">
          <div class="relative mb-1">
            <i class="pi pi-shopping-cart text-xl"></i>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center min-w-[20px]">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </div>
          <span class="text-xs font-medium">Cart</span>
        </button>

        <!-- Profile -->
        <button @click="navigateTo('profile')" :class="buttonClass('profile')">
          <i class="pi pi-user text-xl mb-1"></i>
          <span class="text-xs font-medium">Profile</span>
        </button>

      </div>

      <!-- For Authenticated Sellers -->
      <div v-else-if="isAuthenticated && isSeller" class="flex items-center justify-around">
        
        <!-- Home -->
        <button @click="navigateTo('home')" :class="buttonClass('home')">
          <i class="pi pi-home text-lg mb-1"></i>
          <span class="text-xs font-medium">Home</span>
        </button>

        <!-- Dashboard -->
        <button @click="navigateTo('dashboard')" :class="buttonClass('dashboard')">
          <i class="pi pi-chart-line text-lg mb-1"></i>
          <span class="text-xs font-medium">Dashboard</span>
        </button>

        <!-- Sell -->
        <button @click="navigateTo('sell')" :class="buttonClass('sell')">
          <i class="pi pi-plus text-lg mb-1"></i>
          <span class="text-xs font-medium">Sell</span>
        </button>

        <!-- Cart -->
        <button @click="navigateTo('cart')" :class="buttonClass('cart')">
          <div class="relative mb-1">
            <i class="pi pi-shopping-cart text-lg"></i>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center min-w-[16px] text-[10px]">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </div>
          <span class="text-xs font-medium">Cart</span>
        </button>

        <!-- Profile -->
        <button @click="navigateTo('profile')" :class="buttonClass('profile')">
          <i class="pi pi-user text-lg mb-1"></i>
          <span class="text-xs font-medium">Profile</span>
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  activeTab: {
    type: String,
    default: 'home'
  },
  cartCount: {
    type: Number,
    default: 0
  },
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  isSeller: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['navigate', 'logout'])

// Methods
const navigateTo = (tab) => {
  emit('navigate', tab)
}

// Dynamic button classes
const buttonClass = (tab) => {
  const isActive = props.activeTab === tab
  const baseClasses = 'flex flex-col items-center justify-center py-1 px-2 transition-colors duration-200'
  
  if (isActive) {
    return `${baseClasses} text-[#fbb03b]`
  } else {
    return `${baseClasses} text-gray-500 hover:text-gray-700`
  }
}
</script>

<style scoped>
/* Safe area for devices with notches */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .fixed.bottom-0 > div {
    padding-bottom: calc(0.25rem + env(safe-area-inset-bottom));
  }
}
</style>