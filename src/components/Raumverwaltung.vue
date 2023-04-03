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

      <div id="map"></div>

      <ion-modal :is-open="showModal">
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ selectedLocation?.name }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal()">
          <ion-icon name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item>
      <ion-label>Name:</ion-label>
      <ion-text>{{ selectedLocation?.name }}</ion-text>
    </ion-item>
    <ion-item>
      <ion-label>Breitengrad:</ion-label>
      <ion-text>{{ selectedLocation?.coordinates.latitude }}</ion-text>
    </ion-item>
    <ion-item>
      <ion-label>Längengrad:</ion-label>
      <ion-text>{{ selectedLocation?.coordinates.longitude }}</ion-text>
    </ion-item>
    <ion-item>
      <ion-label>Maximale Kapazität:</ion-label>
      <ion-text>{{ selectedLocation?.size }}</ion-text>
    </ion-item>
    <ion-item>
      <IonButton :href="`https://maps.google.com/?q=${selectedLocation?.coordinates.latitude},${selectedLocation?.coordinates.longitude}`" target="_blank">
        Auf der Karte anzeigen lassen
      </IonButton>
    </ion-item>
    <ion-item class="deleteLocation">
      <ion-button fill="clear" color="danger" @click="deleteLocation()">
        Raum löschen
      </ion-button>
    </ion-item>
  </ion-content>
</ion-modal>

          

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonButtons, IonHeader, IonText, IonIcon, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal } from '@ionic/vue';
import RaumAnlegen from './Raumverwaltung/RaumAnlegen.vue';
import { close } from 'ionicons/icons';

declare var google: any;


interface Location {
  id: string;
  name: string;
  coordinates: {
    latitude: 0,
    longitude: 0
  },

  size: 0;
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonButtons, IonToolbar, IonIcon, IonTitle, IonContent, IonText, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, RaumAnlegen },
  data() {
    return {
      locations: [] as Location[],
      showModal: false,
      selectedLocation: {} as Location,
      close,
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
        this.openGoogleMaps();
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

    openGoogleMaps() {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: this.locations[0]?.coordinates,
      });

      this.locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location.coordinates,
          map: map,
          title: location.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div><h3>${location.name}</h3></div>`,
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    },



    
    async openModal(location: Location) {
      this.selectedLocation = location;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteLocation() {
      const token = localStorage.getItem('token') || '';
      const locationId = this.selectedLocation.id;
      const url = `https://universityhub.azurewebsites.net/locations/${locationId}`;

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.locations = this.locations.filter((location) => location.id !== locationId);
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

.deleteLocation {
  text-align: center;
  margin-top: 2em;
  display: flex;
  justify-content: center;
}

#map{
  width: 600px;
  margin-left: 20%;
  height: 400px;
}


</style>
