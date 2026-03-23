// --- src/stores/auth.ts ---
import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  login: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const response = await api.post('/api/auth/login', { email, password });
      this.user = response.data;
    },

    async register(name: string, email: string, password: string) {
      const response = await api.post('/api/auth/register', { name, email, password });
      this.user = response.data;
    },

    async logout() {
      await api.delete('/api/_auth/session'); 
      this.user = null;
    }
  },
});