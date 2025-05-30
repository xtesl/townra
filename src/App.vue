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
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from './stores'
import apiClient from "./api/axios"

const authStore = useAuthStore();


const showPageLoader = ref(true);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const fetchAccountType = async () => {
      try {
     showPageLoader.value = true
      
    const response = await apiClient.get("/users/user-type");
    if (response.status == 200){
     authStore.userType = response.data.data.type
    }
    
  } catch (error) {
    
  }finally{
    showPageLoader.value = false;
  }
}

watch(
  () => isAuthenticated.value,
  async (newVal) => {
    if (newVal) {
      await fetchAccountType()
    }else{
      if(!isAuthenticated.value){
        setTimeout(() => {
        if (!isAuthenticated.value) {
          showPageLoader.value = false;
        }
      }, 400); 
    }
      }
  },
  { immediate: true } 
)


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



