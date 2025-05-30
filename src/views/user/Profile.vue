<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Back Button -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack"
              class="inline-flex items-center px-3 py-2 border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <i class="pi pi-arrow-left mr-2"></i>
              Back
            </button>
            <h1 class="text-2xl font-bold text-gray-900">User Profile</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 px-4 sm:px-6 lg:px-8 py-6">
      <!-- User Header -->
      <div class="bg-white rounded-xl border-gray-200 mb-6">
        <div class="px-6 py-8 sm:px-8">
          <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <!-- Avatar -->
            <div class="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold  primary-bg">
              {{ getInitials(userProfile.first_name, userProfile.last_name) }}
            </div>
            
            <!-- User Info -->
            <div class="flex-1 text-center sm:text-left">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                {{ userProfile.first_name }} {{ userProfile.last_name }}
              </h2>
              <p class="text-gray-600 mb-2">{{ userProfile.email }}</p>
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium accent-bg primary-text">
                  <i class="pi pi-star mr-2"></i>
                  {{ userProfile.account_type }} Account
                </div>
                <div v-if="isSeller" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <i class="pi pi-shop mr-2"></i>
                  Seller Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white rounded-xl border-gray-200 mb-6">
        <div class="border-b border-gray-200">
          <nav class="flex flex-wrap px-6 overflow-x-auto">
            <button 
              @click="activeTab = 'profile'"
              :class="[
                'py-4 px-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap',
                activeTab === 'profile' 
                  ? 'border-orange-400 text-blue-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="pi pi-user mr-2"></i>
              Profile
            </button>
            <button 
              @click="activeTab = 'settings'"
              :class="[
                'py-4 px-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap',
                activeTab === 'settings' 
                  ? 'border-orange-400 text-blue-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="pi pi-cog mr-2"></i>
              Settings
            </button>
            <button 
              v-if="isSeller"
              @click="activeTab = 'address'"
              :class="[
                'py-4 px-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap',
                activeTab === 'address' 
                  ? 'border-orange-400 text-blue-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="pi pi-map-marker mr-2"></i>
              Address
            </button>
            <button 
              v-if="isSeller"
              @click="activeTab = 'business'"
              :class="[
                'py-4 px-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap',
                activeTab === 'business' 
                  ? 'border-orange-400 text-blue-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="pi pi-briefcase mr-2"></i>
              Business
            </button>
          </nav>
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="p-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h3 class="text-xl font-semibold text-gray-900">Profile Information</h3>
            <button 
              @click="toggleEdit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white primary-bg hover:opacity-90 transition-opacity duration-200"
            >
              <i :class="isEditing ? 'pi pi-times' : 'pi pi-pencil'" class="mr-2"></i>
              {{ isEditing ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                v-if="isEditing"
                v-model="userProfile.first_name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userProfile.first_name }}</p>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                v-if="isEditing"
                v-model="userProfile.last_name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userProfile.last_name }}</p>
            </div>

            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div class="flex items-center">
                <i class="pi pi-envelope text-gray-400 mr-2"></i>
                <p class="text-gray-900 bg-gray-100 px-3 py-2 rounded-md flex-1 opacity-60">{{ userProfile.email }}</p>
              </div>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                v-if="isEditing"
                v-model="userProfile.phone_number"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userProfile.phone_number }}</p>
            </div>

            <!-- Date of Birth -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input 
                v-if="isEditing"
                v-model="userProfile.date_of_birth"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userProfile.date_of_birth }}</p>
            </div>

            <!-- Account Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <select 
                v-if="isEditing"
                v-model="userProfile.account_type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="type in accountTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userProfile.account_type }}</p>
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditing" class="mt-6 flex justify-end">
            <button 
              @click="saveProfile"
              class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white accent-bg primary-text hover:opacity-90 transition-opacity duration-200"
            >
              <i class="pi pi-check mr-2"></i>
              Save Changes
            </button>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>

          <!-- Notification Preferences -->
          <div class="mb-8">
            <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <i class="pi pi-bell mr-2 text-orange-400"></i>
              Notification Preferences
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label class="text-sm font-medium text-gray-700">Email Notifications</label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="userSettings.notification_preferences.email_notifications"
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label class="text-sm font-medium text-gray-700">Push Notifications</label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="userSettings.notification_preferences.push_notifications"
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label class="text-sm font-medium text-gray-700">SMS Notifications</label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="userSettings.notification_preferences.sms_notifications"
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label class="text-sm font-medium text-gray-700">Marketing Emails</label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="userSettings.notification_preferences.marketing_emails"
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Language -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <i class="pi pi-globe mr-2 text-orange-400"></i>
                Language
              </label>
              <select 
                v-model="userSettings.language_preference"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
              </select>
            </div>

            <!-- Currency -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <i class="pi pi-dollar mr-2 text-orange-400"></i>
                Currency
              </label>
              <select 
                v-model="userSettings.currency_preference"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
              </select>
            </div>

            <!-- Theme -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <i class="pi pi-palette mr-2 text-orange-400"></i>
                Theme
              </label>
              <select 
                v-model="userSettings.theme_preference"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
              </select>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div class="mb-8">
            <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <i class="pi pi-shield mr-2 text-orange-400"></i>
              Privacy Settings
            </h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <select 
                  v-model="userSettings.privacy_settings.profile_visibility"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  <option v-for="option in privacyOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label class="text-sm font-medium text-gray-700">Show Email Publicly</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="userSettings.privacy_settings.show_email"
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label class="text-sm font-medium text-gray-700">Show Phone Publicly</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="userSettings.privacy_settings.show_phone"
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label class="text-sm font-medium text-gray-700">Allow Data Sharing</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="userSettings.privacy_settings.data_sharing"
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Settings Button -->
          <div class="flex justify-end">
            <button 
              @click="saveSettings"
              class="inline-flex items-center px-6 py-2 border-transparent text-sm font-medium rounded-md text-white accent-bg primary-text hover:opacity-90 transition-opacity duration-200"
            >
              <i class="pi pi-save mr-2"></i>
              Save Settings
            </button>
          </div>
        </div>

        <!-- Address Tab (for sellers) -->
        <div v-if="activeTab === 'address' && isSeller" class="p-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h3 class="text-xl font-semibold text-gray-900">Address Information</h3>
            <button 
              @click="toggleAddressEdit"
              class="inline-flex items-center px-4 py-2 border-transparent text-sm font-medium rounded-md text-white primary-bg hover:opacity-90 transition-opacity duration-200"
            >
              <i :class="isEditingAddress ? 'pi pi-times' : 'pi pi-pencil'" class="mr-2"></i>
              {{ isEditingAddress ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Street Address -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input 
                v-if="isEditingAddress"
                v-model="userAddress.street_address"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userAddress.street_address }}</p>
            </div>

            <!-- City -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input 
                v-if="isEditingAddress"
                v-model="userAddress.city"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userAddress.city }}</p>
            </div>

            <!-- State/Province -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
              <input 
                v-if="isEditingAddress"
                v-model="userAddress.state_province"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userAddress.state_province }}</p>
            </div>

            <!-- Postal Code -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input 
                v-if="isEditingAddress"
                v-model="userAddress.postal_code"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userAddress.postal_code }}</p>
            </div>

            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                v-if="isEditingAddress"
                v-model="userAddress.country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ userAddress.country }}</p>
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditingAddress" class="mt-6 flex justify-end">
            <button 
              @click="saveAddress"
              class="inline-flex items-center px-6 py-2 border-transparent text-sm font-medium rounded-md text-white accent-bg primary-text hover:opacity-90 transition-opacity duration-200"
            >
              <i class="pi pi-check mr-2"></i>
              Save Address
            </button>
          </div>
        </div>

        <!-- Business Tab (for sellers) -->
        <div v-if="activeTab === 'business' && isSeller" class="p-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h3 class="text-xl font-semibold text-gray-900">Business Information</h3>
            <button 
              @click="toggleBusinessEdit"
              class="inline-flex items-center px-4 py-2 border-transparent text-sm font-medium rounded-md text-white primary-bg hover:opacity-90 transition-opacity duration-200"
            >
              <i :class="isEditingBusiness ? 'pi pi-times' : 'pi pi-pencil'" class="mr-2"></i>
              {{ isEditingBusiness ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Business Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input 
                v-if="isEditingBusiness"
                v-model="businessInfo.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.name }}</p>
            </div>

            <!-- Business Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select 
                v-if="isEditingBusiness"
                v-model="businessInfo.business_type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="type in businessTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.business_type }}</p>
            </div>

            <!-- Website -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input 
                v-if="isEditingBusiness"
                v-model="businessInfo.website"
                type="url"
                placeholder="https://example.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.website ||'Not specified' }}</p>
            </div>

            <!-- Tax ID/Registration Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tax ID/Registration Number</label>
              <input 
                v-if="isEditingBusiness"
                v-model="businessInfo.tax_id"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.tax_id || 'Not specified' }}</p>
            </div>

            <!-- Industry -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select 
                v-if="isEditingBusiness"
                v-model="businessInfo.industry"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
              </select>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.industry }}</p>
            </div>

            <!-- Business Description -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
              <textarea 
                v-if="isEditingBusiness"
                v-model="businessInfo.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="Describe your business..."
              ></textarea>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[100px]">{{ businessInfo.description || 'No description provided' }}</p>
            </div>

            <!-- Years in Business -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
              <input 
                v-if="isEditingBusiness"
                v-model.number="businessInfo.years_in_business"
                type="number"
                min="0"
                max="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.years_in_business || 0 }} years</p>
            </div>

            <!-- Number of Employees -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
              <select 
                v-if="isEditingBusiness"
                v-model="businessInfo.employee_count"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option v-for="range in employeeRanges" :key="range" :value="range">{{ range }}</option>
              </select>
              <p v-else class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{{ businessInfo.employee_count || 'Not specified' }}</p>
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditingBusiness" class="mt-6 flex justify-end">
            <button 
              @click="saveBusiness"
              class="inline-flex items-center px-6 py-2 border-transparent text-sm font-medium rounded-md text-white accent-bg primary-text hover:opacity-90 transition-opacity duration-200"
            >
              <i class="pi pi-check mr-2"></i>
              Save Business Info
            </button>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white rounded-xl border-red-200 overflow-hidden">
        <div class="bg-red-50 px-6 py-4 border-b border-red-200">
          <h3 class="text-lg font-semibold text-red-900 flex items-center">
            <i class="pi pi-exclamation-triangle mr-2"></i>
            Danger Zone
          </h3>
        </div>
        
        <div class="p-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h4 class="text-base font-medium text-gray-900 mb-1">Delete Account</h4>
              <p class="text-sm text-gray-600">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button 
              @click="showDeleteConfirmation = true"
              class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
            >
              <i class="pi pi-trash mr-2"></i>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full mx-auto">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <i class="pi pi-exclamation-triangle text-red-600 text-xl"></i>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Delete Account</h3>
            <p class="text-sm text-gray-500 mb-4">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </p>
            <div class="flex justify-center space-x-4">
              <button 
                @click="showDeleteConfirmation = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                @click="deleteAccount"
                class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const activeTab = ref('profile')
