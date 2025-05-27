<script setup>
import PageLoader from './components/animation/PageLoader.vue'
import { useGlobalLoader } from './composables/useLoader'
const { isLoading, loadingMessage } = useGlobalLoader()
</script>


<template>
  <div id="app">
    <!-- Your app content -->
    <router-view />
    
    <!-- Global PageLoader -->
    <!-- <PageLoader 
      :isVisible="isLoading" 
      :message="''"
      type="pulse"
      color="blue"
      :overlay="true"
    /> -->
  </div>
</template>


