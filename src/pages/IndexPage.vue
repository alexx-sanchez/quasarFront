<template>
  <q-page class="flex flex-center bg-grey-1">
    <div class="text-center">
      <q-icon name="sports_motorsports" size="100px" color="primary" />
      
      <div class="text-h3 q-mt-md text-weight-bold">F1 Team Manager</div>
      <div class="text-subtitle1 q-mb-xl text-grey-7">
        Gestiona tus escuderías y mundiales desde un solo lugar.
      </div>

      <div class="row q-gutter-md justify-center">
        <q-btn 
          color="primary" 
          size="lg" 
          label="Ir a Mis Equipos" 
          icon="groups" 
          to="/teams" 
        />
        
        <q-btn 
          v-if="!authStore.user"
          outline 
          color="primary" 
          size="lg" 
          label="Iniciar Sesión" 
          to="/login" 
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();
</script>