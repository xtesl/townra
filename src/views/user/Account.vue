<template>
  <!-- Desktop Not Supported Message -->
  <div class="hidden md:flex min-h-screen bg-gray-100 items-center justify-center">
    <div class="text-center p-8 bg-white rounded-lg max-w-md mx-4">
      <div class="mb-6">
        <i class="pi pi-mobile text-6xl text-gray-400 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Mobile Only</h2>
        <p class="text-gray-600">This page is optimized for mobile devices only. Please access from your mobile device for the best experience.</p>
      </div>
      <div class="text-sm text-gray-500">
        <p>Supported devices: Mobile phones and tablets</p>
      </div>
    </div>
  </div>

  <!-- Mobile Layout -->
  <div class="md:hidden min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-white sticky top-0 z-50 shadow-sm">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center space-x-3">
          <button 
            @click="handleBackClick"
            class="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <i class="pi pi-arrow-left text-gray-700 text-lg"></i>
          </button>
          <h1 class="text-lg font-semibold text-gray-900">Account</h1>
        </div>
        
        
        <div class="flex items-center space-x-2">
          <button 
            v-if="!isAuthenticated"
            @click="login"
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              'bg-yellow-100 text-yellow-700'
            ]"
          >
            Login
          </button>
        </div>
      </div>
    </div>

    <!-- User Info Section -->
    <div class="bg-white mx-4 mt-4 rounded-lg p-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <i class="pi pi-user text-gray-500 text-xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900">
            {{ isAuthenticated ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Account` : 'Guest User' }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ isAuthenticated ? 'Verified Account' : 'Sign in to access all features' }}
          </p>
        </div>
        <div :class="['w-3 h-3 rounded-full', isAuthenticated ? 'bg-green-400' : 'bg-gray-300']"></div>
      </div>
    </div>

    <!-- Main Menu -->
    <div class="mx-4 mt-4 bg-white rounded-lg overflow-hidden">
      <!-- Settings -->
      <div 
        @click="handleTileClick('settings')"
        :class="[
          'flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors',
          !isAuthenticated ? 'opacity-50' : 'cursor-pointer'
        ]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #fbb03b;">
            <i class="pi pi-cog text-white"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Account Settings</h3>
            <p class="text-sm text-gray-500">Profile, security & preferences</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <i v-if="!isAuthenticated" class="pi pi-lock text-gray-400 text-sm"></i>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div>
      </div>

      <!-- Dashboard (Seller Only) -->
      <div 
        v-if="isAuthenticated && userType === 'seller'"
        @click="gotoDashboard"
        class="flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #fbb03b;">
            <i class="pi pi-chart-line text-white"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Business Dashboard</h3>
            <p class="text-sm text-gray-500">Analytics & insights</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">Seller</span>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div>
      </div>

      <!-- Help Center -->
      <div 
        @click="handleTileClick('help')"
        class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #fbb03b;">
            <i class="pi pi-question-circle text-white"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Help Center</h3>
            <p class="text-sm text-gray-500">Support & documentation</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full font-medium">24/7</span>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div>
      </div>
    </div>

    <!-- Additional Menu Items (Alibaba Style) -->
    <div class="mx-4 mt-4 bg-white rounded-lg overflow-hidden">
      <div 
        @click="handleAction('orders')"
        :class="[
          'flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors',
          !isAuthenticated ? 'opacity-50' : 'cursor-pointer'
        ]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <i class="pi pi-shopping-bag text-gray-600"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">My Orders</h3>
            <p class="text-sm text-gray-500">Track your purchases</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <i v-if="!isAuthenticated" class="pi pi-lock text-gray-400 text-sm"></i>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div>
      </div>

      <div 
        @click="handleAction('wishlist')"
        :class="[
          'flex items-center justify-between p-4 border-b border-gray-100 active:bg-gray-50 transition-colors',
          !isAuthenticated ? 'opacity-50' : 'cursor-pointer'
        ]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <i class="pi pi-heart text-gray-600"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Wishlist</h3>
            <p class="text-sm text-gray-500">Saved items</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <i v-if="!isAuthenticated" class="pi pi-lock text-gray-400 text-sm"></i>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div>
      </div>

      <div 
        @click="handleAction('addresses')"
        :class="[
          'flex items-center justify-between p-4 active:bg-gray-50 transition-colors',
          !isAuthenticated ? 'opacity-50' : 'cursor-pointer'
        ]"
      >
        <!-- <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <i class="pi pi-map-marker text-gray-600"></i>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Addresses</h3>
            <p class="text-sm text-gray-500">Manage delivery addresses</p>
          </div>
        </div> -->
        <!-- <div class="flex items-center space-x-2">
          <i v-if="!isAuthenticated" class="pi pi-lock text-gray-400 text-sm"></i>
          <i class="pi pi-chevron-right text-gray-400"></i>
        </div> -->
      </div>
    </div>

    <!-- Account Status -->
    <!-- <div class="mx-4 mt-4 mb-6 bg-white rounded-lg shadow-sm p-4">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
          <i class="pi pi-info-circle text-yellow-600 text-sm"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-900">Account Status</h3>
          <p class="text-xs text-gray-500 mt-1">
            {{ isAuthenticated 
              ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} • ${getFeatureCount()} features available`
              : 'Guest access • Limited features' 
            }}
          </p>
        </div>
        <div :class="['w-2 h-2 rounded-full', isAuthenticated ? 'bg-green-400' : 'bg-gray-400']"></div>
      </div>
    </div> -->
  </div>
  <!-- <div v-if="currentPage == 'settings'">
    <Profile />
  </div> -->
  <MobileNavbarWrapper :active-tab-prop="'account'"/>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Profile from './Profile.vue';
import MobileNavbarWrapper from '../../components/navigation/MobileNavbarWrapper.vue';


const router = useRouter();

// Reactive state
const isAuthenticated = ref(true)
const userType = ref('seller') // 'buyer' or 'seller'

// Computed
const getFeatureCount = computed(() => {
  if (!isAuthenticated.value) return 0
  return userType.value === 'seller' ? 'All' : 'Standard'
})

// Methods
const toggleAuth = () => {
  isAuthenticated.value = !isAuthenticated.value
}

const login = () => {
   router.push("/auth/login")
}

const gotoDashboard = () => {
   router.push("/user/dashboard")
}

const handleTileClick = (tile) => {
  if (tile === 'help') {
  }else if(tile === 'settings'){
      router.push("/user/profile")
  } else {
    console.log(`Opening ${tile}...`)
  }
}

const handleAction = (action) => {
  if (!isAuthenticated.value) {
    console.log('Authentication required')
  } else {
    console.log(`Opening ${action}...`)
  }
}

const handleBackClick = () => {
  console.log('Going back...')
}


</script>

<style scoped>
/* Mobile-first responsive design */
@media (max-width: 767px) {
  .md\:hidden {
    display: block !important;
  }
}

/* Custom active states for mobile */
.active\:bg-gray-50:active {
  background-color: #f9fafb;
}

/* Smooth transitions */
.transition-colors {
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}
</style>