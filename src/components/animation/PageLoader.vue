<!-- PageLoader.vue -->
<template>
  <Teleport to="body">
    <Transition
      name="loader"
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      @enter="disableScroll"
      @leave="enableScroll"
    >
      <div
        v-if="isVisible"
        :class="[
          'fixed inset-0 w-full h-full z-[9999] flex items-center justify-center overflow-hidden',
          overlay ? 'bg-white/80 backdrop-blur-2xl dark:bg-gray-900/80' : ''
        ]"
        role="status"
        aria-label="Loading"
      >
        <div class="flex flex-col items-center space-y-4 p-8">
          <!-- Logo/Brand Section -->
          <div v-if="showLogo" class="mb-2">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Loading Animation -->
          <div class="relative">
            <!-- Spinner Type -->
            <div v-if="type === 'spinner'" :class="spinnerSizeClass">
              <div class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div :class="[
                'absolute inset-0 rounded-full border-4 border-transparent animate-spin',
                colorClasses.border
              ]" style="border-top-color: currentColor;"></div>
            </div>

            <!-- Pulse Type -->
            <div v-else-if="type === 'pulse'" class="flex space-x-2">
              <div
                v-for="i in 3"
                :key="i"
                :class="[
                  'rounded-full animate-pulse',
                  sizeClasses.pulse,
                  colorClasses.bg
                ]"
                :style="`animation-delay: ${(i - 1) * 0.15}s`"
              ></div>
            </div>

            <!-- Dots Type -->
            <div v-else-if="type === 'dots'" class="flex space-x-1">
              <div
                v-for="i in 3"
                :key="i"
                :class="[
                  'rounded-full animate-bounce',
                  sizeClasses.dot,
                  colorClasses.bg
                ]"
                :style="`animation-delay: ${(i - 1) * 0.1}s`"
              ></div>
            </div>

            <!-- Bars Type -->
            <div v-else-if="type === 'bars'" class="flex items-end space-x-1">
              <div
                v-for="i in 5"
                :key="i"
                :class="[
                  'animate-pulse',
                  sizeClasses.bar,
                  colorClasses.bg
                ]"
                :style="`animation-delay: ${(i - 1) * 0.1}s; animation-duration: 1s;`"
              ></div>
            </div>

            <!-- Ring Type -->
            <div v-else-if="type === 'ring'" :class="spinnerSizeClass">
              <div class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div :class="[
                'absolute inset-0 rounded-full border-4 border-transparent animate-spin',
                colorClasses.border
              ]" style="border-left-color: currentColor; border-right-color: currentColor;"></div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div v-if="showProgress" class="w-64 mt-4">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{{ message }}</span>
              <span>{{ Math.round(displayProgress) }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                :class="[
                  'h-2 rounded-full transition-all duration-300 ease-out',
                  colorClasses.bg
                ]"
                :style="`width: ${displayProgress}%`"
              ></div>
            </div>
          </div>

          <!-- Loading Message -->
          <div v-if="message && !showProgress" class="text-center">
            <p :class="[
              'font-medium',
              sizeClasses.text,
              colorClasses.text
            ]">
              {{ message }}
            </p>
            <p v-if="subMessage" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ subMessage }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'spinner',
    validator: (value) => ['spinner', 'pulse', 'dots', 'bars', 'ring'].includes(value)
  },
  message: {
    type: String,
    default: 'Loading...'
  },
  subMessage: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'purple', 'red', 'yellow', 'indigo'].includes(value)
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  autoProgress: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  }
})

// Reactive data
const displayProgress = ref(0)
const autoProgressInterval = ref(null)

// Scroll management
const disableScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

// Computed properties for dynamic classes
const colorClasses = computed(() => {
  const colors = {
    blue: {
      bg: 'bg-blue-600',
      border: 'border-blue-600',
      text: 'text-blue-600 dark:text-blue-400'
    },
    green: {
      bg: 'bg-green-600',
      border: 'border-green-600',
      text: 'text-green-600 dark:text-green-400'
    },
    purple: {
      bg: 'bg-purple-600',
      border: 'border-purple-600',
      text: 'text-purple-600 dark:text-purple-400'
    },
    red: {
      bg: 'bg-red-600',
      border: 'border-red-600',
      text: 'text-red-600 dark:text-red-400'
    },
    yellow: {
      bg: 'bg-yellow-600',
      border: 'border-yellow-600',
      text: 'text-yellow-600 dark:text-yellow-400'
    },
    indigo: {
      bg: 'bg-indigo-600',
      border: 'border-indigo-600',
      text: 'text-indigo-600 dark:text-indigo-400'
    }
  }
  return colors[props.color] || colors.blue
})

const sizeClasses = computed(() => {
  const sizes = {
    small: {
      spinner: 'w-8 h-8',
      pulse: 'w-3 h-3',
      dot: 'w-2 h-2',
      bar: 'w-1 h-6',
      text: 'text-sm'
    },
    medium: {
      spinner: 'w-12 h-12',
      pulse: 'w-4 h-4',
      dot: 'w-3 h-3',
      bar: 'w-1 h-8',
      text: 'text-base'
    },
    large: {
      spinner: 'w-16 h-16',
      pulse: 'w-6 h-6',
      dot: 'w-4 h-4',
      bar: 'w-2 h-10',
      text: 'text-lg'
    }
  }
  return sizes[props.size] || sizes.medium
})

const spinnerSizeClass = computed(() => {
  return `relative ${sizeClasses.value.spinner}`
})

// Watch for progress changes
watch(() => props.progress, (newVal) => {
  displayProgress.value = Math.max(0, Math.min(100, newVal))
})

// Auto progress functionality
const startAutoProgress = () => {
  if (!props.autoProgress) return
  
  const increment = 100 / (props.duration / 50)
  autoProgressInterval.value = setInterval(() => {
    if (displayProgress.value >= 100) {
      clearInterval(autoProgressInterval.value)
      return
    }
    displayProgress.value = Math.min(100, displayProgress.value + increment)
  }, 50)
}

const stopAutoProgress = () => {
  if (autoProgressInterval.value) {
    clearInterval(autoProgressInterval.value)
    autoProgressInterval.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  if (props.showProgress) {
    displayProgress.value = props.progress
    if (props.autoProgress) {
      startAutoProgress()
    }
  }
  
  // Disable scroll if loader is initially visible
  if (props.isVisible) {
    disableScroll()
  }
})

onUnmounted(() => {
  stopAutoProgress()
  enableScroll()
})

// Watch visibility for auto progress and scroll management
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    disableScroll()
    if (props.autoProgress && props.showProgress) {
      displayProgress.value = 0
      startAutoProgress()
    }
  } else {
    enableScroll()
    stopAutoProgress()
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse-scale 1.5s ease-in-out infinite;
}

@keyframes bounce-dots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce {
  animation: bounce-dots 1.4s ease-in-out infinite;
}
</style>