const isEditing = ref(false)
const isEditingAddress = ref(false)
const isEditingBusiness = ref(false)
const showDeleteConfirmation = ref(false)

// User Profile Data
const userProfile = ref({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone_number: '+1-555-123-4567',
  date_of_birth: '1990-05-15',
  account_type: 'Premium'
})

// User Settings
const userSettings = ref({
  notification_preferences: {
    email_notifications: true,
    push_notifications: false,
    sms_notifications: true,
    marketing_emails: false
  },
  language_preference: 'English',
  currency_preference: 'USD',
  theme_preference: 'Light',
  privacy_settings: {
    profile_visibility: 'Public',
    show_email: false,
    show_phone: false,
    data_sharing: true
  }
})

// Address Data (for sellers)
const userAddress = ref({
  street_address: '123 Main Street, Apt 4B',
  city: 'New York',
  state_province: 'NY',
  postal_code: '10001',
  country: 'United States'
})

// Business Info (for sellers)
const businessInfo = ref({
  name: 'Tech Solutions Inc.',
  business_type: 'Corporation',
  website: 'https://techsolutions.com',
  tax_id: '12-3456789',
  industry: 'Technology',
  description: 'We provide innovative technology solutions for businesses of all sizes.',
  years_in_business: 5,
  employee_count: '10-50'
})

