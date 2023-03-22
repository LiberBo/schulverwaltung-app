<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Raumverwaltung</ion-title>
        <ion-buttons slot="end">
          <RaumAnlegen></RaumAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Raumverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="(location, index) in locations" :key="index">
          <ion-label>
            <h2>{{ location.name }}</h2>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(location)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedLocation?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Startdatum:</ion-label>
            <ion-text>{{ selectedLocation?.coordinates.latitude }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Enddatum:</ion-label>
            <ion-text>{{ selectedLocation?.coordinates.longitude }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>size:</ion-label>
            <ion-text>{{ selectedLocation?.size }}</ion-text>
          </ion-item>
          <ion-button @click="closeModal()">Schließen</ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal } from '@ionic/vue';
import RaumAnlegen from './Raumverwaltung/RaumAnlegen.vue';

interface Location {
  name: string;
  coordinates: {
    latitude: 0,
    longitude: 0
  },

  size: 0;
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, RaumAnlegen },
  data() {
    return {
      locations: [] as Location[],
      showModal: false,
      selectedLocation: {} as Location,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/Locations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Location[] = await response.json();
        this.locations.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async openModal(location: Location) {
      this.selectedLocation = location;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
