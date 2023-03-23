<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
            <RaumAnlegen></RaumAnlegen>
            <AccountManagement></AccountManagement>
          </ion-buttons>
        <ion-title class="text-center">Raumverwaltung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
  <h1 color="primary" id="Kontostandsanzeige">Willkommen in der Raumverwaltung</h1>
<ion-list class="ion-justify-content-between">

  <ion-item>
    <ion-label>
      <p v-for="location in locations" :key="location" style="margin-left: 4%" @click="openModal(location)">{{location.name}}</p>
    </ion-label>
  </ion-item>

  <!--Modal welches sich beim klicken auf einen Raum öffnen soll-->
    
      <ion-modal ref="modal" :isOpen="showModal" @ionModalDidDismiss="modalClosed">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              {{ currentLocation.name }}
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Schließen</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <p>Details zum Raum: {{ currentLocation.name }}</p>
          <p>Anzahl der Sitzplätze: {{ currentLocation.size }}</p>
          <div id="map-container" style="height: 300px; width: 100%;"></div>
</ion-content>
      </ion-modal>

<!---
      <IonModal :isOpen="d"> <ion-header>
          <ion-toolbar>
            <ion-title>
              {{ currentLocation.name }}
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Schließen</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header></IonModal>
    --->
  </ion-list>
</ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonBackButton, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonModal, IonButton } from '@ionic/vue';
import RaumAnlegen from '@/components/Raumverwaltung/RaumAnlegen.vue';
import AccountManagement from '@/views/AccountAnzeigen.vue';
import L, { LatLngExpression, Map as LeafletMap, Marker, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: number;
  name: string;
  coordinates: LatLngExpression;
  size: number;
}

export default defineComponent({
  name: 'RaumverwaltungPage',
  components: { IonHeader, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonModal, IonButton, RaumAnlegen, AccountManagement },
  data() {
    return {
      showModal: false,
      currentLocation: {} as Location,
      locations: [] as Array<any>,
      map: null as LeafletMap | null,
    };
  },

  methods: {
    openModal(location: Location) {
      this.currentLocation = location;
      this.showModal = true;
      this.$nextTick(() => {
        this.initializeMap();
      });
    },
    closeModal() {
      this.showModal = false;
    },
    modalClosed() {
      this.currentLocation = {} as Location;
    },
    listlocations() {
        fetch('https://universityhub.azurewebsites.net/locations')
        .then((response) => response.json())
        .then((data) => {
          this.locations = data;
          console.log(this.locations);
        })
        .catch((error) => console.error(error));
    },
    initializeMap() {
      if (this.map) {
        this.map.remove();
      }

      const coordinates: LatLngExpression = this.currentLocation.coordinates;

      this.map = L.map('map-container', {
        zoomControl: false
      }) as LeafletMap;

      this.map.setView(coordinates, 13);

      const tileLayer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      tileLayer.addTo(this.map);

      const marker = new Marker(coordinates);
      marker.addTo(this.map);
    },
  },
  mounted() {
    this.listlocations();
  }
});
</script>





  <style>
  @import '~leaflet/dist/leaflet.css';
  
  ion-content {
    text-align: center; 
  }

  #ButtonList{
    padding-top: 1%;
    list-style-type: none;
  }

  #Button1{
    padding-top: 5%
  }

  #Button2{
    padding-top: 20%
  }
  
  .floors{
    margin-left: 3%;
    font-size: 20px;
  }

  .locations{
    margin-left: 9%;
  }
  
  
  </style>