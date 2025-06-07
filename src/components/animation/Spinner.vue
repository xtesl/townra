<template>
     <div :class="spinnerSizeClass">
              <div class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div :class="[
                'absolute inset-0 rounded-full border-4 border-transparent animate-spin',
                colorClasses.border
              ]" style="border-top-color: currentColor;"></div>
            </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
        size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'purple', 'red', 'yellow', 'indigo'].includes(value)
  },
});


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
});


const spinnerSizeClass = computed(() => {
  return `relative ${sizeClasses.value.spinner}`
});

</script>