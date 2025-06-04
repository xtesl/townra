<template>
       <!-- Featured Products Section -->
<section class="py-8">
  <!-- Section Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="text-2xl md:text-3xl font-bold text-[#022b5f] mb-2">Featured Products</h2>
      <p class="text-gray-600 text-sm md:text-base">Discover our top-rated marketplace offerings</p>
    </div>
    <div class="hidden md:flex items-center space-x-2 text-sm text-gray-500">
      <span>Swipe to explore</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
  
  <!-- Horizontal Scrolling Container -->
  <div class="relative">
    <!-- Scroll Container -->
    <div class="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth">
      <div
        v-for="(product, index) in topRanking.slice(0, 5)"
        :key="`ranking-${product.id}`"
        class="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl 
        transition-all duration-500 flex-shrink-0 w-72 md:w-80 snap-start transform hover:-translate-y-2"
      >
        <!-- Rank Badge - Floating -->
        <div class="absolute top-4 left-4 z-20">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-[#fbb03b] via-[#e09a2a] to-[#d4941f]
             rounded-full flex items-center justify-center border-3 border-white">
              <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
            </div>
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#fbb03b] to-[#e09a2a] rounded-full 
            opacity-30 blur-lg scale-110 group-hover:scale-125 transition-transform duration-500"></div>
          </div>
        </div>

        <!-- Featured Badge for #1 -->
        <div v-if="index === 0" class="absolute top-4 right-4 z-20">
          <div class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ FEATURED
          </div>
        </div>
        
        <!-- Product Image - Large and Prominent -->
        <div class="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 25px 25px, #022b5f 2px, transparent 0), radial-gradient(circle at 75px 75px, #fbb03b 2px, transparent 0); background-size: 100px 100px;"></div>
          </div>
          
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          >
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent 
          to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Quick action overlay -->
          <div class="absolute inset-0 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button class="bg-white/90 backdrop-blur-sm text-[#022b5f] px-6 py-3 
            rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white">
              Quick View
            </button>
          </div>
        </div>
        
        <!-- Product Content -->
        <div class="p-6 space-y-4">
          <!-- Product Name -->
          <h3 class="font-bold text-[#022b5f] text-xl md:text-2xl line-clamp-2 group-hover:text-[#fbb03b] transition-colors duration-300 min-h-[3.5rem] leading-tight">
            {{ product.name }}
          </h3>
          
          <!-- Product Description -->
          <p class="text-gray-600 text-sm md:text-base line-clamp-3 min-h-[4.5rem] leading-relaxed">
            {{ product.description }}
          </p>
          
          <!-- Price and Location Row -->
          <div class="flex items-center justify-between pt-2">
            <div class="flex flex-col">
              <span class="text-3xl md:text-4xl font-bold text-[#022b5f] group-hover:text-[#fbb03b] transition-colors duration-300">
                ${{ product.price }}
              </span>
              <span class="text-xs text-gray-500 mt-1">Best price</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              <svg class="w-4 h-4 mr-2 text-[#fbb03b]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span class="truncate max-w-[100px]">{{ product.marketplace }}</span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button class="flex-1 bg-gradient-to-r from-[#fbb03b] via-[#e09a2a] to-[#d4941f] text-white px-6 py-3 rounded font-semibold
              hover:shadow transform hover:scale-105 transition-all duration-300 text-sm md:text-base">
              View Details
            </button>
            <button class="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Bottom accent line -->
        <div class="absolute bottom-0 left-0 right-0 h-1 
        bg-gradient-to-r from-[#fbb03b] to-[#e09a2a] transform scale-x-0 group-hover:scale-x-100 
        transition-transform duration-500 origin-left"></div>
      </div>
    </div>
    
    <!-- Scroll Indicators with Progress -->
    <div class="flex justify-center mt-8 space-x-3">
      <div
        v-for="(product, index) in topRanking.slice(0, 5)"
        :key="`indicator-${product.id}`"
        class="relative cursor-pointer group"
      >
        <div class="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors duration-200"
             :class="{ 'bg-[#fbb03b] shadow-lg': index === 0 }">
        </div>
        <div class="absolute -inset-2 rounded-full border-2 border-[#fbb03b] opacity-0 scale-75 transition-all duration-200"
             :class="{ 'opacity-100 scale-100': index === 0 }">
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Enhancement: Swipe Hint -->
  <div class="md:hidden flex items-center justify-center mt-6 text-gray-500">
    <div class="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <span class="text-sm">Swipe to see more</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</section>
</template>


<script setup>
  const props = defineProps({
    topRanking: {
        type: Object,
        required: true
    }
  })
</script>


<style scoped>
/* Custom scrollbar hiding */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling enhancement */
@media (prefers-reduced-motion: no-preference) {
  .scroll-smooth {
    scroll-behavior: smooth;
  }
}
</style>