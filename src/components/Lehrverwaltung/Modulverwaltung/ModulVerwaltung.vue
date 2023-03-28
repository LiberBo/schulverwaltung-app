<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Modulverwaltung</ion-title>
        <ion-buttons slot="end">
          <ModuleAnlegen></ModuleAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Modulverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-item class="AddSemester">
        <ModuleAnlegen></ModuleAnlegen>
      </ion-item>

      <ion-list>
        <ion-item v-for="(module, index) in modules" :key="index">
          <ion-label>
            <h2>{{ module.name }}</h2>
            <p>{{ module.description }}</p>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(module)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedModule?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Beschreibung:</ion-label>
            <ion-text>{{ selectedModule?.description }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Modultyp:</ion-label>
            <ion-text>{{ selectedModule?.moduleType }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Maximale Teilnehmerzahl:</ion-label>
            <ion-text>{{ selectedModule?.maxSize }}</ion-text>
          </ion-item>
          <ion-button @click="closeModal()">Schließen</ion-button>
          <ion-item>
            <ion-label>Modul löschen:</ion-label>
            <ion-button slot="end" fill="clear" color="danger" @click="deleteModule()">
              Löschen
            </ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal } from '@ionic/vue';
import ModuleAnlegen from './ModuleAnlegen.vue';

interface Module {
  id: number;
  name: string;
  description: string;
  moduleType: string;
  maxSize: number;
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, ModuleAnlegen, IonModal },
  data() {
    return {
      modules: [] as Module[],
      showModal: false,
      selectedModule: {} as Module,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/modules', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {

        const data: Module[] = await response.json();
        this.modules.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async openModal(module: Module) {
      this.selectedModule = module;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    async deleteModule() {
      const token = localStorage.getItem('token') || '';
      const moduleId = this.selectedModule.id;
      const url = `https://universityhub.azurewebsites.net/modules/${moduleId}`;

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.modules = this.modules.filter((module) => module.id !== moduleId);
          this.closeModal();
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

</script>

<style>
.buttonSeperation {
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
  justify-content: center;
}

.titileSeperation {
  margin-bottom: 3%;
  margin-top: 5%;
}

.addSemester {
  margin-top: 4%;
  margin-right: 4%;
}

</style>
