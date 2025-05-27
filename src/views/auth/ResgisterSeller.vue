<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section with Background -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-400"></div>
      <div 
        class="absolute inset-0 opacity-20"
        style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      ></div>
      
      <!-- Back Button -->
      <button 
        @click="goBack"
        class="absolute top-6 left-6 z-20  backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <i class="pi pi-arrow-left text-lg"></i>
      </button>

      <!-- Hero Content -->
      <div class="relative z-10 px-6 py-20 sm:py-24 lg:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mx-auto mb-6 flex items-center justify-center">
              <!-- <i class="pi pi-shop text-2xl text-amber-300"></i> -->
                <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
               
              />
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Professional Selling
              <span class="block text-amber-300">Made Simple</span>
            </h1>
            <p class="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join thousands of successful sellers on our platform. Build your brand, reach more customers, and grow your business with professional-grade tools.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              @click="scrollToPricing"
              class="bg-white text-blue-900 font-semibold py-3 px-8 rounded transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <i class="pi pi-play mr-2"></i>
              Get Started
          </button>
            <button
              @click="scrollToFeatures"
              class="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold py-3 px-8 rounded transition-all duration-300 border border-white/30 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <i class="pi pi-info-circle mr-2"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse hidden lg:block"></div>
      <div class="absolute bottom-32 right-16 w-16 h-16 bg-amber-300/20 rounded-full animate-bounce hidden lg:block"></div>
      <div class="absolute top-1/2 right-8 w-12 h-12 bg-white/5 rounded-full animate-ping hidden lg:block"></div>
    </section>

    <!-- Student Discount Banner -->
    <section class="py-8 bg-gray-50 border-y border-gray-200">
      <div class="max-w-6xl mx-auto px-6">
        <div class="bg-white rounded p-6 sm:p-8 border-gray-200 duration-300">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <i class="pi pi-graduation-cap text-xl text-amber-500"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-1 text-blue-900">Student Discount Available</h3>
                <p class="text-gray-600">Reduced platform fees for verified students</p>
              </div>
            </div>
            <div class="text-center lg:text-right">
              <div class="text-2xl font-bold mb-1 text-amber-500">50% OFF</div>
              <div class="text-gray-600 text-sm">Platform fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 sm:py-20 lg:py-24 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-6 text-blue-900">
            Why Choose Our Platform?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed as a professional seller, from powerful analytics to seamless payment processing.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1: Easy Setup -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded p-6 transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-bolt text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Easy Setup</h3>
              <p class="text-gray-600 leading-relaxed">Get your store running in minutes with our intuitive setup wizard guiding every step.</p>
            </div>
          </div>

          <!-- Feature 2: Low Fees -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-dollar text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Competitive Fees</h3>
              <p class="text-gray-600 leading-relaxed">Keep more profits with our transparent, competitive fee structure. No hidden charges.</p>
            </div>
          </div>

          <!-- Feature 3: Global Reach -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-globe text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Global Reach</h3>
              <p class="text-gray-600 leading-relaxed">Sell worldwide with international shipping and multi-currency support.</p>
            </div>
          </div>

          <!-- Feature 4: Analytics -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-chart-line text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Advanced Analytics</h3>
              <p class="text-gray-600 leading-relaxed">Track performance with detailed insights and reports to optimize your strategy.</p>
            </div>
          </div>

          <!-- Feature 5: 24/7 Support -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-headphones text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">24/7 Support</h3>
              <p class="text-gray-600 leading-relaxed">Dedicated support team ready to help you succeed and solve challenges.</p>
            </div>
          </div>

          <!-- Feature 6: Marketing Tools -->
          <div class="group">
            <div class="bg-white border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-megaphone text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Marketing Tools</h3>
              <p class="text-gray-600 leading-relaxed">Built-in SEO optimization, social media integration, and advertising tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-6 text-blue-900">
            Choose Your Plan
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start your selling journey with our flexible plans designed to grow with your business.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Starter Plan -->
          <div class="relative bg-white border rounded-xl border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow">
            <div class="p-6 sm:p-8">
              <!-- Free Trial Badge -->
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  30-Day Free Trial
                </div>
              </div>
              
              <div class="text-center mb-8 pt-4">
                <div class="w-16 h-16 bg-blue-50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <i class="pi pi-bolt text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-blue-900">Starter</h3>
                <p class="text-gray-600 mb-6">Perfect for new sellers getting started</p>
                
                <div class="mb-6">
                  <div class="text-4xl font-bold text-blue-900">$29</div>
                  <div class="text-gray-600">/month after trial</div>
                </div>
              </div>

              <!-- Features List -->
              <div class="space-y-4 mb-8">
                <div v-for="feature in starterFeatures" :key="feature.text" class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <i class="pi pi-check text-xs text-green-600"></i>
                  </div>
                  <div>
                    <span class="text-gray-700">{{ feature.text }}</span>
                    <div v-if="feature.description" class="text-sm text-gray-500 mt-1">
                      {{ feature.description }}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                @click="selectPlan('starter')"
                class="w-full bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-900/50"
              >
                <i class="pi pi-play mr-2"></i>
                Start Free Trial
              </button>
            </div>
          </div>

          <!-- Professional Plan -->
          <div class="relative bg-white rounded-xl border-2 border-amber-300 hover:border-amber-400 transition-all duration-300">
            <!-- Popular Badge -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div class="bg-amber-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
            
            <div class="p-6 sm:p-8">
              <div class="text-center mb-8 pt-4">
                <div class="w-16 h-16 bg-amber-50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <i class="pi pi-crown text-2xl text-amber-500"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-blue-900">Professional</h3>
                <p class="text-gray-600 mb-6">For serious sellers ready to scale</p>
                
                <div class="mb-6">
                  <div class="text-4xl font-bold text-blue-900">$79</div>
                  <div class="text-gray-600">/month</div>
                </div>
              </div>

              <!-- Features List -->
              <div class="space-y-4 mb-8">
                <div v-for="feature in professionalFeatures" :key="feature.text" class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <i class="pi pi-check text-xs text-green-600"></i>
                  </div>
                  <div>
                    <span class="text-gray-700">{{ feature.text }}</span>
                    <div v-if="feature.description" class="text-sm text-gray-500 mt-1">
                      {{ feature.description }}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                @click="selectPlan('professional')"
                class="w-full bg-amber-400 text-blue-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-amber-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <i class="pi pi-crown mr-2"></i>
                Get Professional
              </button>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="text-center mt-12">
          <div class="bg-white rounded-lg p-6 border-gray-200 max-w-2xl mx-auto">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <i class="pi pi-shield text-green-600"></i>
                <span>Cancel anytime</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-credit-card text-green-600"></i>
                <span>No setup fees</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-headphones text-green-600"></i>
                <span>24/7 support included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 sm:py-20 bg-white border-gray-200">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-6 text-blue-900">
          Ready to Start Your Journey?
        </h2>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Join our community of successful sellers and take your business to the next level.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="startRegistration"
            class="bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
          >
            <i class="pi pi-rocket mr-2"></i>
            Start Selling Today
          </button>
          <button
            @click="contactSupport"
            class="bg-white hover:bg-gray-50 text-blue-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-blue-900 hover:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
          >
            <i class="pi pi-phone mr-2"></i>
            Talk to an Expert
          </button>
        </div>

        <div class="mt-8 text-gray-500">
          <p>
            <i class="pi pi-shield mr-2"></i>
            Secure • Trusted • Reliable
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from "vue-router"

