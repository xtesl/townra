<template>
  <div class="min-h-screen bg-white">
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
            <h2 class="text-lg font-semibold text-[#022b5f] mb-4 xl:mb-6">
              Filters
            </h2>

            <div class="space-y-4 xl:space-y-6">
              <!-- Search -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Search</label
                >
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm"
                />
              </div>

              <!-- Category Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Category</label
                >
                <select
                  v-model="selectedCategory"
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm"
                >
                  <option value="">All Categories</option>
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Price Range Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Price Range</label
                >
                <div class="grid grid-cols-2 gap-2">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    placeholder="Min"
                    class="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b]"
                  />
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    placeholder="Max"
                    class="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b]"
                  />
                </div>
              </div>

              <!-- Duration Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Duration</label
                >
                <select
                  v-model="selectedDuration"
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm"
                >
                  <option value="">Any Duration</option>
                  <option
                    v-for="duration in durations"
                    :key="duration"
                    :value="duration"
                  >
                    {{ duration }}
                  </option>
                </select>
              </div>

              <button
                @click="clearFilters"
                class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
              >
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
    <button class="flex items-center text-[#fbb03b] hover:text-[#e09a2a] font-medium text-sm transition-colors">
      View All
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
  <div class="overflow-x-auto scrollbar-hide">
    <div class="flex space-x-3 sm:space-x-4 pb-2">
      <div
        v-for="product in newArrivals"
        :key="`new-${product.id}`"
        class="flex-none w-48 sm:w-52 md:w-56 xl:w-64 bg-white rounded overflow-hidden hover:shadow
         hover:border-[#fbb03b] transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Product Image -->
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full h-48 sm:h-52 xl:h-56 object-cover">
          <!-- Badges -->
          <div class="absolute top-2 left-2 flex flex-col space-y-1">
            <span v-if="product.isVerified" class="text-xs bg-green-500 text-white px-2 py-1 rounded font-medium flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Verified
            </span>
          </div>
          <!-- Discount Badge -->
          <div v-if="product.discount" class="absolute top-2 right-2">
            <span class="text-xs bg-[#fbb03b] text-white px-2 py-1 rounded-full font-bold">-{{ product.discount }}%</span>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="p-3 xl:p-4">
          <!-- Product Name -->
          <h3 class="font-semibold text-[#022b5f] text-sm mb-2 line-clamp-2 leading-tight">{{ product.name }}</h3>
          
          <!-- Price Section -->
          <div class="mb-2">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-[#022b5f]">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice }}</span>
            </div>
            <span class="text-xs text-gray-500">/ piece</span>
          </div>
          
          <!-- MOQ and Supplier Info -->
          <div class="space-y-1 mb-3">
            <div class="flex items-center justify-between text-xs text-gray-600">
              <span>MOQ: {{ product.moq || '1' }} piece</span>
              <span class="text-green-600 font-medium">{{ product.availability || 'In Stock' }}</span>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ product.supplier || 'Verified Supplier' }}</span>
            </div>
          </div>
          
          <!-- Bottom Section -->
          <div class="flex items-center justify-between">
            
            <!-- Rating -->
            <div class="flex items-center space-x-1">
              <div class="flex text-[#fbb03b]">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span class="text-xs text-gray-500">{{ product.rating || '4.8' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

            <!-- Categories Section -->

            <!-- <Categories :categories="categories" /> -->
            <FeaturedProducts :topRanking="topRanking" />

            <!-- All Products Section -->
            <section>
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xl:mb-6"
              >
                <div>
                  <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f]">
                    All Products
                  </h2>
                  <p class="text-gray-600 mt-1 text-sm">
                    {{ filteredProducts.length }} products found
                  </p>
                </div>
                <div class="mt-4 sm:mt-0 flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-700"
                    >Sort by:</span
                  >
                  <select
                    v-model="sortBy"
                    class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbb03b] text-sm"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

              <MainProductCard :products="paginatedProducts" />

              <!-- Pagination -->
              <div
                v-if="totalPages > 1"
                class="mt-6 xl:mt-8 flex justify-center"
              >
                <nav class="flex items-center space-x-2">
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'px-3 py-2 rounded border text-sm',
                      page === currentPage
                        ? 'bg-[#022b5f] text-white border-[#022b5f]'
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50',
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
        <!-- <section>
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
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-28 object-cover"
              />
              <div class="p-3">
                <h3
                  class="font-semibold text-[#022b5f] text-xs mb-2 line-clamp-2"
                >
                  {{ product.name }}
                </h3>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-[#022b5f]"
                    >${{ product.price }}</span
                  >
                  <span
                    class="text-xs bg-[#fbb03b] text-white px-1.5 py-0.5 rounded-full"
                    >{{ product.category }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section> -->
        <section>
  <div class="flex items-center justify-between mb-4 xl:mb-6">
    <h2 class="text-xl xl:text-2xl font-bold text-[#022b5f]">New Arrivals</h2>
    <button class="flex items-center text-[#fbb03b] hover:text-[#e09a2a] font-medium text-sm transition-colors">
      View All
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
  <div class="overflow-x-auto scrollbar-hide">
    <div class="flex space-x-3 sm:space-x-4 pb-2">
      <div
        v-for="product in newArrivals"
        :key="`new-${product.id}`"
        class="flex-none w-48 sm:w-52 md:w-56 xl:w-64 bg-white rounded overflow-hidden hover:shadow
        transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Product Image -->
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full h-48 sm:h-52 xl:h-56 object-cover">
          <!-- Badges -->
          <div class="absolute top-2 left-2 flex flex-col space-y-1">
            <!-- <span class="text-xs bg-[#022b5f] text-white px-2 py-1 rounded font-medium">NEW</span> -->
            <span v-if="product.isVerified" class="text-xs bg-green-500 text-white px-2 py-1 rounded font-medium flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Verified
            </span>
          </div>
          <!-- Discount Badge -->
          <div v-if="product.discount" class="absolute top-2 right-2">
            <span class="text-xs bg-[#fbb03b] text-white px-2 py-1 rounded-full font-bold">-{{ product.discount }}%</span>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="p-3 xl:p-4">
          <!-- Product Name -->
          <h3 class="font-semibold text-[#022b5f] text-sm mb-2 line-clamp-2 leading-tight">{{ product.name }}</h3>
          
          <!-- Price Section -->
          <div class="mb-2">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-[#022b5f]">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice }}</span>
            </div>
            <span class="text-xs text-gray-500">/ piece</span>
          </div>
          
          <!-- MOQ and Supplier Info -->
          <div class="space-y-1 mb-3">
            <div class="flex items-center justify-between text-xs text-gray-600">
              <span>MOQ: {{ product.moq || '1' }} piece</span>
              <span class="text-green-600 font-medium">{{ product.availability || 'In Stock' }}</span>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ product.supplier || 'Verified Supplier' }}</span>
            </div>
          </div>
          
          <!-- Bottom Section -->
          <div class="flex items-center justify-between">
            <!-- Rating -->
            <div class="flex items-center space-x-1">
              <div class="flex text-[#fbb03b]">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span class="text-xs text-gray-500">{{ product.rating || '4.8' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <!-- Categories Mobile -->

        <!-- <Categories :categories="categories" /> -->
        <FeaturedProducts :topRanking="topRanking" />

        <!-- Mobile Products Grid -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold text-[#022b5f]">All Products</h2>
              <p class="text-gray-600 text-sm">
                {{ filteredProducts.length }} products
              </p>
            </div>
            <select
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="name">Name</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
            </select>
          </div>

          <MainProductCard :products="paginatedProducts" :mobile="true" />

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
                  page === currentPage
                    ? 'bg-[#022b5f] text-white border-[#022b5f]'
                    : 'border-gray-300 text-gray-500',
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import MainProductCard from "../products/MainProductCard.vue";
import Header from "../products/ListingPageEssen/Header.vue";
import FeaturedProducts from "../products/ListingPageEssen/FeaturedProducts.vue";
import Categories from "../products/ListingPageEssen/Categories.vue";

// Reactive data
const selectedMarketplace = ref("amazon");
const showMobileFilters = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedDuration = ref("");
const priceRange = ref({ min: null, max: null });
const sortBy = ref("name");
const currentPage = ref(1);
const scrollOffset = ref(0);
const itemsPerPage = 12;

// Mock data
const marketplaces = ref([
  { id: "all", name: "All Marketplaces" },
  { id: "amazon", name: "Amazon" },
  { id: "ebay", name: "eBay" },
  { id: "etsy", name: "Etsy" },
  { id: "walmart", name: "Walmart" },
]);

const categories = ref([
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Health & Beauty",
  "Automotive",
]);

const durations = ref([
  "1-7 days",
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "2+ months",
]);

const products = ref([
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 89.99,
    category: "Electronics",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    description: "Beautiful floral print dress perfect for summer occasions",
    price: 45.5,
    category: "Fashion",
    duration: "1-7 days",
    marketplace: "Etsy",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Smart Home Security Camera",
    description:
      "WiFi enabled security camera with night vision and mobile app",
    price: 129.99,
    category: "Electronics",
    duration: "2-4 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with carrying strap and alignment lines",
    price: 34.99,
    category: "Sports & Outdoors",
    duration: "1-7 days",
    marketplace: "Walmart",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Coffee Table Modern",
    description: "Sleek modern coffee table with storage compartment",
    price: 199.99,
    category: "Home & Garden",
    duration: "2+ months",
    marketplace: "eBay",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Running Shoes Athletic",
    description:
      "Comfortable running shoes with advanced cushioning technology",
    price: 79.99,
    category: "Sports & Outdoors",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Skincare Set Organic",
    description:
      "Complete organic skincare routine with cleanser, toner, and moisturizer",
    price: 65.0,
    category: "Health & Beauty",
    duration: "1-7 days",
    marketplace: "Etsy",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Smartphone Case Protective",
    description:
      "Durable protective case with shock absorption and screen protection",
    price: 19.99,
    category: "Electronics",
    duration: "1-7 days",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Kitchen Knife Set Professional",
    description: "Professional chef knife set with magnetic block storage",
    price: 149.99,
    category: "Home & Garden",
    duration: "1-2 weeks",
    marketplace: "Walmart",
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Vintage Leather Jacket",
    description:
      "Genuine leather jacket with vintage styling and premium quality",
    price: 189.99,
    category: "Fashion",
    duration: "2-4 weeks",
    marketplace: "eBay",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Board Game Strategy",
    description: "Engaging strategy board game for family game nights",
    price: 39.99,
    category: "Toys & Games",
    duration: "1-7 days",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Car Phone Mount Magnetic",
    description: "Strong magnetic phone mount for car dashboard or windshield",
    price: 24.99,
    category: "Automotive",
    duration: "1-7 days",
    marketplace: "Walmart",
    image:
      "https://images.unsplash.com/photo-1563299796-17596ed75c49?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "Fitness Tracker Waterproof",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 99.99,
    category: "Electronics",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    name: "Succulent Plant Collection",
    description: "Beautiful collection of low-maintenance succulent plants",
    price: 29.99,
    category: "Home & Garden",
    duration: "1-7 days",
    marketplace: "Etsy",
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "Classic Novel Collection",
    description: "Set of 10 classic literature novels in hardcover edition",
    price: 89.99,
    category: "Books",
    duration: "2-4 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  },
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 89.99,
    category: "Electronics",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    description: "Beautiful floral print dress perfect for summer occasions",
    price: 45.5,
    category: "Fashion",
    duration: "1-7 days",
    marketplace: "Etsy",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
  },
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 89.99,
    category: "Electronics",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    description: "Beautiful floral print dress perfect for summer occasions",
    price: 45.5,
    category: "Fashion",
    duration: "1-7 days",
    marketplace: "Etsy",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
  },
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 89.99,
    category: "Electronics",
    duration: "1-2 weeks",
    marketplace: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
]);

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by marketplace
  if (selectedMarketplace.value && selectedMarketplace.value !== "all") {
    filtered = filtered.filter(
      (p) => p.marketplace.toLowerCase() === selectedMarketplace.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.category === selectedCategory.value);
  }

  // Filter by duration
  if (selectedDuration.value) {
    filtered = filtered.filter((p) => p.duration === selectedDuration.value);
  }

  // Filter by price range
  if (priceRange.value.min !== null && !isNaN(priceRange.value.min)) {
    filtered = filtered.filter((p) => p.price >= priceRange.value.min);
  }
  if (priceRange.value.max !== null && !isNaN(priceRange.value.max)) {
    filtered = filtered.filter((p) => p.price <= priceRange.value.max);
  }

  // Sort products
  switch (sortBy.value) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "duration":
      const durationOrder = [
        "1-7 days",
        "1-2 weeks",
        "2-4 weeks",
        "1-2 months",
        "2+ months",
      ];
      filtered.sort(
        (a, b) =>
          durationOrder.indexOf(a.duration) - durationOrder.indexOf(b.duration)
      );
      break;
    case "name":
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filtered;
});

