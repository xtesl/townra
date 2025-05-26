<template>
  <div class="min-h-screen bg-gradient-to-br from-[#034080] to-[#0056b3] flex items-center justify-center p-4">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center">
      <!-- Animated Logo/Brand -->
      <div class="mb-8 relative">
        <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <img
            src="/images/logo.png"
            alt="Townra Logo"
            class="w-16 h-16 object-contain"
            @error="handleImageError"
          />
          <span v-if="imageError" class="font-bold text-white text-2xl">T</span>
        </div>
        
        <!-- Spinner -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        
        <!-- Loading Text -->
        <h2 class="text-2xl font-bold text-white mb-2">Verifying Your Token</h2>
        <p class="text-white/80 text-lg">Please wait while we authenticate your request...</p>
        
        <!-- Progress Dots -->
        <div class="flex justify-center gap-2 mt-6">
          <div class="w-3 h-3 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
          <div class="w-3 h-3 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
          <div class="w-3 h-3 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
        </div>
      </div>
    </div>

    <!-- OTP Display Modal -->
    <div v-else-if="showOtp && otpCode" class="w-full max-w-md">
      <div class="bg-white rounded-2xl p-8 animate-fade-in">
        <!-- Success Icon -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-check-circle text-4xl text-green-600"></i>
          </div>
          <h1 class="text-3xl font-bold text-[#034080] mb-4">Verification Code</h1>
          <p class="text-gray-600 leading-relaxed">
            Use this code to complete your login where you first tried to sign in.
          </p>
        </div>

        <!-- OTP Code Display -->
        <div class="bg-gradient-to-r from-[#034080]/5 to-[#e09a2a]/5 rounded-xl p-6 mb-8 border border-[#034080]/10">
          <div class="text-center">
            <p class="text-sm font-semibold text-[#034080] mb-3 uppercase tracking-wide">Your Verification Code</p>
            <div class="text-6xl font-bold text-[#034080] tracking-wider mb-4 font-mono">
              {{ formatOtpCode(otpCode) }}
            </div>
            <p class="text-xs text-gray-500">This code expires in 15 minutes</p>
          </div>
        </div>

        <!-- Instructions -->
        <div class="space-y-4 mb-8">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-[#034080]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-[#034080] font-bold text-sm">1</span>
            </div>
            <p class="text-gray-700">Go back to the login page on your original device/browser</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-[#034080]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-[#034080] font-bold text-sm">2</span>
            </div>
            <p class="text-gray-700">Enter this 6-digit code</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-[#034080]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-[#034080] font-bold text-sm">3</span>
            </div>
            <p class="text-gray-700">You'll be automatically signed in</p>
          </div>
        </div>

        <!-- Copy Code Button -->
        <button
          @click="copyOtpCode"
          class="w-full bg-[#034080] hover:bg-[#034080]/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mb-4"
        >
          <span v-if="!copied" class="flex items-center justify-center gap-2">
            <i class="pi pi-copy"></i>
            Copy Code
          </span>
          <span v-else class="flex items-center justify-center gap-2 text-green-100">
            <i class="pi pi-check"></i>
            Copied!
          </span>
        </button>

        <!-- Alternative Action -->
        <button
          @click="goToLogin"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Go to Login Page
        </button>
      </div>
    </div>

    <!-- Success/Redirect Modal -->
    <div v-else-if="isSuccess" class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in text-center">
        <!-- Success Animation -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="pi pi-check text-4xl text-green-600 animate-bounce"></i>
        </div>
        
        <h1 class="text-3xl font-bold text-[#034080] mb-4">Welcome Back!</h1>
        <p class="text-gray-600 mb-8 leading-relaxed">
          You have been successfully authenticated. Redirecting to your dashboard...
        </p>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div class="bg-gradient-to-r from-[#034080] to-[#e09a2a] h-2 rounded-full animate-pulse" style="width: 100%;"></div>
        </div>
        
        <p class="text-sm text-gray-500">Please wait...</p>
      </div>
    </div>

    <!-- Error Modal -->
    <div v-else-if="hasError" class="w-full max-w-md">
      <div class="bg-white rounded-2xl p-8 animate-fade-in text-center">
        <!-- Error Icon -->
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="pi pi-times-circle text-4xl text-red-600"></i>
        </div>
        
        <h1 class="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
        <p class="text-gray-600 mb-8 leading-relaxed">
          {{ errorMessage }}
        </p>
        
        <!-- Retry Button -->
        <button
          @click="goToLogin"
          class="w-full bg-[#034080] hover:bg-[#034080]/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mb-4"
        >
          <i class="pi pi-refresh mr-2"></i>
          Try Again
        </button>
        
        <!-- Go Home Button -->
        <button
          @click="goHome"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>

    <!-- Background Decorative Elements -->
    <div class="absolute top-20 left-20 w-32 h-32 bg-[#e09a2a]/20 rounded-full blur-2xl"></div>
    <div class="absolute bottom-20 right-32 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    <div class="absolute top-1/2 right-10 w-16 h-16 bg-[#e09a2a]/30 rounded-full blur-lg"></div>
    <div class="absolute bottom-10 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import apiClient from "../../api/axios"; 
import { useRouter } from "vue-router";

// Reactive state
const token = ref('')
const isLoading = ref(true)
const showOtp = ref(false)
const otpCode = ref('')
const isSuccess = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const copied = ref(false)
const imageError = ref(false)

const router = useRouter();

// Methods
const handleImageError = () => {
  imageError.value = true
}

const formatOtpCode = (code) => {
  // Format as XXX-XXX for better readability
  if (code && code.length === 6) {
    return `${code.substring(0, 3)}-${code.substring(3, 6)}`
  }
  return code
}

const copyOtpCode = async () => {
  try {
    await navigator.clipboard.writeText(otpCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
    // Fallback for browsers that don't support clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = otpCode.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const verifyToken = async () => {
  try {
    // Simulate API call - replace with your actual API endpoint
    // const response = await new Promise((resolve) => {
    //   setTimeout(() => {
    
    //     if (token.value === 'demo-otp') {
    //       resolve({ 
    //         status: 200, 
    //         data: { otp: '123456', message: 'OTP generated successfully' }
    //       })
    //     } else if (token.value === 'demo-success') {
    //       resolve({ 
    //         status: 200, 
    //         data: { success: true, message: 'Authentication successful' }
    //       })
    //     } else if (token.value) {
          
    //       resolve({ 
    //         status: 200, 
    //         data: { otp: '567890', message: 'OTP generated successfully' }
    //       })
    //     } else {
    //       throw new Error('Invalid or missing token')
    //     }
    //   }, 2000) 
    // })

    const hash = window.location.hash;
    token.value = hash.replace(/^#/, '');
    const response = await apiClient.post(`/auth/login?token=${token.value}`)


    if (response.status == 200) {
      router.replace("/")
      router.removeRoute("/auth/magic-login/")
    } else if (response.status == 202) {
        otpCode.value = response.data.data.fallback_otp
        showOtp.value = true
    }

  } catch (error) {
    console.error('Token verification failed:', error)
    hasError.value = true
    errorMessage.value = 'This link is invalid or has expired. If the problem persists, please contact support.'
  } finally {
    isLoading.value = false
  }
}

const retryVerification = () => {
  hasError.value = false
  errorMessage.value = ''
  isLoading.value = true
  showOtp.value = false
  isSuccess.value = false
  verifyToken()
}

const goToLogin = () => {
  router.replace('/auth/login')
  router.removeRoute("/auth/magic-login/")
}

const goHome = () => {
  router.replace('/') 
  router.removeRoute("/auth/magic-login/")
}

onMounted(() => {
  const hash = window.location.hash
  token.value = hash.replace(/^#/, '')
  if (!token.value) {
    hasError.value = true
    errorMessage.value = 'Something is wrong!'
    isLoading.value = false
    return
  }
  
  // Start token verification
  verifyToken()
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Bounce animation with different delays */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-15px);
  }
  70% {
    transform: translateY(-7px);
  }
  90% {
    transform: translateY(-3px);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite;
}

/* Ensure proper mobile handling */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 3rem;
  }
}

/* Pulse animation for progress bar */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>