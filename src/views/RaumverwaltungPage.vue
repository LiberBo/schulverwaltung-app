
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




  <!--Modal welches sich beim klicken auf einen Raum öffnen soll-->
    <!--
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
    -->
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
import { IonPage, IonBackButton, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonList} from '@ionic/vue';
import RaumAnlegen from '@/components/Raumverwaltung/RaumAnlegen.vue';
import AccountManagement from '@/views/AccountAnzeigen.vue';


interface Location {
  id: number;
  name: string;
  size: number;
}

export default defineComponent({
  name: 'RaumverwaltungPage',
  components: { IonHeader, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonPage, IonList, RaumAnlegen, AccountManagement },
  data() {
    return {
      showModal: false,
      currentLocation: {} as Location,
    };
  },

  methods: {
    openModal(location: Location) {
      this.currentLocation = location;
      this.showModal = true;
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

        .catch((error) => console.error(error));
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