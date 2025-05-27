<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative">
    <!-- Back Button - Mobile Optimized -->
    <!-- <button 
      @click="goBack"
      class="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 bg-white/90 backdrop-blur-md hover:bg-white text-[#022b5f] hover:text-[#022b5f]/80 p-2.5 sm:p-3 rounded-xl shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fbb03b]/30"
    >
      <i class="pi pi-arrow-left text-base sm:text-lg"></i>
    </button> -->

    <div class="h-screen flex flex-col">
      <!-- Header Banner - Full Width -->
      <!-- <div class="bg-gradient-to-r from-[#022b5f] via-[#033870] to-[#022b5f] px-6 sm:px-8 py-6 relative overflow-hidden flex-shrink-0">
        
        <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 70%); background-size: 60px 60px;"></div>
        
        <div class="flex items-center justify-between relative z-10 max-w-7xl mx-auto">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Join as a Seller</h1>
            <p class="text-blue-100 mt-1">Start your selling journey with us</p>
          </div>
          <div class="sm:block">
            <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                 
              <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg"
              />
            </div>
          </div>
        </div>
        
        
        <div class="mt-6 relative z-10 max-w-7xl mx-auto">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-blue-100">Step {{ currentStep }} of {{ steps.length }}</span>
            <span class="text-sm text-blue-100">{{ Math.round((currentStep / steps.length) * 100) }}%</span>
          </div>
          <div class="w-full bg-[#022b5f]/30 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-[#fbb03b] to-[#fbb03b]/80 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              :style="{ width: `${(currentStep / steps.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div> -->

      <div class="bg-gradient-to-r from-[#022b5f] via-[#033870] to-[#022b5f] px-6 sm:px-8 py-6 relative overflow-hidden flex-shrink-0">
  <!-- Header Background Pattern -->
  <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 70%); background-size: 60px 60px;"></div>
  
  <div class="flex items-center justify-between relative z-10 max-w-7xl mx-auto">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-white">Join as a Seller</h1>
      <p class="text-blue-100 mt-1">Start your selling journey with us</p>
    </div>
    
    <!-- Logo and Company Name Section -->
    <div class="flex items-center gap-3 sm:gap-4">
      <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
        <img
          src="/images/logo.png"
          alt="Townra Logo"
          class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg"
        />
      </div>
      <div class="hidden sm:block">
        <h2 class="text-lg font-semibold text-white tracking-wide">Townra</h2>
      </div>
    </div>
  </div>
  
  <!-- Progress Bar -->
  <div class="mt-6 relative z-10 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-blue-100">Step {{ currentStep }} of {{ steps.length }}</span>
      <span class="text-sm text-blue-100">{{ Math.round((currentStep / steps.length) * 100) }}%</span>
    </div>
    <div class="w-full bg-[#022b5f]/30 rounded-full h-2">
      <div 
        class="bg-gradient-to-r from-[#fbb03b] to-[#fbb03b]/80 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
        :style="{ width: `${(currentStep / steps.length) * 100}%` }"
      ></div>
    </div>
  </div>
</div>

      <!-- Form Content - Full Width and Height -->
      <div class="flex-1 px-6 sm:px-8 py-8 overflow-y-auto bg-white">
        <div class="max-w-7xl mx-auto h-full flex flex-col">
          <!-- Step Indicators -->
          <div class="flex justify-center mb-8">
            <div class="flex items-center space-x-4 sm:space-x-8">
              <div 
                v-for="(step, index) in steps" 
                :key="step.id"
                class="flex items-center"
              >
                <div 
                  class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300"
                  :class="[
                    currentStep >= step.id 
                      ? 'bg-[#022b5f] border-[#022b5f] text-white shadow-blue-200' 
                      : 'border-gray-300 text-gray-400 bg-white',
                    currentStep === step.id ? 'ring-4 ring-[#fbb03b]/20 shadow-lg' : ''
                  ]"
                >
                  <component 
                    :is="getStepIcon(step.id)" 
                    class="w-5 h-5"
                  />
                </div>
                <div v-if="index < steps.length - 1" class="hidden sm:block w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 ml-4 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Step Content - Flexible Height -->
          <div class="flex-1 flex flex-col">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-[#022b5f] mb-2">{{ steps[currentStep - 1].title }}</h2>
              <p class="text-gray-600">{{ steps[currentStep - 1].subtitle }}</p>
            </div>

            <form @submit.prevent="handleNext" class="flex-1 flex flex-col">
              <!-- Step 1: Personal Information -->
              <div v-if="currentStep === 1" class="space-y-6 flex-1">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      First Name *
                    </label>
                    <input
                      v-model="formData.firstName"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.firstName }"
                      placeholder="Enter your first name"
                    />
                    <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Last Name *
                    </label>
                    <input
                      v-model="formData.lastName"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.lastName }"
                      placeholder="Enter your last name"
                    />
                    <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Email Address *
                    </label>
                    <input
                      v-model="formData.email"
                      type="email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.email }"
                      placeholder="Enter your email address"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Phone Number
                    </label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>
                </div>

                <!-- Marketplace Selection -->
                <div>
                  <label class="block text-sm font-medium text-[#022b5f] mb-2">
                    Marketplace *
                  </label>
                  <select
                    v-model="formData.marketplace"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                    :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.marketplace }"
                  >
                    <option value="">Select a marketplace</option>
                    <option v-for="marketplace in marketplaces" :key="marketplace" :value="marketplace">{{ marketplace }}</option>
                  </select>
                  <p v-if="errors.marketplace" class="mt-1 text-sm text-red-600">{{ errors.marketplace }}</p>
                  <p class="mt-1 text-xs text-gray-500">Choose the primary marketplace where you'll be selling</p>
                </div>
              </div>

              <!-- Step 2: Business Information -->
              <div v-if="currentStep === 2" class="space-y-6 flex-1">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Business Name *
                    </label>
                    <input
                      v-model="formData.businessName"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.businessName }"
                      placeholder="Enter your business name"
                    />
                    <p v-if="errors.businessName" class="mt-1 text-sm text-red-600">{{ errors.businessName }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Business Type *
                    </label>
                    <select
                      v-model="formData.businessType"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.businessType }"
                    >
                      <option value="">Select business type</option>
                      <option v-for="type in businessTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                    <p v-if="errors.businessType" class="mt-1 text-sm text-red-600">{{ errors.businessType }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Tax ID/EIN
                    </label>
                    <input
                      v-model="formData.taxId"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      placeholder="Tax ID (optional)"
                    />
                    <p class="mt-1 text-xs text-gray-500">For tax reporting purposes</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Website
                    </label>
                    <input
                      v-model="formData.website"
                      type="url"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white"
                      placeholder="https://yourwebsite.com (optional)"
                    />
                  </div>
                </div>
              </div>

              <!-- Step 3: Address Information -->
              <div v-if="currentStep === 3" class="space-y-6 flex-1">
                <div>
                  <label class="block text-sm font-medium text-[#022b5f] mb-2">
                    Street Address *
                  </label>
                  <input
                    v-model="formData.street"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white shadow-sm"
                    :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.street }"
                    placeholder="Enter your street address"
                  />
                  <p v-if="errors.street" class="mt-1 text-sm text-red-600">{{ errors.street }}</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      City *
                    </label>
                    <input
                      v-model="formData.city"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white shadow-sm"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.city }"
                      placeholder="Enter your city"
                    />
                    <p v-if="errors.city" class="mt-1 text-sm text-red-600">{{ errors.city }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      State/Province
                    </label>
                    <input
                      v-model="formData.state"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white shadow-sm"
                      placeholder="Enter your state/province"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      ZIP/Postal Code *
                    </label>
                    <input
                      v-model="formData.zipCode"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white shadow-sm"
                      :class="{ 'border-red-500 ring-2 ring-red-500/20': errors.zipCode }"
                      placeholder="Enter your ZIP/postal code"
                    />
                    <p v-if="errors.zipCode" class="mt-1 text-sm text-red-600">{{ errors.zipCode }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#022b5f] mb-2">
                      Country *
                    </label>
                    <select
                      v-model="formData.country"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbb03b] focus:border-[#fbb03b] transition-all duration-200 bg-white shadow-sm"
                    >
                      <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons - Sticky at bottom -->
              <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  @click="handlePrevious"
                  class="flex items-center px-6 py-3 text-[#022b5f] hover:text-[#022b5f]/80 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 border border-[#022b5f]/20 hover:border-[#022b5f]/40"
                >
                  <i class="pi pi-chevron-left mr-2"></i>
                  Previous
                </button>
                <div v-else></div>

                <button
                  type="submit"
                  class="flex items-center px-8 py-3 bg-[#fbb03b] text-white font-semibold rounded-lg hover:bg-[#fbb03b]/90 focus:outline-none focus:ring-2 focus:ring-[#fbb03b]/50 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                  :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                  :disabled="isSubmitting"
                >
                  <span v-if="currentStep < steps.length">
                    Next
                    <i class="pi pi-chevron-right ml-2"></i>
                  </span>
                  <span v-else>
                    <i class="pi pi-check mr-2"></i>
                    Complete Registration
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="mt-8 pt-4 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
              <div class="flex items-center space-x-4 mb-2 sm:mb-0">
                <span class="flex items-center">
                  <i class="pi pi-shield mr-1 text-green-600"></i>
                  Secure & Encrypted
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock mr-1 text-[#fbb03b]"></i>
                  2-3 minutes to complete
                </span>
              </div>
              <div>
                Already have an account? 
                <a href="#" class="text-[#022b5f] hover:text-[#022b5f]/80 font-medium transition-colors duration-200">Sign in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)
const isSubmitting = ref(false)

const formData = ref({
  // Personal Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  marketplace: '',
  
  // Business Information
  businessName: '',
  businessType: '',
  taxId: '',
  website: '',
  
  // Address Information
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States'
})

const errors = ref({})

const steps = [
  {
    id: 1,
    title: 'Personal Details',
    subtitle: 'Tell us about yourself',
    icon: 'pi-user'
  },
  {
    id: 2,
    title: 'Business Information',
    subtitle: 'Your business details',
    icon: 'pi-building'
  },
  {
    id: 3,
    title: 'Address Details',
    subtitle: 'Where are you located?',
    icon: 'pi-map-marker'
  }
]

const businessTypes = [
  'Individual/Sole Proprietorship',
  'LLC',
  'Corporation',
  'Partnership',
  'Non-profit',
  'Other'
]

const marketplaces = [
  'Amazon',
  'eBay',
  'Etsy',
  'Shopify',
  'WooCommerce',
  'Facebook Marketplace',
  'Instagram Shop',
  'Mercari',
  'Poshmark',
  'Depop',
  'Other'
]

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Other'
]

const getStepIcon = (stepId) => {
  const iconMap = {
    1: 'pi-user',
    2: 'pi-building', 
    3: 'pi-map-marker'
  }
  return iconMap[stepId] || 'pi-circle'
}

const validateStep = (step) => {
  const newErrors = {}
  
  if (step === 1) {
    // Personal Information validation
    if (!formData.value.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.value.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.value.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.value.marketplace) {
      newErrors.marketplace = 'Please select a marketplace'
    }
  }
  
  if (step === 2) {
    // Business Information validation
    if (!formData.value.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }
    if (!formData.value.businessType) {
      newErrors.businessType = 'Please select a business type'
    }
  }
  
  if (step === 3) {
    // Address Information validation
    if (!formData.value.street.trim()) {
      newErrors.street = 'Street address is required'
    }
    if (!formData.value.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.value.zipCode.trim()) {
      newErrors.zipCode = 'ZIP/Postal code is required'
    }
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleNext = async () => {
  if (!validateStep(currentStep.value)) {
    return
  }
  
  if (currentStep.value < steps.length) {
    currentStep.value++
  } else {
    // Final submission
    isSubmitting.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', formData.value)
      alert('Registration completed successfully!')
      
      // Reset form or redirect
      // window.location.href = '/dashboard'
    } catch (error) {
      console.error('Submission error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
}

const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    // Clear errors when going back
    errors.value = {}
  }
}
</script>