<template>
  <section class="px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-[#022b5f] mb-3">
          Shop by Category
        </h2>
        <p class="text-gray-600 text-lg">Discover amazing products across all categories</p>
      </div>
      
      <!-- Mobile Grid -->
      <div class="md:hidden grid grid-cols-2 gap-4">
        <div
          v-for="(category, index) in categories"
          :key="`mobile-${category.id}`"
          @click="selectCategory(category.slug)"
          :class="[
            'group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105',
            'shadow-xl hover:shadow-2xl',
            index % 3 === 0 ? 'h-48' : index % 3 === 1 ? 'h-40' : 'h-44'
          ]"
        >
          <!-- Background Image -->
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10 p-4 h-full flex flex-col justify-between">
            <div class="flex justify-end">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-md rounded flex items-center justify-center group-hover:bg-[#fbb03b] group-hover:rotate-12 transition-all duration-300">
                <component 
                  :is="getCategoryIcon(category.slug)" 
                  class="w-5 h-5 text-white group-hover:text-[#022b5f] transition-colors duration-300"
                />
              </div>
            </div>
            
            <div>
              <h3 class="font-bold text-white text-base mb-1 group-hover:text-[#fbb03b] transition-colors duration-300">
                {{ category.name }}
              </h3>
              <p class="text-white/80 text-sm">{{ category.itemCount.toLocaleString() }} items</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Masonry Grid -->
      <div class="hidden md:grid md:grid-cols-12 gap-6 auto-rows-min">
        <!-- Large Featured Card -->
        <div
          v-if="categories[0]"
          @click="selectCategory(categories[0].slug)"
          class="group col-span-6 lg:col-span-5 row-span-2 relative rounded overflow-hidden cursor-pointer 
          transition-all duration-500 hover:scale-105 hover:shadow-3xl h-80 lg:h-96"
        >
          <div class="absolute inset-0">
            <img 
              :src="categories[0].image" 
              :alt="categories[0].name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-[#022b5f]/80 via-[#022b5f]/60 to-black/80"></div>
          </div>
          
          <div class="relative z-10 p-8 h-full flex flex-col justify-between">
            <div class="flex justify-end">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center 
              justify-center group-hover:bg-[#fbb03b] group-hover:rotate-12 transition-all duration-500">
                <component 
                  :is="getCategoryIcon(categories[0].slug)" 
                  class="w-8 h-8 text-white group-hover:text-[#022b5f] transition-colors duration-300"
                />
              </div>
            </div>
            
            <div>
              <span class="inline-block px-4 py-2 bg-[#fbb03b] text-[#022b5f] text-sm font-semibold rounded-full mb-4">
                Featured
              </span>
              <h3 class="font-bold text-white text-3xl mb-2 group-hover:text-[#fbb03b] transition-colors duration-300">
                {{ categories[0].name }}
              </h3>
              <p class="text-white/90 text-lg mb-4">{{ categories[0].description }}</p>
              <p class="text-white/80">{{ categories[0].itemCount.toLocaleString() }} items available</p>
            </div>
          </div>
        </div>

        <!-- Medium Cards -->
        <div
          v-for="category in categories.slice(1, 5)"
          :key="`medium-${category.id}`"
          @click="selectCategory(category.slug)"
          class="group col-span-6 lg:col-span-3 xl:col-span-3 relative rounded-3xl 
          overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow h-48"
        >
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          </div>
          
          <div class="relative z-10 p-6 h-full flex flex-col justify-between">
            <div class="flex justify-end">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl 
              flex items-center justify-center group-hover:bg-[#fbb03b] group-hover:rotate-12 transition-all duration-300">
                <component 
                  :is="getCategoryIcon(category.slug)" 
                  class="w-6 h-6 text-white group-hover:text-[#022b5f] transition-colors duration-300"
                />
              </div>
            </div>
            
            <div>
              <h3 class="font-bold text-white text-xl mb-1 group-hover:text-[#fbb03b] transition-colors duration-300">
                {{ category.name }}
              </h3>
              <p class="text-white/80">{{ category.itemCount.toLocaleString() }} items</p>
            </div>
          </div>
        </div>

        <!-- Small Cards -->
        <div
          v-for="category in categories.slice(5, 9)"
          :key="`small-${category.id}`"
          @click="selectCategory(category.slug)"
          class="group col-span-6 md:col-span-3 lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer transition-all 
          duration-500 hover:scale-105 hover:shadow h-36"
        >
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          </div>
          
          <div class="relative z-10 p-4 h-full flex flex-col justify-between">
            <div class="flex justify-end">
              <div class="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-[#fbb03b] group-hover:rotate-12 transition-all duration-300">
                <component 
                  :is="getCategoryIcon(category.slug)" 
                  class="w-4 h-4 text-white group-hover:text-[#022b5f] transition-colors duration-300"
                />
              </div>
            </div>
            
            <div>
              <h3 class="font-bold text-white text-sm mb-1 group-hover:text-[#fbb03b] transition-colors duration-300">
                {{ category.name }}
              </h3>
              <p class="text-white/80 text-xs">{{ category.itemCount.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Wide Cards -->
        <div
          v-for="category in categories.slice(9, 11)"
          :key="`wide-${category.id}`"
          @click="selectCategory(category.slug)"
          class="group col-span-12 md:col-span-6 relative rounded-3xl overflow-hidden cursor-pointer 
          transition-all duration-500 hover:scale-105 hover:shadow h-40"
        >
          <div class="absolute inset-0">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70"></div>
          </div>
          
          <div class="relative z-10 p-6 h-full flex items-center justify-between">
            <div>
              <h3 class="font-bold text-white text-2xl mb-2 group-hover:text-[#fbb03b] transition-colors duration-300">
                {{ category.name }}
              </h3>
              <p class="text-white/90 mb-1">{{ category.description }}</p>
              <p class="text-white/80">{{ category.itemCount.toLocaleString() }} items</p>
            </div>
            
            <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center group-hover:bg-[#fbb03b] group-hover:rotate-12 transition-all duration-500">
              <component 
                :is="getCategoryIcon(category.slug)" 
                class="w-8 h-8 text-white group-hover:text-[#022b5f] transition-colors duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <button class="group bg-gradient-to-r from-[#fbb03b] to-[#e09a2a]
         hover:from-[#e09d35] hover:to-[#d18d26] text-[#022b5f]
         px-8 py-4 rounded font-semibold transition-all duration-300 hover:scale-105 hover:shadow text-lg">
          <span class="flex items-center space-x-2">
            <span>Explore All Categories</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Sample data
const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and tech accessories',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 15420
  },
  {
    id: 2,
    name: 'Fashion & Style',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 28750
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 12300
  },
  {
    id: 4,
    name: 'Automotive',
    slug: 'automotive',
    description: 'Cars, parts and accessories',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 8950
  },
  {
    id: 5,
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Athletic gear and equipment',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 6780
  },
  {
    id: 6,
    name: 'Books & Media',
    slug: 'books',
    description: 'Books, movies and music',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 4320
  },
  {
    id: 7,
    name: 'Toys & Games',
    slug: 'toys',
    description: 'Fun for all ages',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 3450
  },
  {
    id: 8,
    name: 'Beauty & Health',
    slug: 'beauty',
    description: 'Skincare and wellness',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 5670
  },
  {
    id: 9,
    name: 'Food & Beverages',
    slug: 'food',
    description: 'Gourmet and specialty foods',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 2890
  },
  {
    id: 10,
    name: 'Art & Collectibles',
    slug: 'art',
    description: 'Unique pieces and collectibles',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 1240
  },
  {
    id: 11,
    name: 'Music & Instruments',
    slug: 'music',
    description: 'Musical instruments and equipment',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 1890
  }
])

// Props (if needed)
const props = defineProps({
  selectedCategory: {
    type: String,
    default: ''
  },
  showMobileFilters: {
    type: Boolean,
    default: false
  }
})

// Emits (if needed)
const emit = defineEmits(['update:selectedCategory', 'update:showMobileFilters'])

// Methods
const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

const getCategoryIcon = (categorySlug) => {
  // For this example, we'll use simple SVG icons inline
  // In a real app, you'd import from an icon library
  return 'div' // placeholder
}

const selectCategory = (categorySlug) => {
  emit('update:selectedCategory', categorySlug)
  emit('update:showMobileFilters', false)
}
</script>

<style scoped>
/* Enhanced shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth scroll for mobile */
@supports (scroll-behavior: smooth) {
  .overflow-x-auto {
    scroll-behavior: smooth;
  }
}

/* Focus states for accessibility */
.group:focus {
  outline: 2px solid #fbb03b;
  outline-offset: 2px;
}
</style>