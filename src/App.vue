<script setup>
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
</template>

