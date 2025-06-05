<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Component -->
    <!-- <Navbar /> -->
     <MobileNavbar />
    
    <!-- Main Content Area -->
    <main class="flex-1">
      <!-- Your page content goes here -->
       <Listing />
      <!-- <slot /> -->
    </main>
    <MobileBottomBar />
    <!-- Footer Component -->
    <Footer />
  </div>
</template>


<script setup>
  import { onMounted } from "vue"
import Footer from "../components/navigation/Footer.vue"
  import Navbar from "../components/navigation/Navbar.vue"
  import Listing from "../components/products/Listing.vue"
  import { useGlobalLoader } from "../composables/useLoader"
  import MobileNavbar from "../components/navigation/MobileNavbar.vue"
  import MobileBottomBar from "../components/navigation/MobileBottomBar.vue"

const { showLoader, hideLoader } = useGlobalLoader()
  onMounted(() =>{
  // showLoader("")

  })
</script>