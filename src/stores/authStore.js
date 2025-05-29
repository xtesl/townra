import { defineStore } from "pinia";
import apiClient from "../api/axios";


export const useAuthStore = defineStore('auth',  {
    state: () => ({
        isAuthenticated: false,
        user: {},
        homeLoaded: false,
    }),
    actions: {
        async checkUserState() {

             try {
                const response = await apiClient.post(`/auth/verify-token`);
                if (response.status == 200){
                    this.isAuthenticated = true;
                    this.user = response.data;
                }
                
             } catch (error) {
                this.isAuthenticated = false;
             }   
           
        },

        async logout() {
            try {
                 await apiClient.post("auth/logout");
            } catch (error) {
                //
            }finally{
                this.isAuthenticated = false;
                this.user = null;
            }
           
           
        }
    }
});