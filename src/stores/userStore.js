import { defineStore } from "pinia";
import apiClient from "../api/axios";


export const useAuthStore = defineStore('user',  {
    state: () => ({
        user: {},
        isInitialized: false,
    }),
    actions: {
    }
});