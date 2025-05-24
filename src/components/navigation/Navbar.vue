<template>
  <nav class="bg-[#022b5f] shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
  <router-link to="/" class="flex items-center space-x-3 group">
    
    <div class="relative w-10 h-10 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
      <!-- Logo Image -->
      <img
        src="/images/logo.png"
        alt="Townra Logo"
        class="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Fallback letter if image fails to load -->
      <span 
        v-if="imageError" 
        class="font-bold text-white text-lg"
      >
        T
      </span>
      
      <!-- Subtle glow effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
    
    <!-- Brand Name -->
    <div class="flex flex-col">
      <span class="text-white font-bold text-xl leading-tight group-hover:text-[#fbb03b] transition-colors duration-300">
        Townra
      </span>
      <!-- Optional tagline -->
      <span class="text-white/70 text-xs font-medium -mt-1 group-hover:text-[#fbb03b]/70 transition-colors duration-300">
        Marketplace
      </span>
    </div>
  </router-link>
</div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, sellers, or categories..."
              class="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] focus:border-transparent"
              @keyup.enter="handleSearch"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button
              @click="handleSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <div class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-3 py-1 rounded-r-lg transition-colors duration-200">
                Search
              </div>
            </button>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Sell Button -->
          <router-link
            to="/sell"
            class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-4 py-2 rounded font-semibold transition-colors duration-200"
          >
            Start Selling
          </router-link>

          <!-- Categories Dropdown -->
          <div class="relative" ref="categoriesDropdown">
            <button
              @click="toggleCategories"
              class="text-white hover:text-[#fbb03b] flex items-center space-x-1 transition-colors duration-200"
            >
              <span>Categories</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showCategories }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              v-show="showCategories"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <router-link
                v-for="category in categories"
                :key="category.id"
                :to="`/category/${category.slug}`"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#022b5f] transition-colors duration-200"
                @click="showCategories = false"
              >
                {{ category.name }}
              </router-link>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative" ref="userDropdown" v-if="isAuthenticated">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-white hover:text-[#fbb03b] transition-colors duration-200"
            >
              <div class="w-8 h-8 bg-[#fbb03b] rounded-full flex items-center justify-center">
                <span class="text-[#022b5f] font-semibold text-sm">{{ userInitials }}</span>
              </div>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              v-show="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" @click="showUserMenu = false">
                My Profile
              </router-link>
              <router-link to="/orders" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" @click="showUserMenu = false">
                My Orders
              </router-link>
              <router-link to="/seller-dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" @click="showUserMenu = false">
                Seller Dashboard
              </router-link>
              <hr class="my-2">
              <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>

          <!-- Login/Register (when not authenticated) -->
          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-white hover:text-[#fbb03b] transition-colors duration-200"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="bg-transparent border border-[#fbb03b] text-[#fbb03b] hover:bg-[#fbb03b] hover:text-[#022b5f] px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Cart -->
          <router-link
            to="/cart"
            class="relative text-white hover:text-[#fbb03b] transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5L19 13"></path>
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-[#fbb03b] text-[#022b5f] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
            >
              {{ cartCount }}
            </span>
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-white hover:text-[#fbb03b] transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="showMobileMenu" class="md:hidden bg-[#022b5f] border-t border-[#fbb03b]/20">
      <!-- Mobile Search -->
      <div class="px-4 py-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbb03b]"
            @keyup.enter="handleSearch"
          >
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Links -->
      <div class="px-4 py-2 space-y-2">
        <router-link
          to="/sell"
          class="block bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-4 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
          @click="showMobileMenu = false"
        >
          Start Selling
        </router-link>
        
        <button
          @click="toggleCategories"
          class="w-full text-left text-white hover:text-[#fbb03b] px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between"
        >
          <span>Categories</span>
          <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showCategories }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div v-show="showCategories" class="pl-4 space-y-1">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/category/${category.slug}`"
            class="block text-gray-300 hover:text-[#fbb03b] px-4 py-2 rounded transition-colors duration-200"
            @click="showMobileMenu = false"
          >
            {{ category.name }}
          </router-link>
        </div>

        <router-link
          to="/cart"
          class="flex items-center justify-between text-white hover:text-[#fbb03b] px-4 py-3 rounded-lg transition-colors duration-200"
          @click="showMobileMenu = false"
        >
          <span>Cart</span>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5L19 13"></path>
            </svg>
            <span v-if="cartCount > 0" class="bg-[#fbb03b] text-[#022b5f] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {{ cartCount }}
            </span>
          </div>
        </router-link>

        <div v-if="isAuthenticated" class="border-t border-[#fbb03b]/20 pt-2 mt-2">
          <div class="flex items-center space-x-3 px-4 py-3">
            <div class="w-10 h-10 bg-[#fbb03b] rounded-full flex items-center justify-center">
              <span class="text-[#022b5f] font-semibold">{{ userInitials }}</span>
            </div>
            <span class="text-white font-medium">{{ userName }}</span>
          </div>
          <router-link to="/profile" class="block text-white hover:text-[#fbb03b] px-4 py-2 transition-colors duration-200" @click="showMobileMenu = false">
            My Profile
          </router-link>
          <router-link to="/orders" class="block text-white hover:text-[#fbb03b] px-4 py-2 transition-colors duration-200" @click="showMobileMenu = false">
            My Orders
          </router-link>
          <router-link to="/seller-dashboard" class="block text-white hover:text-[#fbb03b] px-4 py-2 transition-colors duration-200" @click="showMobileMenu = false">
            Seller Dashboard
          </router-link>
          <button @click="logout" class="w-full text-left text-white hover:text-[#fbb03b] px-4 py-2 transition-colors duration-200">
            Logout
          </button>
        </div>

        <div v-else class="border-t border-[#fbb03b]/20 pt-2 mt-2 space-y-2">
          <router-link
            to="/login"
            class="block text-white hover:text-[#fbb03b] px-4 py-3 rounded-lg transition-colors duration-200"
            @click="showMobileMenu = false"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="block bg-transparent border border-[#fbb03b] text-[#fbb03b] hover:bg-[#fbb03b] hover:text-[#022b5f] px-4 py-3 rounded-lg text-center transition-colors duration-200"
            @click="showMobileMenu = false"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const showMobileMenu = ref(false)
const showCategories = ref(false)
const showUserMenu = ref(false)
const categoriesDropdown = ref(null)
const userDropdown = ref(null)

// Mock data - replace with your actual data/store
const isAuthenticated = ref(true) // Change based on auth state
const userName = ref('John Doe')
const cartCount = ref(3)

const categories = ref([
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Fashion', slug: 'fashion' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden' },
  { id: 4, name: 'Sports', slug: 'sports' },
  { id: 5, name: 'Books', slug: 'books' },
  { id: 6, name: 'Health & Beauty', slug: 'health-beauty' }
])

// Computed properties
const userInitials = computed(() => {
  if (!userName.value) return 'U'
  return userName.value
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

// Methods
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showCategories.value = false
    showUserMenu.value = false
  }
}

const toggleCategories = () => {
  showCategories.value = !showCategories.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showCategories.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search logic here
    console.log('Searching for:', searchQuery.value)
    // Example: router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const logout = () => {
  // Implement logout logic
  isAuthenticated.value = false
  showUserMenu.value = false
  showMobileMenu.value = false
  console.log('User logged out')
}

// Click outside handler
const handleClickOutside = (event) => {
  if (categoriesDropdown.value && !categoriesDropdown.value.contains(event.target)) {
    showCategories.value = false
  }
  if (userDropdown.value && !userDropdown.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.group:hover .w-10 {
  transform: rotate(-2deg);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>