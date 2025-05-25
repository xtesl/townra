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
              @click="startRegistration"
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
        <div class="bg-white rounded p-6 sm:p-8 border border-gray-200 hover:shadow-md duration-300">
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
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded p-6 transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-bolt text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Easy Setup</h3>
              <p class="text-gray-600 leading-relaxed">Get your store running in minutes with our intuitive setup wizard guiding every step.</p>
            </div>
          </div>

          <!-- Feature 2: Low Fees -->
          <div class="group">
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-dollar text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Competitive Fees</h3>
              <p class="text-gray-600 leading-relaxed">Keep more profits with our transparent, competitive fee structure. No hidden charges.</p>
            </div>
          </div>

          <!-- Feature 3: Global Reach -->
          <div class="group">
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-globe text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Global Reach</h3>
              <p class="text-gray-600 leading-relaxed">Sell worldwide with international shipping and multi-currency support.</p>
            </div>
          </div>

          <!-- Feature 4: Analytics -->
          <div class="group">
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-chart-line text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">Advanced Analytics</h3>
              <p class="text-gray-600 leading-relaxed">Track performance with detailed insights and reports to optimize your strategy.</p>
            </div>
          </div>

          <!-- Feature 5: 24/7 Support -->
          <div class="group">
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors duration-300">
                <i class="pi pi-headphones text-lg text-gray-600 group-hover:text-amber-500"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3 text-blue-900">24/7 Support</h3>
              <p class="text-gray-600 leading-relaxed">Dedicated support team ready to help you succeed and solve challenges.</p>
            </div>
          </div>

          <!-- Feature 6: Marketing Tools -->
          <div class="group">
            <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

    
    <!-- <section class="py-16 sm:py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-6 text-blue-900">
            Success Stories
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our sellers are thriving on the platform
          </p>
        </div> -->

        <!-- <div class="grid md:grid-cols-3 gap-8">
        
          <div class="bg-white rounded p-6 border border-gray-200 hover:shadow transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                S
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">Sarah M.</h4>
                <p class="text-gray-600 text-sm">Fashion Seller</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              "Within 3 months, I increased my revenue by 300%. The platform's tools made scaling incredibly straightforward."
            </p>
            <div class="font-semibold text-sm text-amber-500">+300% Revenue Growth</div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                M
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">Mike T.</h4>
                <p class="text-gray-600 text-sm">Electronics Seller</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              "The analytics helped me understand customers better. I optimized inventory and doubled profits in 6 months."
            </p>
            <div class="font-semibold text-sm text-amber-500">2x Profit Increase</div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                A
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">Alex K.</h4>
                <p class="text-gray-600 text-sm">Student Seller</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              "As a student, the reduced fees helped me start without breaking the bank. Now I'm funding my education!"
            </p>
            <div class="font-semibold text-sm text-amber-500">College Funding Achieved</div>
          </div>
        </div> -->


      <!-- </div>
    </section> -->

    <!-- Final CTA Section -->
    <section class="py-16 sm:py-20 bg-white border-t border-gray-200">
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
// Methods
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>