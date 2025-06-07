<script setup>
import { ref } from 'vue';

const props = defineProps({
    currentView: {
          currentView: {
          type: String,
         default: 'add-store'
       },
    }
})

const storeCreateErrors = ref({});
const newStore = ref({
  name: "",
  description: "",
  banner_url: "sjsjsjsjs",
  logo_url: "hgdgdgdg",
  contact_email: "",
  contact_phone: "",
});

const emit = defineEmits([
  'update:current-view',
])

const setCurrentView = (view) => {
  emit('update:current-view', view)
}

</script>

<template>
    <div v-if="props.currentView === 'add-store'" class="space-y-6">
       <div class="flex items-center space-x-4 mb-6">
            <button
              @click="setCurrentView('stores')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              Add New Store
            </h3>
          </div>

           <form class="bg-white rounded-xl shadow-sm p-6 space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Store Name *</label>
      <input
        type="text"
        v-model="newStore.name"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
        :class="storeCreateErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        placeholder="Enter store name"
        required
      />
      <p v-if="storeCreateErrors.name" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.name }}</p>
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
    <textarea
      v-model="newStore.description"
      rows="4"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
      :class="storeCreateErrors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
      placeholder="Describe your store and what you sell..."
      required
    ></textarea>
    <p v-if="storeCreateErrors.description" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.description }}</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Store Logo *</label>
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <button
          type="button"
          class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          :class="storeCreateErrors.logo ? 'border-red-500' : 'border-gray-300'"
        >
          Upload Logo
        </button>
      </div>
      <p v-if="storeCreateErrors.logo" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.logo }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Banner Image *</label>
      <div class="flex items-center space-x-4">
        <div class="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <button
          type="button"
          class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          :class="storeCreateErrors.banner ? 'border-red-500' : 'border-gray-300'"
        >
          Upload Banner
        </button>
      </div>
      <p v-if="storeCreateErrors.banner" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.banner }}</p>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
      <input
        type="email"
        v-model="newStore.contact_email"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
        :class="storeCreateErrors.contact_email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        placeholder="store@example.com"
        required
      />
      <p v-if="storeCreateErrors.contact_email" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.contact_email }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
      <input
        type="tel"
        v-model="newStore.contact_phone"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
        :class="storeCreateErrors.contact_phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        placeholder="+1234567890"
        required
      />
      <p v-if="storeCreateErrors.contact_phone" class="mt-1 text-sm text-red-600">{{ storeCreateErrors.contact_phone }}</p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 pt-6">
    <button
      type="button"
      @click="currentView = 'stores'"
      class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      @click="createStore"
      class="px-6 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90"
      style="background-color: #fbb03b"
    >
      Create Store
    </button>
  </div>
</form>
</div>
</template>