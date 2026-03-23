// --- src/stores/index.ts ---
import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // Aquí puedes añadir plugins de Pinia si los necesitas en el futuro

  return pinia;
});