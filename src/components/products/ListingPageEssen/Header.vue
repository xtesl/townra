<template>
  
 <!-- Header -->
<!-- Header -->
<header class="bg-[#022b5f] text-white shadow top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 min-w-0">
      <div class="flex items-center min-w-0 flex-shrink">
        <h2 class="text-base sm:text-lg font-semibold truncate">{{ selectedMarketplace }}</h2>
      </div>
      
      <!-- Desktop Marketplace Switcher -->
      <div class="hidden lg:flex items-center space-x-4">
        <span class="text-sm font-medium">Marketplace:</span>
        <select 
          v-model="selectedMarketplace" 
          class="bg-white text-[#022b5f] rounded px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#fbb03b]"
        >
          <option v-for="marketplace in marketplaces" :key="marketplace.id" :value="marketplace.id">
            {{ marketplace.name }}
          </option>
        </select>
      </div>

      <!-- Mobile Controls -->
      <div class="lg:hidden flex items-center space-x-1 min-w-0">
        <!-- Mobile Marketplace Switcher -->
        <select 
          v-model="selectedMarketplace" 
          class="bg-white text-[#022b5f] rounded px-1 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#fbb03b] min-w-0 flex-shrink max-w-[100px] truncate"
        >
          <option v-for="marketplace in marketplaces" :key="marketplace.id" :value="marketplace.id">
            {{ marketplace.name }}
          </option>
        </select>
        
        <!-- Mobile Filter Toggle -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="flex items-center space-x-1 bg-[#fbb03b] px-2 py-1 rounded flex-shrink-0"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span class="text-xs font-medium hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Filters Dropdown -->
  <div v-if="showMobileFilters" class="lg:hidden bg-white border-t border-gray-200 shadow">
    <div class="px-4 py-4 space-y-4">
      <!-- Search -->
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-gray-900"
        >
      </div>

      <!-- Quick Filters Row -->
      <div class="flex space-x-2 overflow-x-auto pb-2">
        <select v-model="selectedCategory" class="flex-shrink-0 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="selectedDuration" class="flex-shrink-0 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900">
          <option value="">Any Duration</option>
          <option v-for="duration in durations" :key="duration" :value="duration">{{ duration }}</option>
        </select>
      </div>

      <!-- Price Range -->
      <div class="grid grid-cols-2 gap-2">
        <input v-model.number="priceRange.min" type="number" placeholder="Min Price" class="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900">
        <input v-model.number="priceRange.max" type="number" placeholder="Max Price" class="px-3 py-2 border border-gray-300 rounded text-sm text-gray-900">
      </div>

      <!-- Clear Filters -->
      <button @click="clearFilters" class="w-full bg-gray-100 text-gray-700 py-2 rounded text-sm font-medium">
        Clear All Filters
      </button>
    </div>
  </div>
</header>
</template>

<script setup>
import { ref } from "vue";

const marketplaces = ref([
  { id: 'all', name: 'All Marketplaces' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'ebay', name: 'eBay' },
  { id: 'etsy', name: 'Etsy' },
  { id: 'walmart', name: 'Walmart' }
])
const selectedMarketplace = ref('amazon')
const showMobileFilters = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const priceRange = ref({ min: null, max: null })
const selectedDuration = ref('')

const categories = ref([
  'Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors',
  'Books', 'Toys & Games', 'Health & Beauty', 'Automotive'
])

const durations = ref([
  '1-7 days', '1-2 weeks', '2-4 weeks', '1-2 months', '2+ months'
])
</script>

<style scoped>

</style>