// Options Arrays
const accountTypes = ref(['Basic', 'Premium', 'Enterprise'])
const languages = ref(['English', 'Spanish', 'French', 'German', 'Chinese'])
const currencies = ref(['USD', 'EUR', 'GBP', 'CAD', 'AUD'])
const themes = ref(['Light', 'Dark', 'Auto'])
const privacyOptions = ref(['Public', 'Private', 'Friends Only'])
const countries = ref(['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia'])
const businessTypes = ref(['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC', 'Non-Profit'])
const industries = ref(['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Services', 'Other'])
const employeeRanges = ref(['1-10', '10-50', '50-100', '100-500', '500+'])

// Computed Properties
const isSeller = computed(() => {
  return userProfile.value.account_type === 'Premium' || userProfile.value.account_type === 'Enterprise'
})

// Methods
const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const goBack = () => {
  router.go(-1)
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const toggleAddressEdit = () => {
  isEditingAddress.value = !isEditingAddress.value
}

const toggleBusinessEdit = () => {
  isEditingBusiness.value = !isEditingBusiness.value
}

const saveProfile = async () => {
  try {
    // API call to save profile data
    console.log('Saving profile:', userProfile.value)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    isEditing.value = false
    // Show success message (you can add a toast notification here)
  } catch (error) {
    console.error('Error saving profile:', error)
    // Handle error (show error message)
  }
}

const saveSettings = async () => {
  try {
    // API call to save settings
    console.log('Saving settings:', userSettings.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Show success message
  } catch (error) {
    console.error('Error saving settings:', error)
    // Handle error
  }
}

const saveAddress = async () => {
  try {
    // API call to save address
    console.log('Saving address:', userAddress.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    isEditingAddress.value = false
    // Show success message
  } catch (error) {
    console.error('Error saving address:', error)
    // Handle error
  }
}

const saveBusiness = async () => {
  try {
    // API call to save business info
    console.log('Saving business info:', businessInfo.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    isEditingBusiness.value = false
    // Show success message
  } catch (error) {
    console.error('Error saving business info:', error)
    // Handle error
  }
}

const deleteAccount = async () => {
  try {
    // API call to delete account
    console.log('Deleting account...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to login or home page after deletion
    router.push('/login')
  } catch (error) {
    console.error('Error deleting account:', error)
    // Handle error
  }
}

// Lifecycle
onMounted(() => {
  // Load user data on component mount
  console.log('User profile component mounted')
  // You can make API calls here to fetch actual user data
})
</script>

<style scoped>
.primary-bg {
  background-color: #1e3a8a; /* blue-900 */
}

.accent-bg {
  background-color: #fb923c; /* orange-400 */
}

.primary-text {
  color: #1e3a8a; /* blue-900 */
}
</style>