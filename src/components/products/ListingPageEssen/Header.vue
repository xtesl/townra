<template>
  <header class="bg-white border-gray-200  top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center h-12 sm:h-14">
        
        <!-- Desktop Tabs -->
        <div class="hidden sm:flex items-center space-x-1">
          <button
            v-for="marketplace in marketplaces"
            :key="marketplace.id"
            :class="[
              'px-6 py-2 text-sm font-medium border-b transition-colors duration-200',
              selectedMarketplace === marketplace.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ marketplace.name }}
          </button>
        </div>

        <!-- Mobile Dropdown -->
        <div class="sm:hidden relative w-full max-w-xs">
          <select
            :value="selectedMarketplace"
            
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">General</option>
            <option
              v-for="marketplace in marketplaces"
              :key="marketplace.id"
              :value="marketplace.id"
            >
              {{ marketplace.name }}
            </option>
          </select>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import apiClient from '../../../api/axios';
import { onMounted, ref } from 'vue';

const marketplaces = ref(["General"]);

// const props = defineProps({
//   selectedMarketplace: {
//     type: String,
//     required: true
//   },
//   marketplaces: {
//     type: Array,
//     required: true
//   }
// })

// // Emits
// const emit = defineEmits(['update:selectedMarketplace'])

const fetchMarketplaces = async () => {
  try {
    const response = await apiClient.get("/marketplaces/");
    if (response.status === 200 && Array.isArray(response.data)) {
      marketplaces.value = response.data;
    }
  } catch (error) {
    // showPageLoader.value = false;
  }
};

// Methods
// const selectMarketplace = (marketplaceId) => {
//   emit('update:selectedMarketplace', marketplaceId)
// }

onMounted(async() => {
 await fetchMarketplaces();
});
</script>