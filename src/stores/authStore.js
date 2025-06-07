import { defineStore } from "pinia";
import apiClient from "../api/axios";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userType: "",
    isInitialized: false,
  }),
  persist: {
    storage: sessionStorage,
    paths: ["isAuthenticated", "userType", "isInitialized"],
  },
  actions: {
    async fetchUserType() {
      try {
         const response = await apiClient.get("/users/user-type");
         if (response.status == 200) {
          this.userType = response.data.data.type;
          this.isAuthenticated = true;
        }
        
      } catch (error) {
      } finally {
        this.isInitialized = true
      }
    },

    async logout() {
      try {
        await apiClient.post("auth/logout");
      } catch (error) {
        //
      } finally {
        this.isAuthenticated = false;
        this.userType = "";
      }
    },
  },
});