const newArrivals = computed(() => {
  // Return the 8 most recent products (simulate new arrivals)
  return products.value.slice(-8).reverse();
});

const topRanking = computed(() => {
  // Sort by price (high to low) to simulate popular/expensive items
  return [...products.value].sort((a, b) => b.price - a.price).slice(0, 10);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedDuration.value = "";
  priceRange.value = { min: null, max: null };
  selectedMarketplace.value = "all";
  currentPage.value = 1;
};

// Auto-scroll for new arrivals
let scrollInterval = null;

const startScrolling = () => {
  scrollInterval = setInterval(() => {
    const maxScroll = newArrivals.value.length * 272 - window.innerWidth + 100;
    if (scrollOffset.value >= maxScroll) {
      scrollOffset.value = 0;
    } else {
      scrollOffset.value += 1;
    }
  }, 50);
};

const stopScrolling = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
};

// Lifecycle
onMounted(() => {
  startScrolling();
});

onUnmounted(() => {
  stopScrolling();
});

// Watch for filter changes to reset pagination
const resetPagination = () => {
  currentPage.value = 1;
};

// Watch computed properties for changes
const unwatchSearch = computed(() => searchQuery.value, resetPagination);
const unwatchCategory = computed(() => selectedCategory.value, resetPagination);
const unwatchDuration = computed(() => selectedDuration.value, resetPagination);
const unwatchPriceRange = computed(
  () => [priceRange.value.min, priceRange.value.max],
  resetPagination
);
const unwatchMarketplace = computed(
  () => selectedMarketplace.value,
  resetPagination
);
</script>

<style scoped>
h2,
h3 {
  font-family: "Poppins", sans-serif;
}

p,
span,
button {
  font-family: "Inter", sans-serif;
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
