<template>
  <ion-button @click="showMap()" expand="block" size="large">Räume anzeigen</ion-button>
  <ion-modal ref="modal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="text-center">Räume</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div id="map"></div>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import * as L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'leaflet';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
  },
  methods: {
    async showMap(): Promise<void> {
      const response = await fetch('https://universityhub.azurewebsites.net/locations');
      const locations = await response.json();
      const map = new Map('map').setView([49.484, 8.476], 15); // Koordinaten der Uni als Startpunkt
      const tileLayer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      locations.forEach((location: { name: string, latitude: number, longitude: number }) => {
        const marker = new Marker([location.latitude, location.longitude]).addTo(map);
        const popup = new Popup().setContent(`<strong>${location.name}</strong>`);
        marker.bindPopup(popup);
      });

      (this.$refs.modal as typeof IonModal).present();
    },
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
  },
});
</script>

<style>
.text-center {
  text-align: center;
}
</style>



