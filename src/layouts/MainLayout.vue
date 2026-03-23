<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> F1 Teams Manager </q-toolbar-title>

        <div v-if="authStore.user" class="row items-center q-gutter-sm">
          <span class="text-subtitle2 q-mr-sm">
            Hola, {{ authStore.user.name || authStore.user.login }}
          </span>
          <q-btn flat dense round icon="logout" @click="handleLogout" title="Cerrar Sesión" />
        </div>
        <div v-else>
          <q-btn flat label="Iniciar Sesión" to="/login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menú Principal </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="authStore.user" clickable v-ripple to="/teams" exact>
          <q-item-section avatar>
            <q-icon name="sports_motorsports" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mis Equipos</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function handleLogout() {
  try {
    await authStore.logout();
    $q.notify({
      type: 'info',
      message: 'Sesión cerrada correctamente',
      position: 'top'
    });

    await router.push('/login'); // <-- Añadimos 'await' aquí

  } catch (error) { // <-- Si prefieres, en JS moderno puedes poner solo 'catch {' sin la variable
    console.error(error); // <-- Usamos la variable para que el linter no se queje
    $q.notify({
      type: 'negative',
      message: 'Error al cerrar sesión',
      position: 'top'
    });
  }
}
</script>