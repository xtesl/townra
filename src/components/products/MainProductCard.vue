<template>
     <div class="mobile" v-if="mobile">
                     <div class="grid grid-cols-2 gap-3">
            <div
              v-for="product in products"
              :key="`mobile-${product.id}`"
              class="bg-white rounded overflow-hidden"
            >
              <img :src="product.image" :alt="product.name" class="w-full h-32 object-cover">
              <div class="p-3">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-sm font-semibold text-[#022b5f] line-clamp-2 pr-1">{{ product.name }}</h3>
                  <span class="text-xs bg-[#fbb03b] text-white px-1.5 py-0.5 rounded font-medium flex-shrink-0">{{ product.category }}</span>
                </div>
                <p class="text-gray-600 text-xs mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-[#022b5f]">${{ product.price }}</span>
                    <span class="text-xs text-gray-500">{{ product.duration }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center text-xs text-gray-500">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <span class="truncate">{{ product.marketplace }}</span>
                    </div>
                    <button class="bg-[#fbb03b] text-white px-2 py-1 rounded text-xs font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
              </div>

     <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-6" v-else>
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="bg-white rounded shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img :src="product.image" :alt="product.name" class="w-full h-40 xl:h-48 object-cover">
                  <div class="p-4 xl:p-6">
                    <div class="flex items-start justify-between mb-2">
                      <h3 class="text-base xl:text-lg font-semibold text-[#022b5f] line-clamp-2 pr-2">{{ product.name }}</h3>
                      <span class="text-xs bg-[#fbb03b] text-white px-2 py-1 rounded-full font-medium flex-shrink-0">{{ product.category }}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 xl:mb-4 line-clamp-2">{{ product.description }}</p>
                    <div class="flex items-center justify-between mb-3 xl:mb-4">
                      <div class="flex items-center space-x-3 xl:space-x-4">
                        <span class="text-xl xl:text-2xl font-bold text-[#022b5f]">${{ product.price }}</span>
                        <span class="text-sm text-gray-500 font-medium">{{ product.duration }}</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <span class="truncate">{{ product.marketplace }}</span>
                      </div>
                      <button class="bg-[#fbb03b] text-white px-3 xl:px-4 py-2 rounded hover:bg-[#e09a2a] transition-colors duration-200 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>


             
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({

    products: {
        type: Object,
        required: true
    },
    mobile: {
        type: Boolean,
        required: false,
        default: false
    }
  })

</script>
 
<style scoped>

</style>