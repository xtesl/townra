<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import PageLoader from '../../animation/PageLoader.vue';

// const pageLoaderMessage = ref('Doing something');
// const showPageLoader = ref(true);
// Define props interface
const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false
  },
  currentView: {
    type: String,
    default: 'dashboard'
  },
  currentPlanName: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    default: () => ({
      name: 'John Doe',
      subscription: 'Premium Plan'
    })
  },
  stores: {
    type: Array,
    default: () => []
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  showPageLoader: {
    type: Boolean,
    default: false
  },
  pageLoaderMessage: {
    type: String,
    default: "Loading..."
  }
})

// Define emits
const emit = defineEmits([
  'update:sidebar-open',
  'update:current-view',
  'help-support-click'
])

// Methods
const closeSidebar = () => {
  emit('update:sidebar-open', false)
}

const setCurrentView = (view) => {
  emit('update:current-view', view)
}

const handleHelpSupport = () => {
  emit('help-support-click')
}
</script>

<template>
  <!-- Mobile Backdrop -->
  <div 
    v-if="props.sidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
  ></div>

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-out lg:translate-x-0"
    :class="{
      '-translate-x-full lg:translate-x-0': !props.sidebarOpen,
      'translate-x-0': props.sidebarOpen,
    }"
    style="background: linear-gradient(180deg, #022b5f 0%, #1a365d 100%);"
  >
    <div class="flex flex-col h-full">
      <!-- Header Section -->
      <div class="h-20 flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0">
        <div class="flex items-center space-x-3">
           <div
              class="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0"
            >
              <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg"
              />
            </div>
          <!-- <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background-color: #fbb03b;">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div> -->
          <h1 class="text-2xl font-semibold text-white tracking-tight">Townra</h1>
        </div>
        <button
          @click="closeSidebar"
          class="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- User Profile Section -->
      <div class="px-6 py-6 flex-shrink-0">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div class="relative">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg" style="background-color: #fbb03b;">
              {{ props.user.first_name ? props.user.first_name.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-white text-base truncate">{{ props.user.first_name }} {{ props.user.last_name }}</p>
            <p class="text-sm text-white/60 truncate">{{ props.currentPlanName }}</p>
          </div>
          <div class="flex-shrink-0">
            <button class="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="px-4 flex-1 overflow-y-auto">
        <div class="space-y-2 pb-6">
          <!-- Dashboard -->
          <button
            @click="setCurrentView('dashboard')"
            class="group relative w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            :class="props.currentView === 'dashboard' 
              ? 'text-white shadow-lg shadow-orange-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            :style="props.currentView === 'dashboard' ? 'background-color: #fbb03b;' : ''"
          >
            <div class="flex items-center flex-1">
              <svg class="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span>Dashboard</span>
            </div>
            <div v-if="props.currentView === 'dashboard'" class="w-2 h-2 rounded-full bg-white/30"></div>
          </button>

          <!-- My Stores -->
          <button
            @click="setCurrentView('stores')"
            class="group relative w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            :class="props.currentView === 'stores' 
              ? 'text-white shadow-lg shadow-orange-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            :style="props.currentView === 'stores' ? 'background-color: #fbb03b;' : ''"
          >
            <div class="flex items-center flex-1">
              <svg class="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>My Stores</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white/15 text-white">
                {{ props.stores.length }}
              </span>
              <div v-if="props.currentView === 'stores'" class="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </button>

          <!-- Products -->
          <button
            @click="setCurrentView('products')"
            class="group relative w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            :class="props.currentView === 'products' 
              ? 'text-white shadow-lg shadow-orange-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            :style="props.currentView === 'products' ? 'background-color: #fbb03b;' : ''"
          >
            <div class="flex items-center flex-1">
              <svg class="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span>Products</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white/15 text-white">
                {{ props.totalProducts }}
              </span>
              <div v-if="props.currentView === 'products'" class="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </button>

          <!-- Orders -->
          <button
            @click="setCurrentView('orders')"
            class="group relative w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            :class="props.currentView === 'orders' 
              ? 'text-white shadow-lg shadow-orange-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            :style="props.currentView === 'orders' ? 'background-color: #fbb03b;' : ''"
          >
            <div class="flex items-center flex-1">
              <svg class="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Orders</span>
            </div>
            <div v-if="props.currentView === 'orders'" class="w-2 h-2 rounded-full bg-white/30"></div>
          </button>

          <!-- Subscription -->
          <button
            @click="setCurrentView('subscription')"
            class="group relative w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            :class="props.currentView === 'subscription' 
              ? 'text-white shadow-lg shadow-orange-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            :style="props.currentView === 'subscription' ? 'background-color: #fbb03b;' : ''"
          >
            <div class="flex items-center flex-1">
              <svg class="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <span>Subscription</span>
            </div>
            <div v-if="props.currentView === 'subscription'" class="w-2 h-2 rounded-full bg-white/30"></div>
          </button>
        </div>
      </nav>

      <!-- Footer Section -->
      <div class="p-6 flex-shrink-0">
        <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200" @click="handleHelpSupport">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm text-white/70">Help & Support</span>
          </div>
          <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </aside>
      <PageLoader
        :isVisible="showPageLoader"
        :message="pageLoaderMessage"
        :showLogo="false"
        type="pulse"
        color="blue"
      />
</template>