<template>
  <nav class="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow">
    <div class="px-4 py-3">
      <!-- Logo and Search Bar Side by Side -->
      <div class="flex items-center space-x-3">
        <!-- Logo and Company Name -->
        <div class="flex items-center space-x-2 flex-shrink-0">
             <h1 class="text-lg font-bold text-[#022b5f] whitespace-nowrap">Townra</h1>
          <!-- <img 
            src="/images/logo.png" 
            alt="Company Logo" 
            class="h-8 w-8 object-contain"
          > -->
           <div
              class="w-8 h-8 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0"
            >
              <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg"
              />
            </div>
         
        </div>
        <!-- Search Bar -->
        <div class="relative flex-1">
          <div class="relative flex items-center">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search Townra"
              class="w-full pl-4 pr-12 py-2.5 border-gray-200 
              rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none 
              focus:border-[#fbb03b] focus:bg-white transition-all duration-200"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
              @input="handleSearch"
            >
            
            <!-- Search Icon -->
            <div class="absolute right-1 top-1/2 transform -translate-y-1/2">
              <button 
                @click="performSearch"
                class="h-8 w-8 bg-[#fbb03b] hover:bg-[#e09a2a] rounded-full flex items-center justify-center 
                transition-colors duration-200"
              >
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Search Suggestions (optional) -->
          <div 
            v-if="isSearchFocused && searchSuggestions.length > 0"
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
          >
            <div 
              v-for="suggestion in searchSuggestions"
              :key="suggestion.id"
              @click="selectSuggestion(suggestion)"
              class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-center space-x-3">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span class="text-sm text-[#022b5f]">{{ suggestion.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  logoSrc: {
    type: String,
    default: '/logo.png'
  },
  companyName: {
    type: String,
    default: 'Your Company'
  }
})

// Emits
const emit = defineEmits(['search', 'suggestionSelect'])

// Reactive data
const searchQuery = ref('')
const isSearchFocused = ref(false)

// Sample search suggestions (replace with your actual data)
const allSuggestions = ref([
  { id: 1, text: 'Electronics', type: 'category' },
  { id: 2, text: 'Mobile Phones', type: 'category' },
  { id: 3, text: 'Laptops', type: 'category' },
  { id: 4, text: 'Samsung Galaxy', type: 'product' },
  { id: 5, text: 'iPhone Cases', type: 'product' },
  { id: 6, text: 'Bluetooth Headphones', type: 'product' },
  { id: 7, text: 'Tech Suppliers', type: 'supplier' },
  { id: 8, text: 'Wholesale Electronics', type: 'supplier' }
])

// Computed properties
const searchSuggestions = computed(() => {
  if (!searchQuery.value.trim()) {
    return allSuggestions.value.slice(0, 5) // Show top 5 when empty
  }
  
  return allSuggestions.value.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 6) // Show max 6 filtered results
})

// Methods
const handleSearch = () => {
  // Emit search event for parent component
  emit('search', searchQuery.value)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    isSearchFocused.value = false
  }
}

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.text
  isSearchFocused.value = false
  emit('suggestionSelect', suggestion)
  emit('search', suggestion.text)
}
</script>

<style scoped>
/* Custom scrollbar for search suggestions */
.max-h-60::-webkit-scrollbar {
  width: 4px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #fbb03b;
  border-radius: 4px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #e09a2a;
}
</style>