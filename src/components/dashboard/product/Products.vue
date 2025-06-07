<script setup>
 import { ref, reactive, computed } from 'vue';

 const props = defineProps({

      currentView: {
          currentView: {
          type: String,
         default: 'add-store'
       },
    }
 });

 const subscriptionLimits = reactive({
  stores: 6,
  products: 500,
  storage: 50, // GB
});

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

const totalProducts = computed(() => products.length);

 const emit = defineEmits([
  'update:current-view',
])

const setCurrentView = (view) => {
  emit('update:current-view', view)
}
</script>


<template>

     <div v-if="props.currentView === 'products'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              Products
            </h3>
            <button
              @click="setCurrentView('add-product')"
              class="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style="background-color: #fbb03b"
              :disabled="totalProducts >= subscriptionLimits.products"
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
              Add Product
            </button>
          </div>
        </div>

        <!-- Product Filters -->
        <div class="bg-white rounded-xl shadow-sm p-4">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                
                />
              </div>
              <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" >
                <option value="">All Stores</option>
                <option v-for="store in stores" :key="store.pk" :value="store.pk">{{ store.name }}</option>
              </select>
              <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div> 

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="product in products"
              :key="product.pk"
              class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div class="h-48 bg-gray-200 relative">
                <img
                  v-if="product.main_image"
                  :src="product.main_image"
                  class="w-full h-full object-cover"
                  alt="Product Image"
                />
                <div class="absolute top-3 right-3">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': product.status === 'active',
                      'bg-yellow-100 text-yellow-800': product.status === 'draft',
                      'bg-red-100 text-red-800': product.status === 'inactive'
                    }"
                  >
                    {{ product.status }}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-semibold mb-2 line-clamp-1" style="color: #022b5f;">{{ product.name }}</h4>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <span class="text-lg font-bold" style="color: #022b5f;">${{ product.price }}</span>
                    <span v-if="product.compare_price" class="text-sm text-gray-500 line-through ml-2">
                      ${{ product.compare_price }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-500">{{ product.inventory }} in stock</span>
                </div>
                   <div class="flex space-x-2">
                  <button 
                    @click="editProduct(product)"
                    class="flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors hover:opacity-90" 
                    style="background-color: #fbb03b; color: white;"
                  >
                    Edit
                  </button>
                  <button 
                    @click="viewProduct(product)"
                    class="py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="deleteProduct(product)"
                    class="py-2 px-3 text-sm font-medium border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
              </div>
            </div>
          </div>
         </div>

</template>