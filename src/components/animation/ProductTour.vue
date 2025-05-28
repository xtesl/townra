<template>
  <div v-if="isActive" class="fixed inset-0 z-50">
    <!-- Smart overlay with subtle darkening -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Top overlay -->
      <div 
        v-if="highlightedElement"
        class="absolute inset-x-0 top-0 bg-black transition-all duration-700 ease-out"
        :style="{ height: highlightBounds.top + 'px', opacity: overlayOpacity }"
      ></div>
      
      <!-- Left overlay -->
      <div 
        v-if="highlightedElement"
        class="absolute bg-black transition-all duration-700 ease-out"
        :style="{ 
          top: highlightBounds.top + 'px',
          left: '0px',
          width: highlightBounds.left + 'px',
          height: highlightBounds.height + 'px',
          opacity: overlayOpacity 
        }"
      ></div>
      
      <!-- Right overlay -->
      <div 
        v-if="highlightedElement"
        class="absolute bg-black transition-all duration-700 ease-out"
        :style="{ 
          top: highlightBounds.top + 'px',
          left: (highlightBounds.left + highlightBounds.width) + 'px',
          right: '0px',
          height: highlightBounds.height + 'px',
          opacity: overlayOpacity 
        }"
      ></div>
      
      <!-- Bottom overlay -->
      <div 
        v-if="highlightedElement"
        class="absolute inset-x-0 bg-black transition-all duration-700 ease-out"
        :style="{ 
          top: (highlightBounds.top + highlightBounds.height) + 'px',
          bottom: '0px',
          opacity: overlayOpacity 
        }"
      ></div>
      
      <!-- Fallback full overlay when no element is highlighted -->
      <div 
        v-if="!highlightedElement"
        class="absolute inset-0 bg-black transition-opacity duration-500"
        :style="{ opacity: overlayOpacity }"
        @click="handleOverlayClick"
      ></div>
    </div>
    
    <!-- Highlighted element with subtle professional border -->
    <div
      v-if="currentStep && highlightedElement"
      class="absolute transition-all duration-700 ease-out pointer-events-none"
      :style="highlightStyle"
    >
      <!-- Clean professional border -->
      <div class="absolute inset-0 rounded-lg">
        <!-- Main highlight border -->
        <div class="absolute inset-0 rounded-lg border-3 border-[#fbb03b] shadow-lg"></div>
        <!-- Inner glow effect -->
        <div class="absolute inset-0 rounded-lg border border-[#fbb03b]/30 shadow-[0_0_20px_rgba(251,176,59,0.3)]"></div>
        <!-- Corner accent dots -->
        <div class="absolute -top-1 -left-1 w-3 h-3 bg-[#fbb03b] rounded-full shadow-sm"></div>
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-[#fbb03b] rounded-full shadow-sm"></div>
        <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-[#fbb03b] rounded-full shadow-sm"></div>
        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-[#fbb03b] rounded-full shadow-sm"></div>
      </div>
    </div>
    
    <!-- Professional tour card -->
    <div
      v-if="currentStep"
      class="absolute transition-all duration-700 ease-out z-10 pointer-events-auto"
      :style="tooltipStyle"
      :class="tooltipClasses"
    >
      <!-- Main card with company-grade design -->
      <div class="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <!-- Subtle gradient background -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white"></div>
        
        <!-- Top accent bar -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#022b5f] via-[#fbb03b] to-[#022b5f]"></div>
        
        <!-- Arrow pointer -->
        <div
          class="absolute w-4 h-4 rotate-45 bg-white border-l border-t border-gray-100"
          :class="arrowClasses"
        ></div>
        
        <!-- Card content -->
        <div class="relative p-6 lg:p-8">
          <!-- Header section -->
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center space-x-4 flex-1 min-w-0">
              <!-- Step indicator with professional styling -->
              <div class="relative flex-shrink-0">
                <div class="w-12 h-12 bg-[#022b5f] rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold text-lg">{{ currentStepIndex + 1 }}</span>
                </div>
                <!-- Progress ring -->
                <svg class="absolute -inset-1 w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="26" fill="none" stroke="#e5e7eb" stroke-width="2"/>
                  <circle 
                    cx="28" cy="28" r="26" 
                    fill="none" 
                    stroke="#fbb03b" 
                    stroke-width="2"
                    stroke-linecap="round"
                    :stroke-dasharray="`${2 * Math.PI * 26}`"
                    :stroke-dashoffset="`${2 * Math.PI * 26 * (1 - progressPercentage / 100)}`"
                    class="transition-all duration-700 ease-out"
                  />
                </svg>
              </div>
              
              <!-- Title and meta info -->
              <div class="min-w-0 flex-1">
                <h3 class="text-xl font-bold text-[#022b5f] mb-2 leading-tight">{{ currentStep.title }}</h3>
                <div class="flex items-center space-x-3 text-sm text-gray-600">
                  <span class="font-medium">Step {{ currentStepIndex + 1 }}</span>
                  <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>{{ steps.length }} total</span>
                  <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span class="text-[#fbb03b] font-semibold">{{ Math.round(progressPercentage) }}% complete</span>
                </div>
              </div>
            </div>
            
            <!-- Close button -->
            <button
              @click="closeTour"
              class="group p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 flex-shrink-0 ml-4"
              title="Close tour"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Content section -->
          <div class="mb-8">
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 leading-relaxed text-base mb-0">{{ currentStep.content }}</p>
            </div>
          </div>
          
          <!-- Progress section -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-gray-600">Tour Progress</span>
              <span class="text-sm font-semibold text-[#022b5f]">{{ currentStepIndex + 1 }} / {{ steps.length }}</span>
            </div>
            
            <!-- Enhanced progress bar -->
            <div class="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-gradient-to-r from-[#022b5f] to-[#fbb03b] rounded-full transition-all duration-1000 ease-out"
                :style="{ width: progressPercentage + '%' }"
              ></div>
              
              <!-- Step indicators -->
              <div class="absolute inset-0 flex items-center px-1">
                <div 
                  v-for="(step, index) in steps" 
                  :key="index"
                  class="flex-1 flex justify-center"
                  :class="{ 'justify-start': index === 0, 'justify-end': index === steps.length - 1 }"
                >
                  <div 
                    class="w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-500 shadow-sm"
                    :class="index <= currentStepIndex ? 'bg-[#fbb03b]' : 'bg-gray-300'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <!-- Previous button -->
            <button
              @click="prevStep"
              :disabled="currentStepIndex === 0"
              class="group flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 order-2 sm:order-1"
            >
              <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span>Previous</span>
            </button>
            
            <!-- Right side buttons -->
            <div class="flex space-x-3 order-1 sm:order-2">
              <!-- Skip button -->
              <button
                @click="skipTour"
                class="px-6 py-3 text-sm font-medium text-gray-600 hover:text-[#022b5f] hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                Skip Tour
              </button>
              
              <!-- Next/Finish button -->
              <button
                @click="nextStep"
                class="group flex items-center justify-center space-x-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#022b5f] to-[#fbb03b] hover:from-[#033a7a] hover:to-[#fcc55c] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[140px]"
              >
                <span>{{ isLastStep ? 'Finish Tour' : 'Next Step' }}</span>
                <svg 
                  v-if="!isLastStep" 
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <svg 
                  v-else 
                  class="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch, readonly } from 'vue'

// Props
const props = defineProps({
  steps: {
    type: Array,
    required: false,
    default: () => []
  },
  autoStart: {
    type: Boolean,
    default: false
  },
  overlayClickToClose: {
    type: Boolean,
    default: true
  },
  escapeToClose: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits([
  'tour-start',
  'tour-end',
  'step-change',
  'tour-skip'
])

// Reactive state
const isActive = ref(false)
const currentStepIndex = ref(0)
const highlightedElement = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipPlacement = ref('bottom')
const highlightBounds = ref({ top: 0, left: 0, width: 0, height: 0 })

// Computed properties
const currentStep = computed(() => props.steps[currentStepIndex.value])
const isLastStep = computed(() => currentStepIndex.value === props.steps.length - 1)
const progressPercentage = computed(() => ((currentStepIndex.value + 1) / props.steps.length) * 100)
const overlayOpacity = computed(() => currentStep.value?.overlayOpacity || 0.25)

const highlightStyle = computed(() => {
  if (!highlightedElement.value) return {}
  
  const padding = currentStep.value?.highlightPadding || 12
  return {
    top: `${highlightBounds.value.top - padding}px`,
    left: `${highlightBounds.value.left - padding}px`,
    width: `${highlightBounds.value.width + padding * 2}px`,
    height: `${highlightBounds.value.height + padding * 2}px`
  }
})

const tooltipStyle = computed(() => ({
  top: `${tooltipPosition.value.y}px`,
  left: `${tooltipPosition.value.x}px`,
  maxWidth: window.innerWidth < 768 ? `${window.innerWidth - 24}px` : '520px'
}))

const tooltipClasses = computed(() => ({
  'animate-slideIn': true,
  'w-full': window.innerWidth < 768,
  'max-w-lg': window.innerWidth >= 768
}))

const arrowClasses = computed(() => {
  const placement = tooltipPlacement.value
  const classes = {
    top: 'bottom-[-8px] left-1/2 transform -translate-x-1/2',
    bottom: 'top-[-8px] left-1/2 transform -translate-x-1/2',
    left: 'right-[-8px] top-1/2 transform -translate-y-1/2',
    right: 'left-[-8px] top-1/2 transform -translate-y-1/2'
  }
  return classes[placement] || classes.bottom
})

// Methods
const startTour = () => {
  if (props.steps.length === 0) return
  
  isActive.value = true
  currentStepIndex.value = 0
  emit('tour-start')
  updateStepPosition()
}

const closeTour = () => {
  isActive.value = false
  highlightedElement.value = null
  emit('tour-end')
}

const skipTour = () => {
  emit('tour-skip')
  closeTour()
}

const nextStep = () => {
  if (isLastStep.value) {
    closeTour()
  } else {
    currentStepIndex.value++
    updateStepPosition()
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
    updateStepPosition()
  }
}

const goToStep = (stepIndex) => {
  if (stepIndex >= 0 && stepIndex < props.steps.length) {
    currentStepIndex.value = stepIndex
    updateStepPosition()
  }
}

const updateStepPosition = async () => {
  await nextTick()
  
  const step = currentStep.value
  if (!step?.target) {
    highlightedElement.value = null
    return
  }
  
  // Find target element
  const targetElement = document.querySelector(step.target)
  if (!targetElement) {
    console.warn(`Product Tour: Target element "${step.target}" not found`)
    highlightedElement.value = null
    return
  }
  
  highlightedElement.value = targetElement
  
  // Scroll element into view if needed
  if (step.scrollIntoView !== false) {
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
      inline: 'center'
    })
  }
  
  // Update highlight bounds
  await nextTick()
  updateHighlightBounds(targetElement)
  
  // Calculate tooltip position
  calculateTooltipPosition(targetElement, step)
  
  emit('step-change', { stepIndex: currentStepIndex.value, step })
}

const updateHighlightBounds = (targetElement) => {
  const rect = targetElement.getBoundingClientRect()
  highlightBounds.value = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  }
}

const calculateTooltipPosition = (targetElement, step) => {
  const targetRect = targetElement.getBoundingClientRect()
  const isMobile = window.innerWidth < 768
  const tooltipWidth = isMobile ? window.innerWidth - 24 : 520
  const tooltipHeight = 400
  const margin = isMobile ? 12 : 24
  const safeZone = 40
  
  const preferredPlacement = step.placement || 'bottom'
  let placement = preferredPlacement
  let x = 0
  let y = 0
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  const spaceBelow = viewportHeight - targetRect.bottom - safeZone
  const spaceAbove = targetRect.top - safeZone
  const spaceRight = viewportWidth - targetRect.right - safeZone
  const spaceLeft = targetRect.left - safeZone
  
  // Smart placement logic
  if (spaceBelow >= tooltipHeight && (placement === 'bottom' || spaceBelow > spaceAbove)) {
    placement = 'bottom'
    x = isMobile ? margin : Math.max(margin, Math.min(targetRect.left + targetRect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - margin))
    y = targetRect.bottom + safeZone
  } else if (spaceAbove >= tooltipHeight) {
    placement = 'top'
    x = isMobile ? margin : Math.max(margin, Math.min(targetRect.left + targetRect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - margin))
    y = targetRect.top - tooltipHeight - safeZone
  } else if (!isMobile && spaceRight >= tooltipWidth) {
    placement = 'right'
    x = targetRect.right + safeZone
    y = Math.max(margin, Math.min(targetRect.top + targetRect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - margin))
  } else if (!isMobile && spaceLeft >= tooltipWidth) {
    placement = 'left'
    x = targetRect.left - tooltipWidth - safeZone
    y = Math.max(margin, Math.min(targetRect.top + targetRect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - margin))
  } else {
    // Fallback positioning
    placement = 'bottom'
    x = margin
    y = Math.max(margin, Math.min(targetRect.bottom + margin, viewportHeight - tooltipHeight - margin))
  }
  
  tooltipPosition.value = { x, y }
  tooltipPlacement.value = placement
}

const handleOverlayClick = () => {
  if (props.overlayClickToClose) {
    closeTour()
  }
}

const handleKeydown = (e) => {
  if (!isActive.value) return
  
  switch (e.key) {
    case 'Escape':
      if (props.escapeToClose) closeTour()
      break
    case 'ArrowRight':
    case ' ':
      e.preventDefault()
      nextStep()
      break
    case 'ArrowLeft':
      e.preventDefault()
      prevStep()
      break
  }
}

// Watchers
watch(currentStepIndex, () => {
  updateStepPosition()
})

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', updateStepPosition)
  
  if (props.autoStart) {
    startTour()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updateStepPosition)
})

// Expose methods
defineExpose({
  startTour,
  closeTour,
  skipTour,
  nextStep,
  prevStep,
  goToStep,
  isActive: readonly(isActive),
  currentStepIndex: readonly(currentStepIndex)
})
</script>

<style scoped>
@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: scale(0.96) translateY(16px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

.animate-slideIn {
  animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom border width utility */
.border-3 {
  border-width: 3px;
}

/* Prose styles for better text rendering */
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 0;
}
</style>