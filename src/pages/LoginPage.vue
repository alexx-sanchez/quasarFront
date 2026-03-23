<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my-card" style="width: 400px; max-width: 90vw;">
      
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Iniciar Sesión" />
        <q-tab name="register" label="Registrarse" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        
        <q-tab-panel name="login">
          <div class="text-h6 q-mb-md text-center">Bienvenido de nuevo</div>
          
          <q-form @submit="onSubmitLogin" class="q-gutter-md">
            <q-input
              filled
              v-model="loginForm.email"
              type="email"
              label="Correo electrónico *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu email']"
            />

            <q-input
              filled
              v-model="loginForm.password"
              type="password"
              label="Contraseña *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu contraseña']"
            />

            <div>
              <q-btn label="Entrar" type="submit" color="primary" class="full-width" :loading="loading" />
            </div>
          </q-form>

          <div class="q-mt-md">
            <q-btn 
              outline 
              icon="mdi-github" 
              label="Entrar con GitHub" 
              color="dark" 
              class="full-width" 
              href="http://localhost:3000/api/auth/github" 
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="register">
          <div class="text-h6 q-mb-md text-center">Crea tu cuenta</div>
          
          <q-form @submit="onSubmitRegister" class="q-gutter-md">
            <q-input
              filled
              v-model="registerForm.name"
              label="Nombre completo *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu nombre']"
            />

            <q-input
              filled
              v-model="registerForm.email"
              type="email"
              label="Correo electrónico *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa un email válido']"
            />

            <q-input
              filled
              v-model="registerForm.password"
              type="password"
              label="Contraseña *"
              lazy-rules
              :rules="[ val => val && val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres']"
            />

            <div>
              <q-btn label="Registrarme" type="submit" color="secondary" class="full-width" :loading="loading" />
            </div>
          </q-form>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { isAxiosError } from 'axios';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const tab = ref('login'); // Controla qué pestaña está activa
const loading = ref(false);

// Datos del formulario de Login
const loginForm = ref({
  email: '',
  password: ''
});

// Datos del formulario de Registro
const registerForm = ref({
  name: '',
  email: '',
  password: ''
});

// Función para enviar el Login
const onSubmitLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(loginForm.value.email, loginForm.value.password);
    
    $q.notify({ type: 'positive', message: '¡Sesión iniciada con éxito!', position: 'top' });
    await router.push('/'); // Redirige al inicio
    
  } catch (error: unknown) {
    let msg = 'Error al iniciar sesión';
    if (isAxiosError(error)) {
      msg = error.response?.data?.statusMessage || msg;
    }
    $q.notify({ type: 'negative', message: msg, position: 'top' });
  } finally {
    loading.value = false;
  }
};

// Función para enviar el Registro
const onSubmitRegister = async () => {
  loading.value = true;
  try {
    await authStore.register(
      registerForm.value.name, 
      registerForm.value.email, 
      registerForm.value.password
    );
    
    $q.notify({ type: 'positive', message: '¡Cuenta creada con éxito!', position: 'top' });
    await router.push('/'); // Redirige al inicio
    
  } catch (error: unknown) {
    let msg = 'Error al registrar la cuenta';
    if (isAxiosError(error)) {
      msg = error.response?.data?.statusMessage || msg;
    }
    $q.notify({ type: 'negative', message: msg, position: 'top' });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}
</style>