// Pricing data - easily customizable
const starterFeatures = ref([
  { 
    text: 'Up to 100 products',
    description: 'Perfect for testing the waters'
  },
  { 
    text: 'Basic analytics dashboard',
    description: 'Track sales and customer data'
  },
  { 
    text: 'Standard payment processing',
    description: '2.9% + 30¢ per transaction'
  },
  { 
    text: 'Email support',
    description: 'Response within 24 hours'
  },
  { 
    text: 'Mobile-optimized store',
    description: 'Your store works perfectly on all devices'
  },
  { 
    text: 'SSL security',
    description: 'Keep customer data safe'
  }
])

const professionalFeatures = ref([
  { 
    text: 'Unlimited products',
    description: 'Scale without limits'
  },
  { 
    text: 'Advanced analytics & reporting',
    description: 'Deep insights and custom reports'
  },
  { 
    text: 'Priority payment processing',
    description: '2.4% + 30¢ per transaction'
  },
  { 
    text: 'Priority support (phone + email)',
    description: 'Get help when you need it most'
  },
  { 
    text: 'Custom domain & branding',
    description: 'Build your brand identity'
  },
  { 
    text: 'Advanced marketing tools',
    description: 'Email campaigns, SEO tools, social integration'
  },
  { 
    text: 'Inventory management',
    description: 'Track stock levels and automate reordering'
  },
  { 
    text: 'Multi-channel selling',
    description: 'Sell on social media and marketplaces'
  }
])

// Methods
const selectPlan = (planType) => {
  console.log(`Selected plan: ${planType}`)
  alert(`Redirecting to ${planType} plan signup...`)
  // Here you would typically redirect to your signup/checkout process
}

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing')
  if (pricingSection) {
    pricingSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const startRegistration = () => {
  console.log('Starting seller registration process')
  alert('Starting registration process...')
}

const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features')
  if (featuresSection) {
    featuresSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const contactSupport = () => {
  console.log('Opening support contact')
  alert('Opening support contact...')
}

const goBack = () => {
  // Navigate back or to previous page
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = '/'
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

html {
  scroll-behavior: smooth;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

</style>
