<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Component -->
    <!-- <Navbar /> -->
     <MobileNavbar />
      <MobileNavbarWrapper :active-tab-prop="'home'"/>
    
    <!-- Main Content Area -->
    <main class="flex-1">
      <!-- Your page content goes here -->
      <Listing />
      
      <!-- <slot /> -->
    </main>
   
    <!-- Footer Component -->
    <!-- <Footer /> -->
  </div>
</template>


<script setup>
  // import { ref } from "vue"
  // import { useRouter } from "vue-router"
  // import Footer from "../components/navigation/Footer.vue"
  // import Navbar from "../components/navigation/Navbar.vue"
  import Listing from "../components/products/Listing.vue"
  import MobileNavbar from "../components/navigation/MobileNavbar.vue"
  // import MobileBottomBar from "../components/navigation/MobileBottomBar.vue"
  // import Account from "./user/Account.vue"
  // import Profile from "./user/Profile.vue"
  import MobileNavbarWrapper from "../components/navigation/MobileNavbarWrapper.vue";

// const activeTab = ref('home')
// const currentPage = ref('home')
// const cartCount = ref(0)
// const isAuthenticated = ref(false)
// const isSeller = ref(false)

// const router = useRouter()



</script>