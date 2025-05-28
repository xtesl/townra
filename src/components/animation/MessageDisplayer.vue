<template>
  <!-- Toast Container - Fixed top left -->
    <div class="fixed top-4 left-4 z-[9999] pointer-events-none">
      <TransitionGroup name="toast" tag="div" class="space-y-3">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'relative pointer-events-auto transform transition-all duration-300 ease-out',
            'rounded-lg backdrop-blur-md border',
            'max-w-sm w-full sm:max-w-md lg:max-w-lg',
            'hover:shadow-2xl hover:scale-[1.02] transition-all duration-200',
            getMessageClasses(message.type)
          ]"
        >
          <!-- Main Content -->
          <div class="p-4 pr-10">
            <div class="flex items-start space-x-3">
              <!-- Icon -->
              <div class="flex-shrink-0 mt-0.5">
                <div :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center',
                  getIconBackgroundClass(message.type)
                ]">
                  <svg 
                    :class="['w-4 h-4', getIconColorClass(message.type)]"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path v-if="message.type === 'success'" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    <path v-else-if="message.type === 'error'" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    <path v-else-if="message.type === 'warning'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <!-- Message Content -->
              <div class="flex-1 min-w-0">
                <p :class="['text-sm font-medium leading-relaxed', getTextColorClass(message.type)]">
                  {{ message.text }}
                </p>
                <div class="mt-1 text-xs opacity-70" :class="getTextColorClass(message.type)">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Close Button -->
          <button
            @click="removeMessage(message.id)"
            :class="[
              'absolute top-3 right-3 p-1 rounded-full transition-all duration-200',
              'hover:bg-black hover:bg-opacity-10 active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              getCloseButtonClass(message.type)
            ]"
            aria-label="Close notification"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Progress Bar -->
          <div 
            class="absolute bottom-0 left-0 h-1 rounded-bl-lg transition-all duration-100 ease-linear"
            :class="getProgressBarClass(message.type)"
            :style="{ width: message.progress + '%' }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// Reactive state
const messages = ref([])
const nextId = ref(1)

// Message configuration
const messageConfig = {
  success: {
    bgColor: 'bg-white border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    textColor: 'text-gray-800',
    closeButton: 'focus:ring-green-500 text-green-600 hover:text-green-800',
    progressBar: 'bg-green-500'
  },
  error: {
    bgColor: 'bg-white border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    textColor: 'text-gray-800',
    closeButton: 'focus:ring-red-500 text-red-600 hover:text-red-800',
    progressBar: 'bg-red-500'
  },
  warning: {
    bgColor: 'bg-white border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    textColor: 'text-gray-800',
    closeButton: 'focus:ring-yellow-500 text-yellow-600 hover:text-yellow-800',
    progressBar: 'bg-yellow-500'
  },
  info: {
    bgColor: 'bg-white border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    textColor: 'text-gray-800',
    closeButton: 'focus:ring-blue-500 text-blue-600 hover:text-blue-800',
    progressBar: 'bg-blue-500'
  }
}

// Active timers for cleanup
const activeTimers = ref(new Map())

// Add message function
const addMessage = (text, type = 'info', duration = 5000) => {
  const id = nextId.value++
  const timestamp = new Date()
  
  const newMessage = {
    id,
    text,
    type,
    timestamp,
    progress: 100
  }
  
  messages.value.unshift(newMessage) // Add to beginning for top-down stacking
  
  // Start progress bar animation
  let progress = 100
  const interval = setInterval(() => {
    progress -= (100 / (duration / 100))
    const messageIndex = messages.value.findIndex(m => m.id === id)
    if (messageIndex !== -1) {
      messages.value[messageIndex].progress = Math.max(0, progress)
    }
    
    if (progress <= 0) {
      clearInterval(interval)
    }
  }, 100)
  
  // Auto remove after duration
  const timeout = setTimeout(() => {
    removeMessage(id)
  }, duration)
  
  // Store timer references for cleanup
  activeTimers.value.set(id, { interval, timeout })
}

// Remove message function
const removeMessage = (id) => {
  // Clear timers
  const timers = activeTimers.value.get(id)
  if (timers) {
    clearInterval(timers.interval)
    clearTimeout(timers.timeout)
    activeTimers.value.delete(id)
  }
  
  // Remove message
  const index = messages.value.findIndex(m => m.id === id)
  if (index !== -1) {
    messages.value.splice(index, 1)
  }
}

// Helper functions for styling
const getMessageClasses = (type) => {
  return messageConfig[type]?.bgColor || messageConfig.info.bgColor
}

const getIconBackgroundClass = (type) => {
  return messageConfig[type]?.iconBg || messageConfig.info.iconBg
}

const getIconColorClass = (type) => {
  return messageConfig[type]?.iconColor || messageConfig.info.iconColor
}

const getTextColorClass = (type) => {
  return messageConfig[type]?.textColor || messageConfig.info.textColor
}

const getCloseButtonClass = (type) => {
  return messageConfig[type]?.closeButton || messageConfig.info.closeButton
}

const getProgressBarClass = (type) => {
  return messageConfig[type]?.progressBar || messageConfig.info.progressBar
}

// Format timestamp
const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

// Cleanup on unmount
onUnmounted(() => {
  activeTimers.value.forEach(({ interval, timeout }) => {
    clearInterval(interval)
    clearTimeout(timeout)
  })
  activeTimers.value.clear()
})

// Expose methods for external use
defineExpose({
  addMessage,
  removeMessage,
  clearAll: () => {
    messages.value.forEach(msg => removeMessage(msg.id))
  }
})
</script>

<style scoped>
/* Toast animations */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Enhanced hover effects */
.toast-item:hover .progress-bar {
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fixed.top-4.left-4 {
    top: 1rem;
    left: 1rem;
    right: 1rem;
  }
  
  .fixed.top-4.left-4 > div > div {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .fixed.top-4.left-4 {
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
  }
}
</style>