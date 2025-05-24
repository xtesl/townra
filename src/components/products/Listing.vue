<template>
  <div class="min-h-screen bg-gray-50">
     <Header 
      :selectedCategory="selectedCategory"
      :selectedMarketplace="selectedMarketplace"
      :priceRange="priceRange"
      :marketplaces="marketplaces"
     />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
        <!-- Desktop Filters Sidebar -->
        <aside class="lg:col-span-3 xl:col-span-2">
          <div class="bg-white rounded p-4 xl:p-6 sticky top-24">
            <h2 class="text-lg font-semibold text-[#022b5f] mb-4 xl:mb-6">Filters</h2>
            
            <div class="space-y-4 xl:space-y-6">
              <!-- Search -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm"
                >
              </div>

              <!-- Category Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select v-model="selectedCategory" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm">
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
              </div>

              <!-- Price Range Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model.number="priceRange.min" type="number" placeholder="Min" class="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b]">
                  <input v-model.number="priceRange.max" type="number" placeholder="Max" class="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b]">
                </div>
              </div>

              <!-- Duration Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select v-model="selectedDuration" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm">
                  <option value="">Any Duration</option>
                  <option v-for="duration in durations" :key="duration" :value="duration">{{ duration }}</option>
                </select>
              </div>

              <button @click="clearFilters" class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors text-sm font-medium">
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        <!-- Desktop Main Content -->
        <main class="lg:col-span-9 xl:col-span-10">
          <div class="space-y-6 xl:space-y-8">
            <!-- New Arrivals Section -->
            <section>
              <div class="flex items-center justify-between mb-4 xl:mb-6">
                <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f]">New Arrivals</h2>
                <button class="text-[#fbb03b] hover:text-[#e09a2a] font-medium text-sm">View All</button>
              </div>
              <div class="overflow-hidden">
                <div 
                  class="flex space-x-4 animate-scroll"
                  :style="{ transform: `translateX(-${scrollOffset}px)` }"
                >
                  <div
                    v-for="product in newArrivals"
                    :key="`new-${product.id}`"
                    class="flex-none w-56 xl:w-64 bg-white rounded shadow overflow-hidden hover:shadow transition-shadow"
                  >
                    <img :src="product.image" :alt="product.name" class="w-full h-32 xl:h-40 object-cover">
                    <div class="p-3 xl:p-4">
                      <h3 class="font-semibold text-[#022b5f] text-sm mb-2 line-clamp-2">{{ product.name }}</h3>
                      <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-[#022b5f]">${{ product.price }}</span>
                        <span class="text-xs bg-[#fbb03b] text-white px-2 py-1 rounded-full">{{ product.category }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Categories Section -->
           <section>
              <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f] mb-4 xl:mb-6">Shop by Category</h2>
              <div class="overflow-x-auto pb-4">
                <div class="flex space-x-4 min-w-max">
                  <div
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category; showMobileFilters = false"
                    class="group relative bg-gradient-to-r from-[#022b5f] to-[#034080] rounded-2xl p-4 xl:p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#fbb03b] hover:to-[#e09a2a] overflow-hidden min-w-[180px] xl:min-w-[220px] h-24 xl:h-28 flex items-center"
                  >
                    <!-- Background Pattern -->
                    <div class="absolute inset-0 opacity-10">
                      <div class="absolute -top-2 -right-2 w-12 h-12 rounded bg-white/20"></div>
                      <div class="absolute -bottom-3 -left-3 w-8 h-8 rounded bg-white/10"></div>
                    </div>
                    
                    <div class="relative z-10 flex items-center space-x-3 xl:space-x-4 w-full">
                      <div class="w-12 h-12 xl:w-14 xl:h-14 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 flex-shrink-0">
                        <svg class="w-6 h-6 xl:w-7 xl:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-white text-sm xl:text-base group-hover:text-white transition-colors">{{ category }}</h3>
                        <div class="mt-1 w-8 h-0.5 bg-white/50 group-hover:w-12 group-hover:bg-white transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

             <section>
              <div class="flex items-center justify-between mb-4 xl:mb-6">
                <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f]">Top Ranking</h2>
                <button class="text-[#fbb03b] hover:text-[#e09a2a] font-medium text-sm">View All</button>
              </div>
              <div class="overflow-x-auto pb-4">
                <div class="flex space-x-4 min-w-max">
                  <div
                    v-for="(product, index) in topRanking"
                    :key="`desktop-ranking-${product.id}`"
                    class="group relative bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px] xl:min-w-[240px] h-80 xl:h-96 flex flex-col"
                  >
                    <!-- Rank Badge -->
                    <div class="absolute top-3 left-3 z-20">
                      <div class="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-white font-bold text-sm xl:text-base">{{ index + 1 }}</span>
                      </div>
                    </div>
                    
                    <!-- Product Image -->
                    <div class="relative h-40 xl:h-48 overflow-hidden">
                      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="flex-1 p-4 xl:p-5 flex flex-col">
                      <h3 class="font-bold text-[#022b5f] text-sm xl:text-base mb-2 line-clamp-2 group-hover:text-[#fbb03b] transition-colors">{{ product.name }}</h3>
                      <p class="text-gray-500 text-xs xl:text-sm mb-3 line-clamp-2 flex-1">{{ product.description }}</p>
                      
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <span class="text-lg xl:text-xl font-bold text-[#022b5f] group-hover:text-[#fbb03b] transition-colors">${{ product.price }}</span>
                          <span class="text-xs xl:text-sm bg-[#fbb03b] text-white px-2 py-1 rounded-full">{{ product.category }}</span>
                        </div>
                        
                        <div class="flex items-center text-xs xl:text-sm text-gray-500">
                          <svg class="w-3 h-3 xl:w-4 xl:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                          <span class="truncate">{{ product.marketplace }}</span>
                        </div>
                        
                        <button class="w-full bg-gradient-to-r from-[#fbb03b] to-[#e09a2a] text-white py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- All Products Section -->
            <section>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xl:mb-6">
                <div>
                  <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f]">All Products</h2>
                  <p class="text-gray-600 mt-1 text-sm">{{ filteredProducts.length }} products found</p>
                </div>
                <div class="mt-4 sm:mt-0 flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-700">Sort by:</span>
                  <select v-model="sortBy" class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm">
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

             
              <MainProductCard :products="paginatedProducts"/>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="mt-6 xl:mt-8 flex justify-center">
                <nav class="flex items-center space-x-2">
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'px-3 py-2 rounded-lg border text-sm',
                      page === currentPage ? 'bg-[#022b5f] text-white border-[#022b5f]' : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </section>
          </div>
        </main>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden space-y-6">
        <!-- New Arrivals Mobile -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-[#022b5f]">New Arrivals</h2>
            <button class="text-[#fbb03b] font-medium text-sm">View All</button>
          </div>
          <div class="flex space-x-3 overflow-x-auto pb-2">
            <div
              v-for="product in newArrivals.slice(0, 6)"
              :key="`mobile-new-${product.id}`"
              class="flex-none w-40 bg-white rounded overflow-hidden"
            >
              <img :src="product.image" :alt="product.name" class="w-full h-28 object-cover">
              <div class="p-3">
                <h3 class="font-semibold text-[#022b5f] text-xs mb-2 line-clamp-2">{{ product.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-[#022b5f]">${{ product.price }}</span>
                  <span class="text-xs bg-[#fbb03b] text-white px-1.5 py-0.5 rounded-full">{{ product.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Categories Mobile -->
         <section>
          <h2 class="text-xl font-bold text-[#022b5f] mb-4">Categories</h2>
          <div class="overflow-x-auto pb-4">
            <div class="flex space-x-3 min-w-max">
              <div
                v-for="category in categories"
                :key="`mobile-${category}`"
                @click="selectedCategory = category; showMobileFilters = false"
                class="group relative bg-gradient-to-r from-[#022b5f] to-[#034080] rounded p-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#fbb03b] hover:to-[#e09a2a] overflow-hidden min-w-[140px] h-20 flex items-center"
              >
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                  <div class="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/20"></div>
                  <div class="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-white/10"></div>
                </div>
                
                <div class="relative z-10 flex items-center space-x-3 w-full">
                  <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-white text-sm group-hover:text-white transition-colors">{{ category }}</h3>
                    <div class="mt-1 w-6 h-0.5 bg-white/50 group-hover:w-8 group-hover:bg-white transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Products Mobile -->
        <section>
  <h2 class="text-xl font-bold text-[#022b5f] mb-6">Featured Products</h2>
  
  <!-- Horizontal scrolling container -->
  <div class="relative">
    <!-- Scroll container -->
    <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
      <div
        v-for="(product, index) in topRanking.slice(0, 5)"
        :key="`ranking-${product.id}`"
        class="group relative bg-white rounded overflow-hidden hover:shadow-xl transition-all duration-300 flex-shrink-0 w-64 snap-start"
      >
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#022b5f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="relative z-10 p-6">
          <!-- Rank Badge - Top positioned -->
          <div class="flex justify-between items-start mb-4">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-lg flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
              </div>
              <!-- Decorative ring -->
              <div class="absolute -inset-1 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <!-- Product Image - Centered and larger -->
          <div class="flex justify-center mb-4">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-24 h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
            >
          </div>
          
          <!-- Product Info - Stacked vertically -->
          <div class="text-center space-y-3">
            <h3 class="font-bold text-[#022b5f] text-lg line-clamp-2 group-hover:text-[#fbb03b] transition-colors min-h-[3.5rem]">
              {{ product.name }}
            </h3>
            
            <p class="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">
              {{ product.description }}
            </p>
            
            <!-- Price -->
            <div class="py-2">
              <span class="text-2xl font-bold text-[#022b5f] group-hover:text-[#fbb03b] transition-colors">
                ${{ product.price }}
              </span>
            </div>
            
            <!-- Location -->
            <div class="flex items-center justify-center text-xs text-gray-500 mb-4">
              <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="truncate">{{ product.marketplace }}</span>
            </div>
            
            <!-- Action Button - Full width -->
            <button class="w-full bg-gradient-to-r from-[#fbb03b] to-[#e09a2a] text-white px-4 py-3 rounded text-sm font-medium shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Optional: Scroll indicators -->
    <div class="flex justify-center mt-4 space-x-2">
      <div
        v-for="(product, index) in topRanking.slice(0, 5)"
        :key="`indicator-${product.id}`"
        class="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-200"
        :class="{ 'bg-[#fbb03b]': index === 0 }"
      ></div>
    </div>
  </div>
</section>
        <!-- Mobile Products Grid -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold text-[#022b5f]">All Products</h2>
              <p class="text-gray-600 text-sm">{{ filteredProducts.length }} products</p>
            </div>
            <select v-model="sortBy" class="px-3 py-2 border border-gray-300 rounded text-sm">
              <option value="name">Name</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
            </select>
          </div>

          <MainProductCard :products="paginatedProducts" :mobile="true"/>

          <!-- Mobile Pagination -->
          <div v-if="totalPages > 1" class="mt-6 flex justify-center">
            <nav class="flex items-center space-x-1">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-2 py-2 rounded border border-gray-300 text-gray-500 disabled:opacity-50 text-sm"
              >
                Prev
              </button>
              <button
                v-for="page in visiblePages.slice(0, 5)"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-2 py-2 rounded-lg border text-sm',
                  page === currentPage ? 'bg-[#022b5f] text-white border-[#022b5f]' : 'border-gray-300 text-gray-500'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-2 py-2 rounded border border-gray-300 text-gray-500 disabled:opacity-50 text-sm"
              >
                Next
              </button>
            </nav>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MainProductCard from "../products/MainProductCard.vue"
import Header from "../products/ListingPageEssen/Header.vue"

// Reactive data
const selectedMarketplace = ref('amazon')
const showMobileFilters = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDuration = ref('')
const priceRange = ref({ min: null, max: null })
const sortBy = ref('name')
const currentPage = ref(1)
const scrollOffset = ref(0)
const itemsPerPage = 12

// Mock data
const marketplaces = ref([
  { id: 'all', name: 'All Marketplaces' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'ebay', name: 'eBay' },
  { id: 'etsy', name: 'Etsy' },
  { id: 'walmart', name: 'Walmart' }
])

const categories = ref([
  'Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors',
  'Books', 'Toys & Games', 'Health & Beauty', 'Automotive'
])

const durations = ref([
  '1-7 days', '1-2 weeks', '2-4 weeks', '1-2 months', '2+ months'
])

const products = ref([
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    category: 'Electronics',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer occasions',
    price: 45.50,
    category: 'Fashion',
    duration: '1-7 days',
    marketplace: 'Etsy',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Smart Home Security Camera',
    description: 'WiFi enabled security camera with night vision and mobile app',
    price: 129.99,
    category: 'Electronics',
    duration: '2-4 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap and alignment lines',
    price: 34.99,
    category: 'Sports & Outdoors',
    duration: '1-7 days',
    marketplace: 'Walmart',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Coffee Table Modern',
    description: 'Sleek modern coffee table with storage compartment',
    price: 199.99,
    category: 'Home & Garden',
    duration: '2+ months',
    marketplace: 'eBay',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Running Shoes Athletic',
    description: 'Comfortable running shoes with advanced cushioning technology',
    price: 79.99,
    category: 'Sports & Outdoors',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Skincare Set Organic',
    description: 'Complete organic skincare routine with cleanser, toner, and moisturizer',
    price: 65.00,
    category: 'Health & Beauty',
    duration: '1-7 days',
    marketplace: 'Etsy',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Smartphone Case Protective',
    description: 'Durable protective case with shock absorption and screen protection',
    price: 19.99,
    category: 'Electronics',
    duration: '1-7 days',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Kitchen Knife Set Professional',
    description: 'Professional chef knife set with magnetic block storage',
    price: 149.99,
    category: 'Home & Garden',
    duration: '1-2 weeks',
    marketplace: 'Walmart',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    name: 'Vintage Leather Jacket',
    description: 'Genuine leather jacket with vintage styling and premium quality',
    price: 189.99,
    category: 'Fashion',
    duration: '2-4 weeks',
    marketplace: 'eBay',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    name: 'Board Game Strategy',
    description: 'Engaging strategy board game for family game nights',
    price: 39.99,
    category: 'Toys & Games',
    duration: '1-7 days',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    name: 'Car Phone Mount Magnetic',
    description: 'Strong magnetic phone mount for car dashboard or windshield',
    price: 24.99,
    category: 'Automotive',
    duration: '1-7 days',
    marketplace: 'Walmart',
    image: 'https://images.unsplash.com/photo-1563299796-17596ed75c49?w=400&h=300&fit=crop'
  },
  {
    id: 13,
    name: 'Fitness Tracker Waterproof',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS',
    price: 99.99,
    category: 'Electronics',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop'
  },
  {
    id: 14,
    name: 'Succulent Plant Collection',
    description: 'Beautiful collection of low-maintenance succulent plants',
    price: 29.99,
    category: 'Home & Garden',
    duration: '1-7 days',
    marketplace: 'Etsy',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop'
  },
  {
    id: 15,
    name: 'Classic Novel Collection',
    description: 'Set of 10 classic literature novels in hardcover edition',
    price: 89.99,
    category: 'Books',
    duration: '2-4 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
  },
   {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    category: 'Electronics',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer occasions',
    price: 45.50,
    category: 'Fashion',
    duration: '1-7 days',
    marketplace: 'Etsy',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'
  },
   {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    category: 'Electronics',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer occasions',
    price: 45.50,
    category: 'Fashion',
    duration: '1-7 days',
    marketplace: 'Etsy',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'
  },
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    category: 'Electronics',
    duration: '1-2 weeks',
    marketplace: 'Amazon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
])

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by marketplace
  if (selectedMarketplace.value && selectedMarketplace.value !== 'all') {
    filtered = filtered.filter(p => p.marketplace.toLowerCase() === selectedMarketplace.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Filter by duration
  if (selectedDuration.value) {
    filtered = filtered.filter(p => p.duration === selectedDuration.value)
  }

  // Filter by price range
  if (priceRange.value.min !== null && !isNaN(priceRange.value.min)) {
    filtered = filtered.filter(p => p.price >= priceRange.value.min)
  }
  if (priceRange.value.max !== null && !isNaN(priceRange.value.max)) {
    filtered = filtered.filter(p => p.price <= priceRange.value.max)
  }

  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'duration':
      const durationOrder = ['1-7 days', '1-2 weeks', '2-4 weeks', '1-2 months', '2+ months']
      filtered.sort((a, b) => durationOrder.indexOf(a.duration) - durationOrder.indexOf(b.duration))
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return filtered
})

const newArrivals = computed(() => {
  // Return the 8 most recent products (simulate new arrivals)
  return products.value.slice(-8).reverse()
})

const topRanking = computed(() => {
  // Sort by price (high to low) to simulate popular/expensive items
  return [...products.value]
    .sort((a, b) => b.price - a.price)
    .slice(0, 10)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDuration.value = ''
  priceRange.value = { min: null, max: null }
  selectedMarketplace.value = 'all'
  currentPage.value = 1
}

// Auto-scroll for new arrivals
let scrollInterval = null

const startScrolling = () => {
  scrollInterval = setInterval(() => {
    const maxScroll = (newArrivals.value.length * 272) - window.innerWidth + 100
    if (scrollOffset.value >= maxScroll) {
      scrollOffset.value = 0
    } else {
      scrollOffset.value += 1
    }
  }, 50)
}

const stopScrolling = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

// Lifecycle
onMounted(() => {
  startScrolling()
})

onUnmounted(() => {
  stopScrolling()
})

// Watch for filter changes to reset pagination
const resetPagination = () => {
  currentPage.value = 1
}

// Watch computed properties for changes
const unwatchSearch = computed(() => searchQuery.value, resetPagination)
const unwatchCategory = computed(() => selectedCategory.value, resetPagination)
const unwatchDuration = computed(() => selectedDuration.value, resetPagination)
const unwatchPriceRange = computed(() => [priceRange.value.min, priceRange.value.max], resetPagination)
const unwatchMarketplace = computed(() => selectedMarketplace.value, resetPagination)
</script>



<style scoped>
h2, h3 {
  font-family: 'Poppins', sans-serif;
}

p, span, button {
  font-family: 'Inter', sans-serif;
}
/* Hide scrollbar for clean look */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Line clamp utilities */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>