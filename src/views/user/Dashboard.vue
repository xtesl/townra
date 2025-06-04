<template>
  <div class="min-h-screen bg-gray-50">
    <MessageDisplayer ref="messageDisplayer" />

    <!-- Sidebar -->
    <SideBar
      :sidebar-open="sidebarOpen"
      :current-view="currentView"
      :user="user"
      :stores="stores"
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
        <!-- Dashboard View -->
        <div v-if="currentView === 'dashboard'" class="space-y-6">
          <!-- Statistics Cards -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <!-- Revenue Card -->
            <div
              class="bg-white rounded-xl shadow-sm p-6 border-l-4"
              style="border-left-color: #fbb03b"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p class="text-2xl font-bold mt-1" style="color: #022b5f">
                    ${{ stats.totalRevenue.toLocaleString() }}
                  </p>
                  <p class="text-sm text-green-600 mt-2 flex items-center">
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
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      ></path>
                    </svg>
                    +12% from last month
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center"
                  style="background-color: #fbb03b"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Orders Card -->
            <div
              class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Orders</p>
                  <p class="text-2xl font-bold mt-1" style="color: #022b5f">
                    {{ stats.totalOrders.toLocaleString() }}
                  </p>
                  <p class="text-sm text-green-600 mt-2 flex items-center">
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
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      ></path>
                    </svg>
                    +8% from last month
                  </p>
                </div>
                <div
                  class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Products Card -->
            <div
              class="bg-white rounded-xl shadow-sm p-6 border-l-4"
              style="border-left-color: #022b5f"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p class="text-2xl font-bold mt-1" style="color: #022b5f">
                    {{ totalProducts }}
                  </p>
                  <p class="text-sm text-gray-500 mt-2">
                    {{ subscriptionLimits.products - totalProducts }} remaining
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center"
                  style="background-color: #022b5f"
                >
                  <svg
                    class="w-6 h-6 text-white"
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
                </div>
              </div>
            </div>

            <!-- Stores Card -->
            <div
              class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Active Stores</p>
                  <p class="text-2xl font-bold mt-1" style="color: #022b5f">
                    {{ stores.length }}
                  </p>
                  <p class="text-sm text-gray-500 mt-2">
                    {{ subscriptionLimits.stores - stores.length }} remaining
                  </p>
                </div>
                <div
                  class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts and Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Revenue Chart -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold" style="color: #022b5f">
                  Revenue Overview
                </h3>
                <select
                  class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div
                class="h-64 flex items-center justify-center bg-gray-50 rounded-lg"
              >
                <p class="text-gray-500">
                  Chart placeholder - integrate with your charting library
                </p>
              </div>
            </div>

            <!-- Recent Orders -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold" style="color: #022b5f">
                  Recent Orders
                </h3>
                <a
                  href="#"
                  class="text-sm font-medium hover:underline"
                  style="color: #fbb03b"
                  >View all</a
                >
              </div>
              <div class="space-y-4">
                <div
                  v-for="order in recentOrders"
                  :key="order.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style="background-color: #fbb03b"
                    >
                      {{ order.customer.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <p class="font-medium" style="color: #022b5f">
                        Order #{{ order.id }}
                      </p>
                      <p class="text-sm text-gray-500">{{ order.customer }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold" style="color: #022b5f">
                      ${{ order.amount }}
                    </p>
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800':
                          order.status === 'completed',
                        'bg-yellow-100 text-yellow-800':
                          order.status === 'pending',
                        'bg-red-100 text-red-800': order.status === 'cancelled',
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stores View -->
        <div v-if="currentView === 'stores'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              My Stores
            </h3>
            <button
              @click="currentView = 'add-store'"
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

        <div v-if="currentView === 'add-store'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <button
              @click="currentView = 'stores'"
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
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Store Name *</label
                >
                <input
                  type="text"
                  v-model="newStore.name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Enter store name"
                  required
                />
              </div>
              <!-- <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store Category</label>
                <select
                  v-model="newStore.category"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing & Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="books">Books & Media</option>
                  <option value="food">Food & Beverages</option>
                </select>
              </div> -->
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description *</label
              >
              <textarea
                v-model="newStore.description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="Describe your store and what you sell..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Store Logo *</label
                >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Upload Logo
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Banner Image *</label
                >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Upload Banner
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Contact Email *</label
                >
                <input
                  type="email"
                  v-model="newStore.contact_email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="store@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone Number *</label
                >
                <input
                  type="tel"
                  v-model="newStore.contact_phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Store policies (Optional)</label>
              <textarea
                v-model="newStore.address"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="Enter full store address..."
              ></textarea>
            </div> -->

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

        <!-- Products View -->
        <div v-if="currentView === 'products'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              Products
            </h3>
            <button
              @click="currentView = 'add-product'"
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
        <!-- <div class="bg-white rounded-xl shadow-sm p-4">
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
          </div> -->

        <!-- Products Grid -->
        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
         </div> -->

        <div v-if="currentView === 'add-product'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <button
              @click="currentView = 'products'"
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
              Add New Product
            </h3>
          </div>

          <form @submit.prevent="createProduct" class="space-y-8">
            <!-- Basic Product Information -->
            <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h4 class="text-lg font-medium text-gray-900 border-b pb-2">
                Basic Information
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Product Name *</label
                  >
                  <input
                    type="text"
                    v-model="newProduct.name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Store *</label
                  >
                  <select
                    v-model="newProduct.store_id"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                  >
                    <option value="">Select store</option>
                    <option
                      v-for="store in stores"
                      :key="store.pk"
                      :value="store.pk"
                    >
                      {{ store.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="newProduct.description"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Describe your product features, benefits, etc..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Category</label
                  >
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
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Status</label
                  >
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
            </div>

            <!-- Collection Assignment -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">Collection</h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableCollection"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Assign to collection</span
                  >
                </label>
              </div>

              <div v-if="enableCollection" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Select Collection</label
                  >
                  <select
                    v-model="newProduct.collection_id"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="">Choose collection</option>
                    <option
                      v-for="collection in collections"
                      :key="collection.id"
                      :value="collection.id"
                    >
                      {{ collection.name }}
                    </option>
                  </select>
                </div>
                <p class="text-sm text-gray-500">
                  Collections help organize related products together for better
                  management and customer browsing.
                </p>
              </div>
            </div>

            <!-- Product Options -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">
                  Product Options
                </h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableOptions"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Add product options</span
                  >
                </label>
              </div>

              <div v-if="enableOptions" class="space-y-4">
                <p class="text-sm text-gray-500 mb-4">
                  Product options allow customers to choose different attributes
                  like color, size, material, etc.
                </p>

                <div
                  v-for="(option, index) in newProduct.product_options"
                  :key="index"
                  class="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div class="flex items-center justify-between">
                    <h5 class="font-medium text-gray-800">
                      Option {{ index + 1 }}
                    </h5>
                    <button
                      type="button"
                      @click="removeOption(index)"
                      class="text-red-500 hover:text-red-700"
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
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Option Name *</label
                      >
                      <input
                        type="text"
                        v-model="option.name"
                        placeholder="e.g., Color, Size, Material"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        required
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Display Type</label
                      >
                      <select
                        v-model="option.display_type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      >
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio Buttons</option>
                        <option value="color">Color Swatches</option>
                        <option value="image">Image Swatches</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Option Values</label
                    >
                    <div class="space-y-2">
                      <div
                        v-for="(value, valueIndex) in option.values"
                        :key="valueIndex"
                        class="flex items-center space-x-2"
                      >
                        <input
                          type="text"
                          v-model="option.values[valueIndex]"
                          placeholder="Option value"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        />
                        <button
                          type="button"
                          @click="removeOptionValue(index, valueIndex)"
                          class="text-red-500 hover:text-red-700"
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
                      <button
                        type="button"
                        @click="addOptionValue(index)"
                        class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        Add Value
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addOption"
                  class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  <svg
                    class="w-5 h-5 mx-auto mb-1"
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
                  Add New Option
                </button>
              </div>
            </div>

            <!-- Product Variants -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">
                  Product Variants
                </h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableVariants"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Create product variants</span
                  >
                </label>
              </div>

              <div v-if="enableVariants" class="space-y-4">
                <div
                  v-if="!enableOptions"
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <p class="text-sm text-yellow-800">
                    <strong>Note:</strong> Enable "Product Options" first to
                    create variants based on option combinations.
                  </p>
                </div>

                <div
                  v-else-if="newProduct.product_options.length === 0"
                  class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <p class="text-sm text-blue-800">
                    Add product options above to automatically generate variant
                    combinations.
                  </p>
                </div>

                <div v-else class="space-y-4">
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600">
                      Variants will be generated based on your product options.
                      You can customize pricing and inventory for each variant.
                    </p>
                    <button
                      type="button"
                      @click="generateVariants"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Generate Variants
                    </button>
                  </div>

                  <div
                    v-if="newProduct.product_variants.length > 0"
                    class="space-y-3"
                  >
                    <h5 class="font-medium text-gray-800">
                      Generated Variants ({{
                        newProduct.product_variants.length
                      }})
                    </h5>
                    <div class="max-h-96 overflow-y-auto space-y-3">
                      <div
                        v-for="(variant, index) in newProduct.product_variants"
                        :key="index"
                        class="border border-gray-200 rounded-lg p-4"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Variant Name</label
                            >
                            <input
                              type="text"
                              v-model="variant.name"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              readonly
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Price *</label
                            >
                            <div class="relative">
                              <span
                                class="absolute left-3 top-2 text-gray-500 text-sm"
                                >$</span
                              >
                              <input
                                type="number"
                                v-model="variant.price"
                                step="0.01"
                                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Compare Price</label
                            >
                            <div class="relative">
                              <span
                                class="absolute left-3 top-2 text-gray-500 text-sm"
                                >$</span
                              >
                              <input
                                type="number"
                                v-model="variant.compare_price"
                                step="0.01"
                                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Inventory *</label
                            >
                            <input
                              type="number"
                              v-model="variant.inventory"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Default Pricing (when no variants) -->
            <div
              v-if="!enableVariants"
              class="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              <h4 class="text-lg font-medium text-gray-900 border-b pb-2">
                Pricing & Inventory
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Price *</label
                  >
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
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Compare Price</label
                  >
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
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Inventory *</label
                  >
                  <input
                    type="number"
                    v-model="newProduct.inventory"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Product Images -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">
                Product Images
              </h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Existing Images -->
                <div
                  v-for="(image, index) in newProduct.images"
                  :key="index"
                  class="relative border border-gray-200 rounded-lg overflow-hidden group"
                >
                  <img
                    :src="image.url"
                    :alt="image.alt || 'Product image'"
                    class="w-full h-32 object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <button
                      type="button"
                      @click="setMainImage(index)"
                      :class="[
                        'px-2 py-1 text-xs rounded text-white',
                        image.is_main
                          ? 'bg-green-600'
                          : 'bg-blue-600 hover:bg-blue-700',
                      ]"
                    >
                      {{ image.is_main ? "Main" : "Set Main" }}
                    </button>
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                    >
                      Delete
                    </button>
                  </div>
                  <div v-if="image.is_main" class="absolute top-2 left-2">
                    <span
                      class="bg-green-600 text-white text-xs px-2 py-1 rounded"
                      >Main</span
                    >
                  </div>
                </div>

                <!-- Upload Area -->
                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer relative"
                  @click="triggerFileInput"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <div v-if="!uploading">
                    <svg
                      class="w-8 h-8 text-gray-400 mx-auto mb-2"
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
                    <p class="text-sm text-gray-500">Add Image</p>
                    <p class="text-xs text-gray-400 mt-1">
                      Click or drag files here
                    </p>
                  </div>
                  <div v-else class="flex flex-col items-center">
                    <div
                      class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"
                    ></div>
                    <p class="text-sm text-gray-500">Uploading...</p>
                  </div>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploadProgress.length > 0" class="mt-4 space-y-2">
                <h5 class="text-sm font-medium text-gray-700">
                  Upload Progress
                </h5>
                <div
                  v-for="(progress, index) in uploadProgress"
                  :key="index"
                  class="flex items-center space-x-3"
                >
                  <div class="flex-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">{{ progress.name }}</span>
                      <span class="text-gray-500"
                        >{{ Math.round(progress.progress) }}%</span
                      >
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: progress.progress + '%' }"
                      ></div>
                    </div>
                  </div>
                  <button
                    v-if="progress.status === 'error'"
                    @click="retryUpload(index)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>

              <!-- Image Guidelines -->
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">
                  <strong>Image Guidelines:</strong>
                  Upload high-quality images (min 800x800px). Supported formats:
                  JPG, PNG, WebP. Max 5MB per image.
                </p>
              </div>
            </div>

            <!-- Form Actions -->
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
                style="background-color: #fbb03b"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>

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

// Reactive state
const sidebarOpen = ref(false);
const messageDisplayer = ref(null);
const currentView = ref("dashboard");
const productSearch = ref("");
const selectedStore = ref("");
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

// Sample stores data
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

const createStore = async () => {
  try {
    showPageLoader.value = true;
    pageLoaderMessage.value = "Please wait while we setup your store...";
    await new Promise((resolve) => setTimeout(resolve, 3000));

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

const addOption = () => {
  newProduct.value.product_options.push({
    name: "",
    display_type: "dropdown",
    values: [""],
  });
};

const removeOption = (index) => {
  newProduct.value.product_options.splice(index, 1);
  if (this.enableVariants) {
    this.generateVariants();
  }
};

const addOptionValue = (optionIndex) => {
  newProduct.value.product_options[optionIndex].values.push("");
};

const removeOptionValue = (optionIndex, valueIndex) => {
  newProduct.value.product_options[optionIndex].values.splice(valueIndex, 1);
  if (enableVariants.value) {
    generateVariants();
  }
};

const generateCombinations = (options) => {
  if (options.length === 0) return [[]];

  const [first, ...rest] = options;
  const restCombinations = generateCombinations(rest);
  const validValues = first.values.filter((val) => val.trim());

  return validValues.flatMap((value) =>
    restCombinations.map((combo) => [value, ...combo])
  );
};

const generateVariants = () => {
  const options = newProduct.value.product_options.filter(
    (opt) => opt.name && opt.values.some((val) => val.trim())
  );

  if (options.length === 0) {
    newProduct.value.product_variants = [];
    return;
  }

  // Generate all combinations
  const combinations = generateCombinations(options);

  newProduct.value.product_variants = combinations.map((combo) => ({
    name: combo.join(" / "),
    price: newProduct.value.price || 0,
    compare_price: newProduct.value.compare_price || null,
    inventory: 0,
    option_values: combo,
  }));
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

// Helper functions
const getStoreName = (storePk) => {
  const store = stores.find((s) => s.pk === storePk);
  return store ? store.name : "Unknown Store";
};

const getStoreProductCount = (storePk) => {
  return products.filter((p) => p.store_pk === storePk).length;
};

const handleHelpSupport = () => {
  console.log("Help & Support clicked");
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  uploadImages(files);
  // Reset input so same file can be selected again
  event.target.value = "";
};

const handleDragOver = (event) => {
  event.currentTarget.classList.add("border-blue-400", "bg-blue-50");
};

const handleDragLeave = (event) => {
  event.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
};

const handleDrop = (event) => {
  event.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  const files = Array.from(event.dataTransfer.files).filter((file) =>
    file.type.startsWith("image/")
  );
  if (files.length > 0) {
    uploadImages(files);
  }
};

const setMainImage = (index) => {
  // Remove main flag from all images
  newProduct.value.images.forEach((img) => (img.is_main = false));
  // Set selected image as main
  newProduct.value.images[index].is_main = true;
};

const getPresignedUrl = async (filename, contentType) => {
  // Replace this with your actual API endpoint to get presigned URL
  const response = await fetch("/api/s3/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add your authentication headers here
    },
    body: JSON.stringify({
      filename: filename,
      content_type: contentType,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get presigned URL");
  }

  return await response.json();
};

const uploadToS3 = (presignedData, file, progressIndex) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        this.uploadProgress[progressIndex].progress = progress;
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200 || xhr.status === 204) {
        resolve({
          url: presignedData.url.split("?")[0], // Remove query params to get clean URL
        });
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Upload failed"));
    });

    // Create form data for S3 upload
    const formData = new FormData();

    // Add S3 form fields (these come from your presigned URL response)
    Object.keys(presignedData.fields || {}).forEach((key) => {
      formData.append(key, presignedData.fields[key]);
    });

    // Add the file last
    formData.append("file", file);

    xhr.open("POST", presignedData.url);
    xhr.send(formData);
  });
};

const uploadSingleImage = async (file, progressIndex) => {
  return new Promise((resolve, reject) => {
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const extension = file.name.split(".").pop();
    const filename = `products/${timestamp}-${randomId}.${extension}`;

    // In a real application, you would get presigned URL from your backend
    // This is a simplified example - replace with your actual S3 upload logic
    getPresignedUrl(filename, file.type)
      .then((presignedData) => {
        return uploadToS3(presignedData, file, progressIndex);
      })
      .then((uploadResult) => {
        resolve({
          url: uploadResult.url,
          filename: filename,
          alt: file.name.replace(/\.[^/.]+$/, ""), // Remove extension for alt text
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const uploadImages = async (files) => {
  // Validate files
  const validFiles = files.filter((file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert(`${file.name} is not a supported image format`);
      return false;
    }

    if (file.size > maxSize) {
      alert(`${file.name} is too large. Maximum size is 5MB`);
      return false;
    }

    return true;
  });

  if (validFiles.length === 0) return;

  uploading.value = true;

  // Initialize progress tracking
  validFiles.forEach((file, index) => {
    uploadProgress.value.push({
      name: file.name,
      progress: 0,
      status: "uploading",
      file: file,
    });
  });

  // Upload files concurrently
  const uploadPromises = validFiles.map((file, index) =>
    uploadSingleImage(file, index)
  );

  try {
    const results = await Promise.allSettled(uploadPromises);

    // Process results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        // Add successful upload to images array
        newProduct.value.images.push({
          url: result.value.url,
          alt: result.value.alt || "",
          is_main: newProduct.value.images.length === 0, // First image is main
          filename: result.value.filename,
        });
        uploadProgress.value[index].status = "completed";
      } else {
        uploadProgress.value[index].status = "error";
        console.error("Upload failed:", result.reason);
      }
    });

    // Clear progress after 3 seconds
    setTimeout(() => {
      uploadProgress.value = uploadProgress.value.filter(
        (p) => p.status === "error"
      );
    }, 3000);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Some images failed to upload. Please try again.");
  } finally {
    uploading.value = false;
  }
};

const retryUpload = async (progressIndex) => {
  const failedUpload = uploadProgress.value[progressIndex];
  if (failedUpload && failedUpload.file) {
    // Reset progress and retry
    failedUpload.progress = 0;
    failedUpload.status = "uploading";
    uploadSingleImage(failedUpload.file, progressIndex)
      .then((result) => {
        newProduct.value.images.push({
          url: result.url,
          alt: result.alt || "",
          is_main: newProduct.value.images.length === 0,
          filename: result.filename,
        });
        failedUpload.status = "completed";

        setTimeout(() => {
          const index = uploadProgress.value.indexOf(failedUpload);
          if (index > -1) {
            uploadProgress.value.splice(index, 1);
          }
        }, 2000);
      })
      .catch((error) => {
        failedUpload.status = "error";
        console.error("Retry failed:", error);
      });
  }
};

const deleteFromS3 = async (filename) => {
  // Replace with your actual API endpoint to delete from S3
  const response = await fetch(
    `/api/s3/delete/${encodeURIComponent(filename)}`,
    {
      method: "DELETE",
      headers: {
        // Add your authentication headers here
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete from S3");
  }
};

const removeImage = async (index) => {
  const image = newProduct.value.images[index];

  // Optionally delete from S3 (implement this based on your needs)
  try {
    await deleteFromS3(image.filename);
  } catch (error) {
    console.warn("Failed to delete image from S3:", error);
  }

  // Remove from local array
  newProduct.value.images.splice(index, 1);

  // If removed image was main and there are other images, make first one main
  if (image.is_main && newProduct.value.images.length > 0) {
    newProduct.value.images[0].is_main = true;
  }
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
//
<script>
// export default {
//   name: 'SellerHub',
//   data() {
//     return {
//       sidebarOpen: false,
//       currentView: 'dashboard',
//       user: {
//         name: 'John Doe',
//         subscription: 'Basic Plan'
//       },
//       stats: {
//         totalRevenue: 24750,
//         totalOrders: 1247,
//       },
//       subscriptionLimits: {
//         stores: 2,
//         products: 100,
//         orders: 500
//       },
//       subscriptionPrice: 29,
//       nextBilling: 'Dec 15, 2024',
//       stores: [
//         {
//           pk: 1,
//           name: 'Tech Store',
//           description: 'Latest electronics and gadgets for tech enthusiasts',
//           banner_url: null,
//           logo_url: null,
//           average_rating: 4.5
//         },
//         {
//           pk: 2,
//           name: 'Fashion Hub',
//           description: 'Trendy clothes and accessories for modern lifestyle',
//           banner_url: null,
//           logo_url: null,
//           average_rating: 4.2
//         }
//       ],
//       products: [
//         {
//           pk: 1,
//           name: 'Wireless Headphones',
//           description: 'High-quality bluetooth headphones with noise cancellation',
//           price: 129.99,
//           compare_price: 199.99,
//           inventory: 25,
//           status: 'active',
//           main_image: null,
//           store_id: 1
//         },
//         {
//           pk: 2,
//           name: 'Smart Watch',
//           description: 'Feature-rich smartwatch with health monitoring',
//           price: 299.99,
//           compare_price: null,
//           inventory: 12,
//           status: 'active',
//           main_image: null,
//           store_id: 1
//         },
//         {
//           pk: 3,
//           name: 'Cotton T-Shirt',
//           description: 'Comfortable 100% cotton t-shirt in various colors',
//           price: 24.99,
//           compare_price: 34.99,
//           inventory: 50,
//           status: 'active',
//           main_image: null,
//           store_id: 2
//         }
//       ],
//       recentOrders: [
//         {
//           id: '12345',
//           customer: 'Alice Johnson',
//           amount: 129.99,
//           status: 'completed'
//         },
//         {
//           id: '12346',
//           customer: 'Bob Smith',
//           amount: 74.50,
//           status: 'pending'
//         },
//         {
//           id: '12347',
//           customer: 'Carol White',
//           amount: 299.99,
//           status: 'completed'
//         }
//       ],
//       allOrders: [
//         {
//           id: '12345',
//           customer: 'Alice Johnson',
//           email: 'alice@example.com',
//           date: '2024-11-28',
//           status: 'delivered',
//           amount: 129.99
//         },
//         {
//           id: '12346',
//           customer: 'Bob Smith',
//           email: 'bob@example.com',
//           date: '2024-11-27',
//           status: 'shipped',
//           amount: 74.50
//         },
//         {
//           id: '12347',
//           customer: 'Carol White',
//           email: 'carol@example.com',
//           date: '2024-11-26',
//           status: 'processing',
//           amount: 299.99
//         },
//         {
//           id: '12348',
//           customer: 'David Brown',
//           email: 'david@example.com',
//           date: '2024-11-25',
//           status: 'pending',
//           amount: 49.99
//         }
//       ]
//     }
//   },
//   computed: {
//     totalProducts() {
//       return this.products.length;
//     }
//   },
//   methods: {
//     getStoreProductCount(storeId) {
//       return this.products.filter(product => product.store_id === storeId).length;
//     }
//   },
//   mounted() {
//     // Handle responsive sidebar behavior
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         this.sidebarOpen = false;
//       }
//     };
//     window.addEventListener('resize', handleResize);
//   }
// }
//
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
