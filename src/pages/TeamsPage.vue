<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <h4 class="q-my-none text-primary text-weight-bold">Mis Escuderías</h4>
      <q-btn 
        color="primary" 
        icon="add" 
        label="Crear Equipo" 
        @click="openDialog(null)" 
      />
    </div>

    <q-table 
      :rows="teams" 
      :columns="columns" 
      row-key="id" 
      :loading="loading" 
      class="shadow-2 no-border-radius"
    >
      <template v-slot:body-cell-photo="props">
        <q-td :props="props">
          <q-avatar square size="50px" class="shadow-1 bg-grey-3">
            <img v-if="props.row.photo" :src="props.row.photo">
            <q-icon v-else name="image" color="grey" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn flat round color="blue" icon="edit" size="sm" @click="openDialog(props.row)" />
          <q-btn flat round color="negative" icon="delete" size="sm" @click="confirmDelete(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ isEditing ? 'Editar Equipo' : 'Nuevo Equipo de F1' }}</div>
        </q-card-section>

        <q-form @submit="saveTeam">
          <q-card-section class="q-gutter-y-md q-pt-md">
            <q-input 
              outlined 
              v-model="currentTeam.name" 
              label="Nombre del Equipo (ej: Red Bull Racing) *" 
              :rules="[val => !!val || 'El nombre es obligatorio']" 
            />
            <q-input 
              outlined 
              v-model="currentTeam.country" 
              label="Sede / País *" 
              :rules="[val => !!val || 'El país es obligatorio']" 
            />
            <q-input 
              outlined 
              type="number" 
              v-model.number="currentTeam.worldChampionships" 
              label="Títulos Mundiales *" 
            />
            <q-input 
              outlined 
              v-model="currentTeam.photo" 
              label="URL del Logo / Imagen *" 
              hint="Pega un enlace de una imagen de internet"
            />
          </q-card-section>

          <q-card-actions align="right" class="q-pb-md q-pr-md">
            <q-btn flat label="Cerrar" color="grey-7" v-close-popup />
            <q-btn 
              unelevated 
              :label="isEditing ? 'Actualizar' : 'Crear Equipo'" 
              color="primary" 
              type="submit" 
              :loading="saving" 
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar, type QTableColumn } from 'quasar';

interface Team {
  id: number | null;
  name: string;
  country: string;
  worldChampionships: number;
  photo: string;
}

const $q = useQuasar();
const teams = ref<Team[]>([]);
const loading = ref(false);
const saving = ref(false);
const showDialog = ref(false);
const isEditing = ref(false);

// Objeto totalmente limpio para cuando crees uno nuevo
const emptyTeam: Team = { 
  id: null, 
  name: '', 
  country: '', 
  worldChampionships: 0, 
  photo: '' 
};

const currentTeam = ref<Team>({ ...emptyTeam });

const columns: QTableColumn[] = [
  { name: 'photo', label: 'Logo', align: 'left', field: 'photo' },
  { name: 'name', label: 'Escudería', align: 'left', field: 'name', sortable: true },
  { name: 'country', label: 'País', align: 'left', field: 'country', sortable: true },
  { name: 'worldChampionships', label: 'Títulos', align: 'center', field: 'worldChampionships', sortable: true },
  { name: 'actions', label: 'Acciones', align: 'right', field: 'id' }
];

const fetchTeams = async () => {
  loading.value = true;
  try {
    const res = await api.get('/api/equips');
    teams.value = res.data;
  } catch {
    $q.notify({ color: 'negative', message: 'No se pudo conectar con el servidor', icon: 'report_problem' });
  } finally {
    loading.value = false;
  }
};

const openDialog = (team: Team | null = null) => {
  if (team) {
    currentTeam.value = { ...team };
    isEditing.value = true;
  } else {
    currentTeam.value = { ...emptyTeam }; // Reset total a blanco
    isEditing.value = false;
  }
  showDialog.value = true;
};

const saveTeam = async () => {
  saving.value = true;
  try {
    if (isEditing.value && currentTeam.value.id) {
      await api.put(`/api/equips/${currentTeam.value.id}`, currentTeam.value);
    } else {
      await api.post('/api/equips/create', currentTeam.value);
    }
    $q.notify({ type: 'positive', message: isEditing.value ? 'Actualizado' : '¡Equipo creado!' });
    showDialog.value = false;
    await fetchTeams();
  } catch {
    $q.notify({ color: 'negative', message: 'Error al procesar la solicitud' });
  } finally {
    saving.value = false;
  }
};

const confirmDelete = (id: number) => {
  $q.dialog({
    title: '¿Eliminar equipo?',
    message: 'Esta acción no se puede deshacer.',
    cancel: { color: 'grey-7', flat: true },
    ok: { color: 'negative', label: 'Eliminar' },
    persistent: true
  }).onOk(() => {
    void deleteTeam(id);
  });
};

const deleteTeam = async (id: number) => {
  try {
    await api.delete(`/api/equips/${id}`);
    $q.notify({ type: 'positive', icon: 'delete', message: 'Equipo borrado' });
    await fetchTeams();
  } catch {
    $q.notify({ color: 'negative', message: 'No se pudo eliminar' });
  }
};

onMounted(() => { void fetchTeams(); });
</script>