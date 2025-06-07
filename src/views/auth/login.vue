<template>
  <div class="min-h-screen bg-white">
    <div :v-if="showPageLoader">
      <PageLoader
        :isVisible="showPageLoader"
        :message="''"
        :showLogo="false"
        type="pulse"
        color="blue"
      />
    </div>
    <!-- Back Button -->
    <button
      @click="goBack"
      class="fixed top-6 left-6 z-10 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-[#034080] px-4 py-2 rounded transition-all duration-300 flex items-center gap-2 hover:shadow-md"
    >
      <i class="pi pi-arrow-left text-sm"></i>
      <span class="hidden sm:inline font-medium text-white">Back</span>
    </button>

    <div class="flex min-h-screen">
      <!-- Left Side - Branding/Info -->
      <div
        class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#034080] to-[#0056b3] relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-black/10"></div>
        <div
          class="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white"
        >
          <div class="mb-8">
            <img
              src="/images/logo.png"
              alt="Townra Logo"
              class="w-20 h-20 bg-white object-contain transition-transform duration-300 group-hover:scale-110"
              @error="handleImageError"
            />

            <!-- Fallback letter if image fails to load -->
            <span v-if="imageError" class="font-bold text-white text-lg">
              T
            </span>
            <h1 class="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Welcome to Our
              <span class="text-[#e09a2a]">Professional</span>
              Platform
            </h1>
            <p class="text-xl text-white/90 leading-relaxed">
              Secure, passwordless authentication for a seamless experience.
              Join thousands of users who trust our platform.
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <i class="pi pi-shield text-white"></i>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Secure & Safe</h3>
                <p class="text-white/80">
                  Advanced security with passwordless authentication
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <i class="pi pi-bolt text-white"></i>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Fast & Easy</h3>
                <p class="text-white/80">
                  Quick access without remembering passwords
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <i class="pi pi-users text-white"></i>
              </div>
              <div>
                <h3 class="font-semibold text-lg">Trusted Platform</h3>
                <p class="text-white/80">
                  Join our community of verified users
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div
          class="absolute top-20 right-20 w-32 h-32 bg-[#e09a2a]/20 rounded-full blur-2xl"
        ></div>
        <div
          class="absolute bottom-20 right-32 w-24 h-24 bg-white/10 rounded-full blur-xl"
        ></div>
        <div
          class="absolute top-1/2 right-10 w-16 h-16 bg-[#e09a2a]/30 rounded-full blur-lg"
        ></div>
      </div>

      <!-- Right Side - Login Form -->
      <div
        class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12"
      >
        <div class="w-full max-w-md">
          <!-- Mobile Header (hidden on desktop) -->
          <div class="lg:hidden text-center mb-8">
            <div
              class="w-16 h-16 bg-gradient-to-r from-[#034080] to-[#e09a2a] rounded mx-auto mb-4 flex items-center justify-center"
            >
              <img
                src="/images/logo.png"
                alt="Townra Logo"
                class="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError"
              />
            </div>
            <h1 class="text-2xl font-bold text-[#034080] mb-2">Welcome Back</h1>
            <p class="text-gray-600">Sign in to your account</p>
          </div>

          <!-- Desktop Header -->
          <div class="hidden lg:block mb-8">
            <h1 class="text-3xl font-bold text-[#034080] mb-2">Sign In</h1>
            <p class="text-gray-600">Enter your email to get started</p>
          </div>

          <!-- Login Form - Show only when no modals are active -->
          <div
            v-show="!showEmailLinkModal && !showOtpModal"
            class="bg-white border border-gray-100 rounded p-8"
          >
            <form @submit.prevent="handleEmailLogin" class="space-y-6">
              <!-- Email Input -->
              <div class="space-y-2">
                <label
                  for="email"
                  class="block text-sm font-semibold text-[#034080]"
                >
                  Email Address
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    :disabled="isLoading"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded focus:ring-2 focus:ring-[#e09a2a]/20 focus:border-[#e09a2a] transition-all duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email address"
                  />
                  <i
                    class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  ></i>
                </div>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                :disabled="isLoading || !email"
                class="w-full bg-[#034080] hover:bg-[#034080]/90 disabled:bg-gray-300 text-white font-semibold py-4 px-6 
                rounded transition-all duration-300 transform hover:scale-[1.02] 
                disabled:transform-none disabled:cursor-not-allowed hover:shadow-xl"
              >
                <span
                  v-if="!isLoading"
                  class="flex items-center justify-center gap-2"
                >
                  <i class="pi pi-send"></i>
                  Send Magic Link
                </span>
                <div v-else class="flex items-center justify-center gap-3">
                  <div
                    class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                  <span>Sending...</span>
                </div>
              </button>
            </form>

            <div
              v-if="showError"
              class="mt-6 p-4 bg-red-50 border border-red-200 rounded"
            >
              <div class="flex items-center gap-3">
                <i class="pi pi-times-circle text-red-600"></i>
                <div>
                  <!-- <p class="text-red-800 font-medium">Error sending email</p> -->
                  <p class="text-red-700 text-sm">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
            <!-- Social Login Divider -->
            <div class="my-8 flex items-center">
              <div class="flex-1 border-t border-gray-200"></div>
              <span class="px-4 text-gray-500 text-sm font-medium">or</span>
              <div class="flex-1 border-t border-gray-200"></div>
            </div>

            <!-- Google Login -->
            <button
              @click="loginWithGoogle"
              :disabled="spinning"

              class="w-full bg-white border border-gray-200 hover:border-[#e09a2a] hover:bg-gray-50 text-gray-700 
              font-semibold py-4 px-6 rounded transition-all duration-300 flex items-center justify-center gap-3 
              hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!spinning" class="flex items-center justify-center gap-2">
                <i>
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </i>
                Continue with Google
              </span>
               <div v-else class="flex items-center justify-center gap-3">
                  <div
                    class="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"
                  ></div>
                  <span>Please wait...</span>
                </div>
            </button>
          </div>
          <div
            v-if="showGoogleErrorMessage"
            class="mt-6 p-4 bg-red-50 border border-red-200 rounded"
          >
            <div class="flex items-center gap-3">
              <i class="pi pi-times-circle text-red-600"></i>
              <div>
                <!-- <p class="text-red-800 font-medium">Error sending email</p> -->
                <p class="text-red-700 text-sm">{{ googleErrorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Email Link Sent Modal -->
          <div
            v-show="showEmailLinkModal"
            class="bg-white border border-gray-100 rounded p-8 animate-fade-in"
          >
            <div class="text-center">
              <div
                class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <i class="pi pi-envelope text-3xl text-green-600"></i>
              </div>
              <h2 class="text-2xl font-bold text-[#034080] mb-4">
                Check Your Email
              </h2>
              <p class="text-gray-600 mb-2 leading-relaxed">
                We've sent a magic link to:
              </p>
              <p class="text-[#034080] font-semibold text-lg mb-6">
                {{ email }}
              </p>
              <p class="text-gray-600 text-sm leading-relaxed">
                Click the link in your email to continue. The link will expire
                in 15 minutes.
              </p>
              <div
                class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
              >
                <div
                  class="w-2 h-2 bg-[#e09a2a] rounded-full animate-pulse"
                ></div>
                <span>Waiting for confirmation...</span>
              </div>
            </div>
          </div>

          <!-- OTP Code Modal -->
          <div
            v-show="showOtpModal"
            class="bg-white border border-gray-100 rounded p-8 animate-fade-in"
          >
            <div class="text-center">
              <div
                class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <i class="pi pi-key text-3xl text-blue-600"></i>
              </div>
              <h2 class="text-2xl font-bold text-[#034080] mb-4">
                Enter Verification Code
              </h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Didn't receive the email? Enter the 6-digit code sent to your
                device instead.
              </p>

              <form @submit.prevent="handleOtpSubmit" class="space-y-6">
                <div class="space-y-2">
                  <label
                    for="otp"
                    class="block text-sm font-semibold text-[#034080]"
                  >
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    v-model="otpCode"
                    type="text"
                    maxlength="6"
                    placeholder="Enter 6-digit code"
                    class="w-full px-4 py-4 text-center text-xl tracking-widest border-2 border-gray-200 rounded focus:ring-2 focus:ring-[#e09a2a]/20 focus:border-[#e09a2a] transition-all duration-300 bg-white text-gray-900 placeholder-gray-500"
                    @input="otpCode = otpCode.replace(/\D/g, '')"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="otpCode.length !== 6"
                  class="w-full bg-[#034080] hover:bg-[#034080]/90 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed hover:shadow-xl"
                >
                  <span class="flex items-center justify-center gap-2">
                    <i class="pi pi-check"></i>
                    Verify Code
                  </span>
                </button>
              </form>

              <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  @click="resendEmail"
                  class="text-[#034080] hover:text-[#e09a2a] font-semibold transition-colors underline decoration-2 underline-offset-2"
                >
                  Resend Email
                </button>
                <button
                  @click="goBackToForm"
                  class="text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                >
                  Use Different Email
                </button>
              </div>
            </div>
          </div>

          <!-- Seller Registration - Only show when forms are visible -->
          <div
            v-show="!showEmailLinkModal && !showOtpModal"
            class="mt-8 p-6 bg-gradient-to-r from-[#e09a2a]/5 to-[#e09a2a]/10 rounded border border-[#e09a2a]/20"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 bg-[#e09a2a]/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="pi pi-shopping-bag text-[#e09a2a]"></i>
              </div>
              <h3 class="text-lg font-bold text-[#034080] mb-2">
                Become a Seller
              </h3>
              <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                <i class="pi pi-info-circle text-[#e09a2a] mr-1"></i>
                Seller registration is exclusively available for verified
                business entities only
              </p>
              <router-link
                to="/auth/register"
                class="bg-[#e09a2a] hover:bg-[#e09a2a]/90 text-white font-semibold py-3 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow"
              >
                <i class="pi pi-arrow-right mr-2"></i>
                Register as Seller
              </router-link>
            </div>
          </div>

          <!-- Terms and Conditions - Only show when forms are visible -->
          <div
            v-show="!showEmailLinkModal && !showOtpModal"
            class="mt-6 text-center text-sm text-gray-600"
          >
            <p class="leading-relaxed">
              By signing in, you agree to our
              <button
                @click="showTerms = true"
                class="text-[#034080] hover:text-[#e09a2a] font-semibold transition-colors underline decoration-2 underline-offset-2"
              >
                Terms of Service
              </button>
              and
              <button
                @click="showPrivacy = true"
                class="text-[#034080] hover:text-[#e09a2a] font-semibold transition-colors underline decoration-2 underline-offset-2"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Terms Modal -->
    <div
      v-if="showTerms"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click="showTerms = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
        @click.stop
      >
        <div
          class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50"
        >
          <h2 class="text-2xl font-bold text-[#034080]">Terms of Service</h2>
          <button
            @click="showTerms = false"
            class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="prose prose-sm text-gray-700 space-y-6">
            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                1. Acceptance of Terms
              </h3>
              <p class="leading-relaxed">
                By accessing and using our platform, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                2. User Responsibilities
              </h3>
              <p class="leading-relaxed">
                Users are responsible for maintaining the confidentiality of
                their account information and for all activities that occur
                under their account.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                3. Seller Verification
              </h3>
              <p class="leading-relaxed">
                Seller registration requires verification and approval. Only
                legitimate business entities are permitted to register as
                sellers.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                4. Data Protection
              </h3>
              <p class="leading-relaxed">
                We are committed to protecting your personal information and
                will handle your data in accordance with our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-100 flex justify-end bg-gray-50">
          <button
            @click="showTerms = false"
            class="bg-[#034080] hover:bg-[#034080]/90 text-white px-6 py-3 rounded-xl transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <div
      v-if="showPrivacy"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click="showPrivacy = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
        @click.stop
      >
        <div
          class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50"
        >
          <h2 class="text-2xl font-bold text-[#034080]">Privacy Policy</h2>
          <button
            @click="showPrivacy = false"
            class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="prose prose-sm text-gray-700 space-y-6">
            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                Information We Collect
              </h3>
              <p class="leading-relaxed">
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us for
                support.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                How We Use Your Information
              </h3>
              <p class="leading-relaxed">
                We use the information we collect to provide, maintain, and
                improve our services, process transactions, and communicate with
                you.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                Information Sharing
              </h3>
              <p class="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-[#034080] mb-3">
                Data Security
              </h3>
              <p class="leading-relaxed">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-100 flex justify-end bg-gray-50">
          <button
            @click="showPrivacy = false"
            class="bg-[#034080] hover:bg-[#034080]/90 text-white px-6 py-3 rounded-xl transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../../api/axios";
import { useReCaptcha } from "vue-recaptcha-v3";
import Cookies from "js-cookie";
import Spinner from "../../components/animation/Spinner.vue";
import PageLoader from "../../components/animation/PageLoader.vue";

const { executeRecaptcha } = useReCaptcha();

// Reactive data
const email = ref("");
const isLoading = ref(false);
const showEmailLinkModal = ref(false);
const showOtpModal = ref(false);
const otpCode = ref("");
const showTerms = ref(false);
const showPrivacy = ref(false);
const imageError = ref(false);
const showError = ref(false);
const errorMessage = ref("");
const showPageLoader = ref(false);
const spinning = ref(false);
const showGoogleErrorMessage = ref(false);
const googleErrorMessage = ref("");

// Methods
const handleImageError = () => {
  imageError.value = true;
};

// const async fetchData

const handleEmailLogin = async () => {
  if (!email.value) return;

  isLoading.value = true;

  try {
    errorMessage.value = "";
    showError.value = false;

    const recaptcha_token = await executeRecaptcha("login");
    const recaptcha_site_key = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const payload = {
      recaptcha_token: recaptcha_token,
      recaptcha_site_key: recaptcha_site_key,
    };
    const response = await apiClient.post(
      `/auth/request-login?credential=${email.value}`,
      payload
    );
    const response_data = response.data;

    const deviceId = response_data.data.device_id;
    if (deviceId) {
      Cookies.set("townra-device-id", deviceId, {
        expires: 30, // 1 year
        path: "/",
        sameSite: "Lax",
        secure: false, // Set to true in production over HTTPS
      });
    }
    // Show email link modal
    showEmailLinkModal.value = true;

    // After 5 seconds, hide email modal and show OTP modal
    setTimeout(() => {
      showEmailLinkModal.value = false;
      showOtpModal.value = true;
    }, 5000);
  } catch (error) {
    showError.value = true;
    errorMessage.value = "Failed to send login link. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const handleOtpSubmit = async () => {
  if (otpCode.value.length !== 6) return;

  try {
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("OTP verified:", otpCode.value);
    alert("OTP verified successfully!");

    // Reset form
    showOtpModal.value = false;
    otpCode.value = "";
    email.value = "";
  } catch (error) {
    console.error("OTP verification error:", error);
    alert("Invalid OTP. Please try again.");
  }
};

const resendEmail = async () => {
  try {
    // Simulate resending email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Email resent successfully!");
  } catch (error) {
    console.error("Resend error:", error);
    alert("Failed to resend email. Please try again.");
  }
};

const goBackToForm = () => {
  showOtpModal.value = false;
  showEmailLinkModal.value = false;
  otpCode.value = "";
};

const handleGoogleLogin = async () => {
  try {
    spinning.value = true;
    showGoogleErrorMessage.value = false;
    googleErrorMessage.value = "";
    const response = await apiClient.get(
      "http://localhost:8000/auth/login/google"
    );
  } catch (error) {
    console.log("hello")
    showGoogleErrorMessage.value = true;
    googleErrorMessage.value = "Something went wrong. Please try again.";
  } finally {
    spinning.value = false;
  }
};


const loginWithGoogle = () => {
  spinning.value = true
  const popup = window.open(
    'http://localhost:8000/auth/login/google',
    'googleAuth',
    'width=500,height=600,scrollbars=yes,resizable=yes'
  )

  // Listen for messages from popup
  const messageListener = (event) => {
    if (event.origin !== 'http://localhost:8000') return
    
    window.removeEventListener('message', messageListener)
    popup.close()
    
    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      // Redirect happens in MAIN window, not popup
      window.location.href = event.data.redirectUrl || '/'
    } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
      googleErrorMessage.value = "Login failed. Please try again."
      showGoogleErrorMessage.value = true
      spinning.value = false
    }
  }

  window.addEventListener('message', messageListener)
  
  const checkClosed = setInterval(() => {
    if (popup.closed) {
      clearInterval(checkClosed)
      window.removeEventListener('message', messageListener)
      spinning.value = false
    }
  }, 1000)
}

// const handlePopupAuth = (popup) => {
//   return new Promise((resolve, reject) => {
//     let checkClosed

//     const cleanup = () => {
//       if (checkClosed) clearInterval(checkClosed)
//       window.removeEventListener('message', messageListener)
//     }

//     checkClosed = setInterval(() => {
//       if (popup.closed) {
//         cleanup()
//         reject(new Error('Authentication cancelled'))
//       }
//     }, 1000)

//     const messageListener = (event) => {
//       if (event.origin !== 'http://localhost:8000') return
      
//       cleanup()
//       popup.close()

//       if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
//         window.location.href = '/' 
//         resolve()
//       } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
//         reject(new Error(event.data.error || 'Authentication failed'))
//       }
//     }
//     window.addEventListener('message', messageListener)
//   })
// }


const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
};

onMounted(() => {
  email.value = "";
});
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Ensure proper mobile handling */
@media (max-width: 1023px) {
  .min-h-screen {
    min-height: 100dvh;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .fixed {
    position: absolute;
  }
}
</style>
