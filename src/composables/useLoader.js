import { ref } from 'vue'

const isLoading = ref(false)
const loadingMessage = ref('Loading...')
const loadingRoutes = ref(new Set()) // Track which routes should show loader

export function useGlobalLoader() {
  const showLoader = (message = 'Loading...') => {
    loadingMessage.value = message
    isLoading.value = true
  }

  const hideLoader = () => {
    isLoading.value = false
  }

  // Configure which routes should show loader
  const setLoadingRoutes = (routes) => {
    loadingRoutes.value = new Set(routes)
  }

  // Check if current route should show loader
  const shouldShowLoaderForRoute = (routeName) => {
    return loadingRoutes.value.has(routeName)
  }

  return {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader,
    setLoadingRoutes,
    shouldShowLoaderForRoute,
    loadingRoutes
  }
}