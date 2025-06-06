
<script setup>
import PageLoader from './components/animation/PageLoader.vue'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from './stores'

const authStore = useAuthStore();


const showPageLoader = ref(true);
const isInitialized = computed(() => authStore.isInitialized);


 watch(() => isInitialized.value,
  async (newVal) => {
    if (newVal) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showPageLoader.value = false;
    }
  },
 { immediate: true } 
);

</script>



<template>
  <div id="app">
    <router-view />
  
    <PageLoader
      :isVisible="showPageLoader"
      :message="''"
      :showLogo="false"
      type="pulse"
      color="blue"
    /> 
  </div>
</template>



