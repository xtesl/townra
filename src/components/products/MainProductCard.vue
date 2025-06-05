<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- Mobile View - 2 columns, full width -->
    <div v-if="isMobile" class="grid grid-cols-2 gap-1">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white overflow-hidden hover:shadow transition-all duration-300"
      >
        <!-- Product Image -->
        <div class="relative aspect-square overflow-hidden">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div v-if="product.discount" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            -{{ product.discount }}%
          </div>
          <button class="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full transition-all duration-200">
            <svg class="w-3 h-3 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
        
        <!-- Product Details -->
        <div class="p-3">
          <h3 class="text-xs font-medium text-gray-900 line-clamp-2 mb-2 leading-tight min-h-[2rem]">
            {{ product.name }}
          </h3>
          
          <!-- Price -->
          <div class="flex items-center space-x-1 mb-2">
            <span class="text-[#ff6b35] font-bold text-sm">
              ${{ product.price }}
            </span>
            <span v-if="product.originalPrice" class="text-gray-400 text-xs line-through">
              ${{ product.originalPrice }}
            </span>
          </div>
          
          <!-- Rating and Orders -->
          <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div class="flex items-center">
              <div class="flex text-yellow-400 mr-1">
                <span v-for="i in 5" :key="i" class="text-xs">
                  {{ i <= Math.floor(product.rating) ? '★' : '☆' }}
                </span>
              </div>
              <span class="text-xs">{{ product.rating }}</span>
            </div>
            <span class="text-xs text-green-600 font-medium">{{ product.orders }} sold</span>
          </div>
          
          <!-- Location -->
          <div class="flex items-center text-xs text-gray-500 mb-3">
            <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="truncate">{{ product.location }}</span>
          </div>
          
          <!-- Action Button -->
          <button class="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white text-xs py-2 rounded-lg hover:from-[#e55a2b] hover:to-[#de7f0a] transition-all duration-200 font-semibold hover:shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop View - Responsive grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
      >
        <!-- Product Image -->
        <div class="relative aspect-square overflow-hidden bg-gray-50">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div v-if="product.discount" class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
            -{{ product.discount }}%
          </div>
          <button class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100">
            <svg class="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <!-- Quick View Overlay -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button class="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Quick View
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-4">
          <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 leading-tight min-h-[2.5rem] group-hover:text-[#ff6b35] transition-colors duration-200">
            {{ product.name }}
          </h3>
          
          <!-- Price -->
          <div class="flex items-center space-x-2 mb-3">
            <span class="text-[#ff6b35] font-bold text-lg">
              ${{ product.price }}
            </span>
            <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through">
              ${{ product.originalPrice }}
            </span>
          </div>
          
          <!-- Rating and Orders -->
          <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div class="flex items-center">
              <div class="flex text-yellow-400 mr-2">
                <span v-for="i in 5" :key="i" class="text-sm">
                  {{ i <= Math.floor(product.rating) ? '★' : '☆' }}
                </span>
              </div>
              <span class="text-sm font-medium">{{ product.rating }}</span>
            </div>
            <span class="text-sm text-green-600 font-semibold">{{ product.orders }} sold</span>
          </div>
          
          <!-- Location and Shipping -->
          <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="truncate">{{ product.location }}</span>
            </div>
            <div class="flex items-center text-green-600 font-medium">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Free shipping
            </div>
          </div>
          
          <!-- Action Button -->
          <button class="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white py-3 
          rounded-xl hover:from-[#e55a2b] hover:to-[#de7f0a] transition-all duration-200 font-semibold 
            transform hover:scale-[1.02] group-hover:animate-pulse">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="relative">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#ff6b35] border-t-transparent absolute top-0 left-0"></div>
      </div>
      <span class="ml-4 text-gray-600 font-medium">Loading more products...</span>
    </div>

    <!-- End of Results -->
    <div v-if="!hasMore && products.length > 0" class="text-center py-12 bg-white rounded-2xl mx-4">
      <div class="text-6xl mb-4">🎉</div>
      <p class="text-gray-600 font-medium text-lg">You've seen all our amazing products!</p>
      <p class="text-gray-500 text-sm mt-2">Check back later for new arrivals</p>
    </div>

    <!-- Observer Element -->
    <div ref="observerTarget" class="h-10"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Reactive data
const products = ref([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const observerTarget = ref(null)
let observer = null

// Check if mobile
const isMobile = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768
  }
  return false
})

// Sample product data generator
const generateProducts = (pageNum) => {
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports', 'Books']
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']
  const productNames = [
    'Premium Wireless Headphones',
    'Smart Fitness Watch',
    'Organic Cotton T-Shirt',
    'LED Desk Lamp',
    'Bluetooth Speaker',
    'Skincare Set',
    'Running Shoes',
    'Coffee Maker',
    'Phone Case',
    'Laptop Stand'
  ]

  return Array.from({ length: 20 }, (_, index) => {
    const basePrice = Math.random() * 200 + 20
    const hasDiscount = Math.random() > 0.7
    const discount = hasDiscount ? Math.floor(Math.random() * 40 + 10) : 0
    const originalPrice = hasDiscount ? (basePrice / (1 - discount / 100)).toFixed(2) : null

    return {
      id: (pageNum - 1) * 20 + index + 1,
      name: productNames[Math.floor(Math.random() * productNames.length)] + ` ${(pageNum - 1) * 20 + index + 1}`,
      price: basePrice.toFixed(2),
      originalPrice,
      discount: hasDiscount ? discount : null,
      rating: (Math.random() * 2 + 3).toFixed(1),
      orders: Math.floor(Math.random() * 1000 + 100),
      location: locations[Math.floor(Math.random() * locations.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      image: `https://picsum.photos/400/300?random=${(pageNum - 1) * 20 + index + 1}`
    }
  })
}

// Load more products
const loadMoreProducts = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newProducts = generateProducts(page.value)
  
  if (newProducts.length < 20 || page.value >= 10) {
    hasMore.value = false
  }

  products.value.push(...newProducts)
  page.value += 1
  loading.value = false
}

// Initialize intersection observer
const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loading.value) {
        loadMoreProducts()
      }
    },
    {
      threshold: 0.1
    }
  )

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
}

// Lifecycle hooks
onMounted(() => {
  loadMoreProducts() // Load initial products
  initObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>