<template>
  <div class="min-h-screen bg-gray-50">
    <MessageDisplayer ref="messageDisplayer" />

    <!-- Sidebar -->
    <SideBar
      :sidebar-open="sidebarOpen"
      :current-view="currentView"
      :user="user"
      :current-plan-name="currentPlanName"
      :show-page-loader="showPageLoader"
      :page-loader-message="pageLoaderMessage"
      :total-products="totalProducts"
      @update:sidebar-open="sidebarOpen = $event"
      @update:current-view="currentView = $event"
      @help-support-click="handleHelpSupport"
    />
    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header
        class="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200"
      >
        <div
          class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
        >
          <div class="flex items-center">
            <button
              @click="sidebarOpen = true"
              class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h2
              class="ml-4 text-xl font-semibold capitalize"
              style="color: #022b5f"
            >
              {{ currentView }}
            </h2>
          </div>

          <div class="flex items-center space-x-3">
            <button
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
                  d="M15 17h5l-5 5-5-5h5zm0 0v-5a2 2 0 00-1.5-1.94l-7-1.75A2 2 0 004 10V4a2 2 0 012-2h4a2 2 0 012 2v6l3 .75V17z"
                ></path>
              </svg>
            </button>
            <button
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-4 sm:p-6 lg:p-8">

        <!-- Stores View -->
             <Stores 
             :current-view="currentView"
             @update:current-view="currentView = $event"
             />
            <StoreCreate 
            :current-view="currentView"
            @update:current-view="currentView = $event"
            />
        <!-- Products View -->
            <Products
             :current-view="currentView"
            @update:current-view="currentView = $event"
             />

    
        <!-- <div v-if="currentView === 'add-product'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <button
              @click="currentView = 'products'"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h3 class="text-xl font-semibold" style="color: #022b5f;">Add New Product</h3>
          </div>

          <form class="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  v-model="newProduct.name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store *</label>
                <select
                  v-model="newProduct.store_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  required
                >
                  <option value="">Select store</option>
                  <option v-for="store in stores" :key="store.pk" :value="store.pk">{{ store.name }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                v-model="newProduct.description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="Describe your product features, benefits, etc..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    v-model="newProduct.price"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Compare Price</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    v-model="newProduct.compare_price"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Inventory *</label>
                <input
                  type="number"
                  v-model="newProduct.inventory"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  v-model="newProduct.category"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                  <option value="books">Books</option>
                  <option value="food">Food & Beverages</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  v-model="newProduct.status"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <p class="text-sm text-gray-500">Add Image</p>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                @click="currentView = 'products'"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90"
                style="background-color: #fbb03b;"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>  -->
         
        <ProductCreate 
         :current-view="currentView"
         @update:current-view="currentView = $event"
        />

        <!-- Orders View -->
        <div v-if="currentView === 'orders'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h3 class="text-xl font-semibold" style="color: #022b5f">Orders</h3>
            <div class="flex space-x-2">
              <select
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="date"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <!-- Orders Table -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="order in allOrders"
                    :key="order.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="font-medium" style="color: #022b5f">
                        #{{ order.id }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3"
                          style="background-color: #fbb03b"
                        >
                          {{ order.customer.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">
                            {{ order.customer }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ order.email }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ order.date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-green-100 text-green-800':
                            order.status === 'delivered',
                          'bg-blue-100 text-blue-800':
                            order.status === 'shipped',
                          'bg-yellow-100 text-yellow-800':
                            order.status === 'processing',
                          'bg-gray-100 text-gray-800':
                            order.status === 'pending',
                          'bg-red-100 text-red-800':
                            order.status === 'cancelled',
                        }"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap font-semibold"
                      style="color: #022b5f"
                    >
                      ${{ order.amount }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button
                        class="hover:text-gray-900"
                        style="color: #fbb03b"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Subscription View -->
        <div v-if="currentView === 'subscription'" class="space-y-6">
          <h3 class="text-xl font-semibold" style="color: #022b5f">
            Subscription Management
          </h3>

          <!-- Current Plan -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h4 class="text-lg font-semibold" style="color: #022b5f">
                  Current Plan
                </h4>
                <p class="text-gray-600">{{ user.subscription }}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold" style="color: #022b5f">
                  ${{ subscriptionPrice }}/month
                </p>
                <p class="text-sm text-gray-500">
                  Next billing: {{ nextBilling }}
                </p>
              </div>
            </div>

            <!-- Usage Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600">Stores</span>
                  <span class="text-sm text-gray-500"
                    >{{ stores.length }}/{{ subscriptionLimits.stores }}</span
                  >
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="h-2 rounded-full"
                    style="background-color: #fbb03b"
                    :style="{
                      width:
                        (stores.length / subscriptionLimits.stores) * 100 + '%',
                    }"
                  ></div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600"
                    >Products</span
                  >
                  <span class="text-sm text-gray-500"
                    >{{ totalProducts }}/{{ subscriptionLimits.products }}</span
                  >
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="h-2 rounded-full"
                    style="background-color: #fbb03b"
                    :style="{
                      width:
                        (totalProducts / subscriptionLimits.products) * 100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600"
                    >Monthly Orders</span
                  >
                  <span class="text-sm text-gray-500"
                    >{{ stats.totalOrders }}/{{
                      subscriptionLimits.orders
                    }}</span
                  >
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="h-2 rounded-full"
                    style="background-color: #fbb03b"
                    :style="{
                      width:
                        (stats.totalOrders / subscriptionLimits.orders) * 100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upgrade Options -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200"
            >
              <div class="text-center">
                <h4 class="text-lg font-semibold mb-2" style="color: #022b5f">
                  Basic
                </h4>
                <p class="text-3xl font-bold mb-4" style="color: #fbb03b">
                  $29/mo
                </p>
                <ul class="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Up to 2 stores</li>
                  <li>• 100 products</li>
                  <li>• 500 orders/month</li>
                  <li>• Basic analytics</li>
                </ul>
                <button
                  class="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Current Plan
                </button>
              </div>
            </div>

            <div
              class="bg-white rounded-xl shadow-sm p-6 border-2"
              style="border-color: #fbb03b"
            >
              <div class="text-center">
                <div
                  class="inline-flex px-3 py-1 text-xs font-medium rounded-full mb-2"
                  style="background-color: #fbb03b; color: white"
                >
                  Most Popular
                </div>
                <h4 class="text-lg font-semibold mb-2" style="color: #022b5f">
                  Pro
                </h4>
                <p class="text-3xl font-bold mb-4" style="color: #fbb03b">
                  $79/mo
                </p>
                <ul class="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Up to 10 stores</li>
                  <li>• 1,000 products</li>
                  <li>• 2,500 orders/month</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                </ul>
                <button
                  class="w-full py-2 px-4 text-white font-medium rounded-lg transition-colors hover:opacity-90"
                  style="background-color: #fbb03b"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>

            <div
              class="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200"
            >
              <div class="text-center">
                <h4 class="text-lg font-semibold mb-2" style="color: #022b5f">
                  Enterprise
                </h4>
                <p class="text-3xl font-bold mb-4" style="color: #fbb03b">
                  $199/mo
                </p>
                <ul class="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Unlimited stores</li>
                  <li>• Unlimited products</li>
                  <li>• Unlimited orders</li>
                  <li>• Custom analytics</li>
                  <li>• Dedicated support</li>
                  <li>• API access</li>
                </ul>
                <button
                  class="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import apiClient from "../../api/axios";
import SideBar from "./../../components/user/dashboard/Navigation.vue";
import MessageDisplayer from "../../components/animation/MessageDisplayer.vue";
import StoreCreate from "../../components/dashboard/store/StoreCreate.vue";
import Stores from "../../components/dashboard/store/Stores.vue";
import ProductCreate from "../../components/dashboard/product/ProductCreate.vue";
import Products from "../../components/dashboard/product/Products.vue";

// Reactive state
const sidebarOpen = ref(false);
const messageDisplayer = ref(null);
const currentView = ref("stores");
const productSearch = ref("");
const selectedStore = ref("");
const storeCreateErrors = ref({});
const newStore = ref({
  name: "",
  description: "",
  banner_url: "sjsjsjsjs",
  logo_url: "hgdgdgdg",
  contact_email: "",
  contact_phone: "",
});
const uploadProgress = ref([]);
const uploading = ref(false);
const collections = ref([
  {
    name: "Men Wear",
    id: "collection-1",
  },
]);
const fileInput = ref(null);
const newProduct = ref({
  name: "",
  store_id: "",
  description: "",
  category: "",
  status: "draft",
  price: null,
  compare_price: null,
  inventory: null,
  collection_id: "collection-1",
  product_options: [],
  product_variants: [],
  images: [],
});
const enableOptions = ref(false);
const enableVariants = ref(false);
const enableCollection = ref(false);
const showPageLoader = ref(false);
const pageLoaderMessage = ref("");
const currentPlan = ref({});
const currentPlanName = ref('')

const user = reactive({
  name: "John Doe",
  email: "john@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  subscription: "Pro Plan",
});

const stats = reactive({
  totalRevenue: 24750.5,
  totalOrders: 1249,
  conversionRate: 3.2,
});

const subscriptionLimits = reactive({
  stores: 6,
  products: 500,
  storage: 50, // GB
});


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

const recentOrders = reactive([
  {
    id: "12345",
    customer: "Alice Johnson",
    amount: 299.99,
    status: "completed",
  },
  { id: "12346", customer: "Bob Smith", amount: 189.99, status: "pending" },
  { id: "12347", customer: "Carol Davis", amount: 45.99, status: "completed" },
  {
    id: "12348",
    customer: "David Wilson",
    amount: 999.99,
    status: "processing",
  },
  { id: "12349", customer: "Eva Brown", amount: 1299.99, status: "completed" },
]);

// Computed properties
const totalProducts = computed(() => products.length);


// Validator function for store data
function validateStore(storeData) {
  const errors = {}
  const requiredFields = ['name', 'description', 'contact_email', 'contact_phone']
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!storeData[field] || storeData[field].trim() === '') {
      errors[field] = `${field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`
    }
  })
  
  // Email validation
  if (storeData.contact_email && storeData.contact_email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(storeData.contact_email.trim())) {
      errors.contact_email = 'Please enter a valid email address'
    }
  }
  
  // Phone validation (basic)
  if (storeData.contact_phone && storeData.contact_phone.trim() !== '') {
    const phoneRegex =  /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = storeData.contact_phone.replace(/[\s\-\(\)]/g, '')
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
      errors.contact_phone = 'Please enter a valid phone number (minimum 10 digits)'
    }
  }
  
  // Name length validation
  if (storeData.name && storeData.name.trim() !== '') {
    if (storeData.name.trim().length < 2) {
      errors.name = 'Store name must be at least 2 characters long'
    } else if (storeData.name.trim().length > 100) {
      errors.name = 'Store name must be less than 100 characters'
    }
  }
  
  // Description length validation
  if (storeData.description && storeData.description.trim() !== '') {
    if (storeData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters long'
    } else if (storeData.description.trim().length > 500) {
      errors.description = 'Description must be less than 500 characters'
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}


const createStore = async () => {
  try {

    showPageLoader.value = true;
    pageLoaderMessage.value = "Please wait while we setup your store...";
    
    const validation = validateStore(newStore.value);
    if(validation.isValid){
    let response = await apiClient.post(
      "/auth/login/test?email=aimmanuel925@gmail.com"
    );
    if (response.status == 200) {
      response = await apiClient.post("/stores/", newStore.value);
      if (response.status == 200) {
        messageDisplayer.value.addMessage(
          "Store created successfully",
          "success",
          3000
        );
      }
    }
  }else{
     storeCreateErrors.value = validation.errors
  }
  } catch (error) {
    const messageDuration = 3000;
    const messageType = "error";
    if (error.response) {
      switch (error.response.status) {
        case 500:
          messageDisplayer.value.addMessage(
            "Internal server error",
            messageType,
            messageDuration
          );
          break;
        case 403:
          messageDisplayer.value.addMessage(
            error.response.data.detail,
            messageType,
            messageDuration
          );
      }
    } else if (error.request) {
      messageDisplayer.value.addMessage(
        "Failed to connect to the server. Please try again later.",
        messageType,
        messageDuration
      );
    } else {
      messageDisplayer.value.addMessage(
        "Something went wrong.Please try again later.",
        messageType,
        messageDuration
      );
    }
  } finally {
    showPageLoader.value = false;
  }
};



const filteredProducts = computed(() => {
  let filtered = products;

  if (productSearch.value) {
    filtered = filtered.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(productSearch.value.toLowerCase()) ||
        product.subtitle
          ?.toLowerCase()
          .includes(productSearch.value.toLowerCase())
    );
  }

  if (selectedStore.value) {
    filtered = filtered.filter(
      (product) => product.store_pk === selectedStore.value
    );
  }

  return filtered;
});





