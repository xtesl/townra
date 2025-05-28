<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Your main content -->
    <div class="max-w-6xl mx-auto">
      <!-- Header with tour trigger -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Welcome to Our App</h1>
          <button 
            id="start-tour-btn"
            @click="startTour" 
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take a Tour
          </button>
        </div>
      </div>

      <!-- Features to highlight in tour -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Feature 1 -->
        <div 
          id="feature-dashboard" 
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Dashboard</h3>
          <p class="text-gray-600">View all your important metrics at a glance.</p>
        </div>

        <!-- Feature 2 -->
        <div 
          id="feature-analytics" 
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Analytics</h3>
          <p class="text-gray-600">Deep insights into your data and performance.</p>
        </div>

        <!-- Feature 3 -->
        <div 
          id="feature-settings" 
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Settings</h3>
          <p class="text-gray-600">Customize your experience and preferences.</p>
        </div>
      </div>

      <!-- Search bar -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <label for="search-input" class="block text-sm font-medium text-gray-700 mb-2">
          Quick Search
        </label>
        <input 
          id="search-input"
          type="text" 
          placeholder="Search for anything..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>

      <!-- Navigation menu -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
        <div 
          id="navigation-menu" 
          class="flex flex-wrap gap-4"
        >
          <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            Create New
          </button>
          <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            Import Data
          </button>
          <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            Export Reports
          </button>
          <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            Manage Users
          </button>
        </div>
      </div>
    </div>

    <!-- Product Tour Component -->
    <ProductTour
      ref="tourRef"
      :steps="tourSteps"
      :auto-start="false"
      :overlay-click-to-close="true"
      :escape-to-close="true"
      @tour-start="onTourStart"
      @tour-end="onTourEnd"
      @step-change="onStepChange"
      @tour-skip="onTourSkip"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ProductTour from "../components/animation/ProductTour.vue"

// Template ref for the tour component
const tourRef = ref(null)

// Define tour steps
const tourSteps = ref([
  {
    target: '#start-tour-btn',
    title: 'Welcome! 👋',
    content: 'This is where you can start the product tour anytime. Click here whenever you need a refresher!',
    placement: 'bottom',
    highlightPadding: 12,
    overlayOpacity: 0.7
  },
  {
    target: '#feature-dashboard',
    title: 'Dashboard Overview',
    content: 'Your dashboard gives you a quick overview of all your important metrics. This is your home base for monitoring performance.',
    placement: 'top',
    highlightPadding: 8
  },
  {
    target: '#feature-analytics',
    title: 'Analytics & Insights',
    content: 'Dive deep into your data with our powerful analytics tools. Get actionable insights to make better decisions.',
    placement: 'top',
    highlightPadding: 8
  },
  {
    target: '#feature-settings',
    title: 'Customize Your Experience',
    content: 'Personalize the app to fit your workflow. Configure notifications, themes, and other preferences here.',
    placement: 'top',
    highlightPadding: 8
  },
  {
    target: '#search-input',
    title: 'Quick Search',
    content: 'Find anything instantly with our smart search. Try typing keywords, names, or even ask questions!',
    placement: 'bottom',
    scrollIntoView: true
  },
  {
    target: '#navigation-menu',
    title: 'Quick Actions',
    content: 'Access your most common tasks with these quick action buttons. They\'re shortcuts to boost your productivity!',
    placement: 'top',
    highlightPadding: 10
  }
])

// Tour event handlers
const onTourStart = () => {
  console.log('🚀 Product tour started!')
  // You could track this event in analytics
  // analytics.track('tour_started')
}

const onTourEnd = () => {
  console.log('✅ Product tour completed!')
  // Save that user has completed the tour
  try {
    localStorage.setItem('tour_completed', 'true')
  } catch (e) {
    console.warn('Could not save tour completion status')
  }
  // analytics.track('tour_completed')
}

const onStepChange = ({ stepIndex, step }) => {
  console.log(`📍 Tour step ${stepIndex + 1}: ${step.title}`)
  // Track individual step views
  // analytics.track('tour_step_viewed', { step: stepIndex + 1, title: step.title })
}

const onTourSkip = () => {
  console.log('⏭️ Tour was skipped')
  // Track when users skip the tour
  // analytics.track('tour_skipped')
}

// Method to start the tour programmatically
const startTour = () => {
  if (tourRef.value && tourSteps.value.length > 0) {
    tourRef.value.startTour()
  }
}

// Check if user should see the tour
const shouldShowTour = () => {
  try {
    return !localStorage.getItem('tour_completed')
  } catch (e) {
    return false // If localStorage is not available, don't show tour
  }
}

// Auto-start tour for new users
onMounted(async () => {
  // Wait for DOM to be fully rendered
  await nextTick()
  
  // Small delay to ensure everything is loaded
  setTimeout(() => {
    if (shouldShowTour()) {
      startTour()
    }
  }, 1500)
})

// Expose methods if needed by parent components
defineExpose({
  startTour
})
</script>

<style scoped>
/* Add any custom styles for your view here */
</style>