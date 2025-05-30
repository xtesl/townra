<template>
  <nav class="bg-[#022b5f] shadow-lg sticky top-0 z-50">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Navigation (unchanged) -->
      <div class="hidden md:flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="flex items-center space-x-3 group">
            <div
              class="relative w-10 h-10 bg-white from-[#fbb03b] to-[#e09a2a] rounded flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            >
              <!-- Logo Image -->
              <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError"
              />

              <!-- Fallback letter if image fails to load -->
              <span v-if="imageError" class="font-bold text-white text-lg">
                T
              </span>

              <!-- Subtle glow effect -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              ></div>
            </div>

            <!-- Brand Name -->
            <div class="flex flex-col">
              <span
                class="text-white font-bold text-xl leading-tight group-hover:text-[#fbb03b] transition-colors duration-300"
              >
                Townra
              </span>
              <!-- Optional tagline -->
              <span
                class="text-white/70 text-xs font-medium -mt-1 group-hover:text-[#fbb03b]/70 transition-colors duration-300"
              >
                Marketplace
              </span>
            </div>
          </a>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, sellers, or categories..."
              class="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] focus:border-transparent"
              @keyup.enter="handleSearch"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button
              @click="handleSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <div
                class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-3 py-1 rounded-r-lg transition-colors duration-200"
              >
                Search
              </div>
            </button>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="flex items-center space-x-6" v-if="isInitialized">
          <!-- Sell Button -->
           <div v-if="!isAuthenticated && userType !== 'seller'">
               <RouterLink
            to="/auth/register"
            class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-4 py-2 rounded font-semibold transition-colors duration-200"
          >
            Start Selling
        </RouterLink>
           </div>
      
          <!-- Categories Dropdown -->
          <div class="relative" ref="categoriesDropdown">
            <button
              @click="toggleCategories"
              class="text-white hover:text-[#fbb03b] flex items-center space-x-1 transition-colors duration-200"
            >
              <span>Categories</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showCategories }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              v-show="showCategories"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <RouterLink
                v-for="category in categories"
                :key="category.id"
                :to="`/category/${category.slug}`"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#022b5f] transition-colors duration-200"
                @click="showCategories = false"
              >
                {{ category.name }}
          </RouterLink>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative" ref="userDropdown" v-if="isAuthenticated">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-white hover:text-[#fbb03b] transition-colors duration-200"
            >
              <div
                class="w-8 h-8 bg-[#fbb03b] rounded-full flex items-center justify-center"
              >
                <span class="text-[#022b5f] font-semibold text-sm">{{
                  userInitials
                }}</span>
              </div>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showUserMenu }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              v-show="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              
              <router-link
                to="/user/profile"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="showUserMenu = false"
              >
                My Profile
              </router-link>
               <div v-if="userType === 'buyer'">
                 <router-link
                to="/orders"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="showUserMenu = false"
              >
                My Orders
              </router-link>
               </div>
               <div v-if="userType == 'seller'">
                <router-link
                to="/seller-dashboard"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="showUserMenu = false"
              >
                Seller Dashboard
              </router-link>
               </div>
             
              <hr class="my-2" />
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Login/Register (when not authenticated) -->
          <div v-else class="flex items-center space-x-4">
           
            <RouterLink
              to="/auth/login"
              class="bg-transparent border border-[#fbb03b] text-[#fbb03b] hover:bg-[#fbb03b] hover:text-[#022b5f] px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Login
          </RouterLink>
          </div>

          <!-- Cart -->
          <router-link
            to="/cart"
            class="relative text-white hover:text-[#fbb03b] transition-colors duration-200"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5L19 13"
              ></path>
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-[#fbb03b] text-[#022b5f] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
            >
              {{ cartCount }}
            </span>
          </router-link>
        </div>

      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <!-- Mobile Header Row -->
        <div class="flex items-center justify-between h-16 py-2">
          <!-- Left side: Toggle Button and Logo -->
          <div class="flex items-center space-x-3 flex-shrink-0">
            <button
              @click="toggleMobileMenu"
              class="text-white hover:text-[#fbb03b] transition-all duration-300 p-1"
              :class="{ 'rotate-90': showMobileMenu }"
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
            
            <RouterLink to="/" class="flex items-center space-x-2 group flex-shrink-0">
              <div class="relative w-8 h-8 bg-white rounded flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <img
                  src="/images/logo.png"
                  alt="Townra Logo"
                  class="w-6 h-6 object-contain"
                  @error="handleImageError"
                />
                <span v-if="imageError" class="font-bold text-[#022b5f] text-sm">T</span>
              </div>
              <div class="flex flex-col">
                <span class="text-white font-bold text-base leading-tight group-hover:text-[#fbb03b] transition-colors duration-300">
                  Townra
                </span>
              </div>
            </RouterLink>
          </div>

          <!-- Right side: User and Cart -->
          <div class="flex items-center space-x-3 flex-shrink-0">
            <!-- User Avatar or Login -->
            <div v-if="isAuthenticated" class="flex items-center">
              <div class="w-7 h-7 bg-[#fbb03b] rounded-full flex items-center justify-center">
                <span class="text-[#022b5f] font-semibold text-xs">{{ userInitials }}</span>
              </div>
            </div>
            <div v-else class="flex items-center">
              <RouterLink
                to="/auth/login"
                class="text-white text-sm hover:text-[#fbb03b] transition-colors duration-200"
              >
                Login
            </RouterLink>
            </div>
          
            <!-- Cart -->
            <router-link
              to="/cart"
              class="relative text-white hover:text-[#fbb03b] transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5L19 13"
                ></path>
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 bg-[#fbb03b] text-[#022b5f] text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold text-[10px]"
              >
                {{ cartCount }}
              </span>
            </router-link>
          </div>
        </div>

        <!-- Mobile Start Selling Button and Search Bar Row -->
        
  <div class="flex items-center gap-2 sm:gap-3 px-3 pb-3">
  <!-- Start Selling Button -->
   <div v-if="!isAuthenticated && userType !== 'seller'">
    <router-link
    to="/auth/register"
    class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-2.5 sm:px-3 py-2 rounded text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex-shrink-0 min-w-0"
  >
    <span class="hidden xs:inline">Sell Now</span>
    <span class="xs:hidden">Start Selling</span>
  </router-link>
   </div>
 

  <!-- Mobile Search Bar -->
  <div class="relative flex-1 min-w-0">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search Townra"
      class="w-full px-4 sm:px-5 py-2 pl-8 sm:pl-10 pr-14 sm:pr-16 text-gray-900 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] focus:border-transparent shadow text-xs sm:text-sm"
      @keyup.enter="handleSearch"
    />
    <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <button
      @click="handleSearch"
      class="absolute inset-y-0 right-0 pr-1.5 sm:pr-2 flex items-center"
    >
      <div class="bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-colors duration-200 text-xs font-medium">
        Go
      </div>
    </button>
  </div>
</div>

      </div>
    </div>

    <!-- Mobile Sliding Menu Overlay -->
   <div 
  v-show="showMobileMenu"
  class="fixed inset-0 bg-transparent z-40 md:hidden transition-opacity duration-300"
  @click="closeMobileMenu"
></div>

    <!-- Mobile Sliding Menu -->
    <div
  class="fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden"
  :class="{ 'translate-x-0': showMobileMenu, '-translate-x-full': !showMobileMenu }"
>
  <!-- Menu Header -->
  <div class="bg-gradient-to-r from-[#fbb03b] to-[#e09a2a] p-6">
    <div class="flex items-center justify-between">
      <router-link to="/" class="flex items-center space-x-3" @click="closeMobileMenu">
        <div class="w-12 h-12 bg-white rounded flex items-center justify-center shadow">
          <img
            src="/images/logo.png"
            alt="Townra Logo"
            class="w-8 h-8 object-contain"
            @error="handleImageError"
          />
          <span v-if="imageError" class="font-bold text-[#022b5f] text-lg">T</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-bold text-xl">Townra</span>
          <span class="text-white/90 text-sm">Marketplace</span>
        </div>
      </router-link>
      <button
        @click="closeMobileMenu"
        class="text-white hover:text-white/80 transition-colors duration-200"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Menu Content -->
  <div class="flex-1 overflow-y-auto bg-white">
    <!-- User Section -->
    <div class="px-6 py-4 border-b border-gray-100">
      <div v-if="isAuthenticated" class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-[#fbb03b] rounded-full flex items-center justify-center">
          <span class="text-[#022b5f] font-semibold text-lg">{{ userInitials }}</span>
        </div>
        <div>
          <div class="text-[#022b5f] font-semibold">{{ userName }}</div>
          <div class="text-gray-600 text-sm">Welcome back!</div>
        </div>
      </div>
      
      <!-- Auth Buttons -->
      <div v-if="!isAuthenticated" class="space-y-3 mb-4">
        <router-link
          to="/auth/login"
          class="block w-full bg-[#fbb03b] hover:bg-[#e09d35] text-[#022b5f] px-4 py-3 rounded font-semibold text-center transition-all duration-200 transform hover:scale-105"
          @click="closeMobileMenu"
        >
          Sign In
        </router-link>
      </div>
              <!-- <div>
           <router-link
          to="/auth/"
          class="block w-full border-2 border-[#fbb03b] text-[#fbb03b] hover:bg-[#fbb03b] hover:text-[#022b5f] px-4 py-3 rounded font-semibold text-center transition-all duration-200"
          @click="closeMobileMenu"
        >
          Logout
        </router-link>
        </div> -->
    </div>

    <!-- Navigation Links -->
    <div class="px-6 py-4">
      <!-- Home -->
      <router-link
        to="/"
        class="flex items-center space-x-4 text-[#022b5f] hover:text-[#fbb03b] py-3 rounded transition-all duration-200 hover:bg-gray-50"
        @click="closeMobileMenu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span class="font-medium">Home</span>
      </router-link>

      <!-- Sell Button -->
       <div v-if="!isAuthenticated && userType !== 'seller'">
<router-link
        to="/auth/register"
        class="flex items-center space-x-4 bg-gradient-to-r from-[#fbb03b] to-[#e09a2a] text-[#022b5f] py-3 px-4 rounded font-semibold my-4 transition-all duration-200 transform hover:scale-105"
        @click="closeMobileMenu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Start Selling</span>
      </router-link>
       </div>
      

      <!-- Categories -->
      <div class="mb-4">
        <div class="text-gray-500 text-sm font-semibold mb-2 px-2">CATEGORIES</div>
        <div class="space-y-1">
          <router-link
            v-for="category in categories.slice(0, 6)"
            :key="category.id"
            :to="`/category/${category.slug}`"
            class="flex items-center space-x-3 text-gray-700 hover:text-[#fbb03b] py-2 px-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
            @click="closeMobileMenu"
          >
            <div class="w-2 h-2 bg-[#fbb03b] rounded-full"></div>
            <span>{{ category.name }}</span>
          </router-link>
        </div>
      </div>

      <!-- User Menu Items (if authenticated) -->
      <div v-if="isAuthenticated" class="border-t border-gray-100 pt-4 space-y-1">
        <div class="text-gray-500 text-sm font-semibold mb-2 px-2">MY ACCOUNT</div>
         
        <router-link
          to="/user/profile"
          class="flex items-center space-x-4 text-[#022b5f] hover:text-[#fbb03b] py-3 rounded-lg transition-all duration-200 hover:bg-gray-50"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>My Profile</span>
        </router-link>
        <div v-if="userType === 'buyer'">
          <router-link
          to="/orders"
          class="flex items-center space-x-4 text-[#022b5f] hover:text-[#fbb03b] py-3 rounded transition-all duration-200 hover:bg-gray-50"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <span>My Orders</span>
        </router-link>
         </div>
         <div v-else>
            <router-link
          to="/seller-dashboard"
          class="flex items-center space-x-4 text-[#022b5f] hover:text-[#fbb03b] py-3 rounded transition-all duration-200 hover:bg-gray-50"
          @click="closeMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span>Seller Dashboard</span>
        </router-link>
         </div>
      </div>
    </div>

    <!-- Menu Footer -->
    <div class="px-6 py-4 border-t border-gray-100 mt-auto">
      <button
        v-if="isAuthenticated"
        @click="logout"
        class="flex items-center space-x-4 text-red-500 hover:text-red-600 py-3 rounded transition-all duration-200 hover:bg-red-50 w-full"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span>Sign Out</span>
      </button>
    </div>
  </div>
  <!-- <div :v-if="showPageLoader">
      <PageLoader
        :isVisible="showPageLoader"
        :message="''"
        :showLogo="false"
        type="pulse"
        color="blue"
      />
    </div> -->
</div>

  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores";
import PageLoader from "../animation/PageLoader.vue";
import apiClient from "../../api/axios"
// import MessageDisplayer from "../animation/MessageDisplayer.vue"



// const messageDisplayer = ref(null)
const authStore = useAuthStore();
const router = useRouter()

// Reactive data
const searchQuery = ref("");
const showPageLoader = ref(false); // For showing page loader
const showMobileMenu = ref(false);
const showCategories = ref(false);
const showUserMenu = ref(false);
const categoriesDropdown = ref(null);
const userDropdown = ref(null);
const imageError = ref(false);


const isAuthenticated = computed(() => authStore.isAuthenticated || true);
const isInitialized = computed(() => authStore.isInitialized);
const userType = computed(() => authStore.userType || "buyer");
const userName = ref("John Doe");
const cartCount = ref(3);

const categories = ref([
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Fashion", slug: "fashion" },
  { id: 3, name: "Home & Garden", slug: "home-garden" },
  { id: 4, name: "Sports", slug: "sports" },
  { id: 5, name: "Books", slug: "books" },
  { id: 6, name: "Health & Beauty", slug: "health-beauty" },
]);

// Computed properties
const userInitials = computed(() => {
  if (!userName.value) return "U";
  return userName.value
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
});

// Methods
const handleImageError = () => {
  imageError.value = true;
};

 const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    }
    
    // Method to close mobile menu
   const  closeMobileMenu = () => {
      showMobileMenu.value = false;
    }

    const toggleBodyScroll = (disable) => {
      if (disable) {
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        // Enable body scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }

// const toggleMobileMenu = () => {
//   showMobileMenu.value = !showMobileMenu.value;
//   if (showMobileMenu.value) {
//     document.body.style.overflow = 'hidden';
//   } else {
//     document.body.style.overflow = '';
//   }
// };

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
  showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showCategories.value = false;
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search logic here
    console.log("Searching for:", searchQuery.value);
    // Example: router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
};

const logout = async () => {
  // Implement logout logic
  // isAuthenticated.value = false;
  // showUserMenu.value = false;
  // showPageLoader.value = true;
  await authStore.logout();
  showMobileMenu.value = false;
  router.replace("/").then(() => {
       window.location.reload();
      //  showPageLoader.value = false;
  })
};

// Click outside handler
const handleClickOutside = (event) => {
  if (
    categoriesDropdown.value &&
    !categoriesDropdown.value.contains(event.target)
  ) {
    showCategories.value = false;
  }
  if (userDropdown.value && !userDropdown.value.contains(event.target)) {
    showUserMenu.value = false;
  }
};



// Lifecycle hooks
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);

});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.body.style.overflow = '';
});
</script>