const handleHelpSupport = () => {
  console.log("Help & Support clicked");
};



// Chart reference
const revenueChart = ref(null);

watch(enableOptions, (newVal) => {
  if (!newVal) {
    newProduct.value.product_options = [];
    enableVariants.value = false;
    newProduct.value.product_variants = [];
  }
});

watch(enableVariants, (newVal) => {
  if (!newVal) {
    newProduct.value.product_variants = [];
  } else if (
    enableOptions.value &&
    newProduct.value.product_options.length > 0
  ) {
    generateVariants();
  }
});

const createProduct = () => {
  // Validate and submit the product
  const productData = {
    ...newProduct.value,
    collection_id: enableCollection.value
      ? this.newProduct.value.collection_id
      : null,
    product_options: this.enableOptions ? this.newProduct.product_options : [],
    product_variants: this.enableVariants
      ? this.newProduct.product_variants
      : [],
  };

  // Submit to your API
  console.log("Creating product:", productData);
};
const fetchUserAccount = async () => {
      try {
        let response = await apiClient.post("/auth/login/test?email=aimmanuel925@gmail.com")
        if(response.status == 200){
          response = await apiClient.get("/users/me/seller");
         if(response.status == 200){
          const data = response.data
          Object.assign(user, data.account);
          currentPlan.value = data.current_plan;
          currentPlanName.value = currentPlan.value.plan_name;
         }
        }
      } catch (error) {
        
      }
}
// Initialize chart
onMounted(async () => {
  showPageLoader.value = true;
  await fetchUserAccount();
  showPageLoader.value = false;
  if (revenueChart.value) {
    const ctx = revenueChart.value.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [12000, 15000, 18000, 22000, 19000, 24750],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return " + value.toLocaleString()";
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Inter", sans-serif;
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

@media (min-width: 1024px) {
  .lg\\:pl-64 {
    padding-left: 16rem;
  }

  .lg\\:hidden {
    display: none;
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.hover\\:shadow-md:hover {
  transition: box-shadow 0.3s ease;
}

.hover\\:bg-gray-50:hover,
.hover\\:bg-gray-100:hover,
.hover\\:bg-blue-100:hover,
.hover\\:bg-blue-700:hover {
  transition: background-color 0.2s ease;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Card hover effects */
.bg-white {
  transition: all 0.3s ease;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Status badges */
.bg-green-100 {
  background-color: #dcfce7;
}

.text-green-800 {
  color: #166534;
}

.bg-yellow-100 {
  background-color: #fef3c7;
}

.text-yellow-800 {
  color: #92400e;
}

.bg-red-100 {
  background-color: #fee2e2;
}

.text-red-800 {
  color: #991b1b;
}

.bg-blue-100 {
  background-color: #dbeafe;
}

.text-blue-800 {
  color: #1e40af;
}
</style>
