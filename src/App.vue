<!-- <script setup>
import PageLoader from './components/animation/PageLoader.vue'
import { onMounted, ref } from 'vue'

const showPageLoader = ref(true);

onMounted(async() => {
     await new Promise((resolve) => setTimeout(resolve, 1000));
     showPageLoader.value = false;
})
</script>


<template>
  <div id="app">
     
    <router-view />
    <div :v-if="showPageLoader">
      <PageLoader
        :isVisible="showPageLoader"
        :message="''"
        :showLogo="false"
        type="pulse"
        color="blue"
      />
    </div>
  </div>
</template> -->

<!-- App.vue -->
<script setup>
import PageLoader from './components/animation/PageLoader.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const showPageLoader = ref(true)
const router = useRouter()

// Hide loader after initial app mount (avoids white screen flash)
onMounted(() => {
  setTimeout(() => {
    showPageLoader.value = false
  }, 300) // tweak delay if needed
})

// Route change loader with exclusions
router.beforeEach((to, from, next) => {
  if (!to.meta.disableLoader) {
    showPageLoader.value = true
  }
  next()
})

router.afterEach((to) => {
  if (!to.meta.disableLoader) {
    setTimeout(() => {
      showPageLoader.value = false
    }, 500)
  }
})
</script>


<template>
  <div id="app">
    <router-view />
    
    <PageLoader
      v-if="showPageLoader"
      :isVisible="showPageLoader"
      :message="''"
      :showLogo="false"
      type="pulse"
      color="blue"
    />
  </div>
</template>



