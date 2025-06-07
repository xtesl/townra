<script setup>
 import { reactive } from 'vue';

 const props = defineProps({
            currentView: {
          currentView: {
          type: String,
         default: 'add-store'
       },
    }
 });

 const emit = defineEmits([
  'update:current-view',
])

const setCurrentView = (view) => {
  emit('update:current-view', view)
}

const subscriptionLimits = reactive({
  stores: 6,
  products: 500,
  storage: 50, // GB
});

const stores = reactive([
  {
    pk: "store-1",
    name: "Tech Haven",
    description: "Premium electronics and gadgets store",
    logo_url:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
    average_rating: 4.8,
    status: "ACTIVE",
    contact_phone: "+1234567890",
    contact_email: "tech@haven.com",
  },
  {
    pk: "store-2",
    name: "Fashion Forward",
    description: "Trendy clothing and accessories",
    logo_url:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=200&fit=crop",
    average_rating: 4.6,
    status: "ACTIVE",
    contact_phone: "+1234567891",
    contact_email: "fashion@forward.com",
  },
  {
    pk: "store-3",
    name: "Home & Garden",
    description: "Beautiful home decor and garden supplies",
    logo_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop",
    average_rating: 4.7,
    status: "ACTIVE",
    contact_phone: "+1234567892",
    contact_email: "home@garden.com",
  },
]);


// Sample products data
const products = reactive([
  {
    pk: "prod-1",
    store_pk: "store-1",
    title: "iPhone 15 Pro",
    subtitle: "Latest Apple smartphone",
    description: "The most advanced iPhone with titanium design",
    price: 999.99,
    thumbnail:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
    stock_quantity: 50,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 25,
  },
  {
    pk: "prod-2",
    store_pk: "store-2",
    title: "Designer Dress",
    subtitle: "Elegant evening wear",
    description: "Beautiful designer dress for special occasions",
    price: 299.99,
    thumbnail:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop",
    stock_quantity: 15,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 8,
  },
  {
    pk: "prod-3",
    store_pk: "store-3",
    title: "Plant Pot Set",
    subtitle: "Decorative ceramic pots",
    description: "Set of 3 beautiful ceramic plant pots",
    price: 45.99,
    thumbnail:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop",
    stock_quantity: 30,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 12,
  },
  {
    pk: "prod-4",
    store_pk: "store-1",
    title: "MacBook Pro",
    subtitle: "Professional laptop",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    thumbnail:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop",
    stock_quantity: 20,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 15,
  },
  {
    pk: "prod-5",
    store_pk: "store-2",
    title: "Leather Handbag",
    subtitle: "Premium leather accessory",
    description: "Handcrafted leather handbag with multiple compartments",
    price: 189.99,
    thumbnail:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
    stock_quantity: 25,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 18,
  },
]);

const getStoreName = (storePk) => {
  const store = stores.find((s) => s.pk === storePk);
  return store ? store.name : "Unknown Store";
};

const getStoreProductCount = (storePk) => {
  return products.filter((p) => p.store_pk === storePk).length;
};


</script>

<template>
     <div v-if="props.currentView === 'stores'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              My Stores
            </h3>
            <button
              @click="setCurrentView('add-store')"
              class="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style="background-color: #fbb03b"
              :disabled="stores.length >= subscriptionLimits.stores"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add Store
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="store in stores"
              :key="store.pk"
              class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                class="h-32 bg-gradient-to-r relative"
                style="background: linear-gradient(to right, #022b5f, #fbb03b)"
              >
                <img
                  v-if="store.banner_url"
                  :src="store.banner_url"
                  class="w-full h-full object-cover"
                  alt="Store Banner"
                />
                <div class="absolute bottom-3 left-3">
                  <div
                    class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <img
                      v-if="store.logo_url"
                      :src="store.logo_url"
                      class="w-10 h-10 rounded-full object-cover"
                      alt="Store Logo"
                    />
                    <span
                      v-else
                      class="text-lg font-bold"
                      style="color: #022b5f"
                    >
                      {{ store.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h4 class="font-semibold text-lg mb-2" style="color: #022b5f">
                  {{ store.name }}
                </h4>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {{ store.description }}
                </p>
                <div
                  class="flex items-center justify-between text-sm text-gray-500 mb-4"
                >
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-1 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                    {{ store.average_rating || "No reviews" }}
                  </span>
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                    {{ getStoreProductCount(store.pk) }} products
                  </span>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="currentView = 'add-store'"
                    class="flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors hover:opacity-90"
                    style="background-color: #fbb03b; color: white"
                  >
                    <svg
                      class="w-4 h-4 inline mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    View
                  </button>
                  <button
                    @click="editStore(store)"
                    class="py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteStore(store)"
                    class="py-2 px-3 text-sm font-medium border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>