

<template>
    <ion-button id="open-modal5" expand="block" size="fixed">Raum anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal5">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Raum</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        
        <ion-item class="elment-seperation2">
          <ion-label position="stacked">Bitte Name des Raumes eingeben:</ion-label>
          <ion-input ref="roomName" type="text" placeholder="A38B"></ion-input>
        </ion-item>
        <ion-item class="elment-seperation2">
          <ion-label position="stacked">Bitte Anzahl der Plätze angeben:</ion-label>
          <ion-input ref="roomSeats" type="number" placeholder="69"></ion-input>
        </ion-item>
          <ion-button @click="myFunction()">Standort bestimmen</ion-button>
          <ion-label>    Meine Aktuelle Position: {{ roomLatitude }}; {{ roomLongitude }}</ion-label>
          <!--Standortanfrage abgelehnt / nicht möglich-->
          <ion-label>{{ error }}</ion-label>

        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Gebäudename: {{ item.buildingNames }}, Etage: {{ item.buildingFloors }}, Gebäudestr.: {{ item.roomSeats }}, Postleitzahl: {{ item.roomEquipment.map(element => { 
          return element.name;
            }) }}</ion-item>

            <div class="bottomSeperation"></div>
      </ion-content>
    </ion-modal>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonLabel,
 // IonList,
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface Module {
  roomName: "";
  roomSeats: number;
  coordinates: {
    latitude: 0,
    longitude: 0
  },
}

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,
  //  IonList,
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable
      error: '',
      roomLatitude: '',
      roomLongitude: '',
        
    };
  },
  methods: {

    myFunction: function () {		
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }else{
        this.error = "Geolocation is not supported."; 
      }
    },

    showPosition:function (position) {	
		this.roomLatitude = position.coords.latitude;
		this.roomLongitude = position.coords.longitude;
	},



    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
      window.location.reload()
    },
    addTo(): void {
      const roomNameElement = (this.$refs.roomName as typeof IonInput).$el;
      const roomSeatsElement = (this.$refs.roomSeats as typeof IonInput).$el;
      // Construct the module object

      let room: Module = {
        roomName: roomNameElement.value,
        roomSeats: roomSeatsElement.value,
      };

      if(roomNameElement.value && roomSeatsElement.value){
      this.items.push(room); // Eintrag hinzufügen
      const token = localStorage.getItem('token') || '';
      const requestOptions = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` ,'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",    "Access-Control-Allow-Methods": "GET, POST",    "Access-Control-Allow-Headers": "Authorization, Expires, Pragma, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",    "Access-Control-Expose-Headers": "*" },
        body: JSON.stringify({
          name: this.roomName,
          coordinates: {
              latitude: this.latitude, 
              longitude: this.longitude
            },
          seats: this.roomSeats,
        }),
      };
      fetch('https://universityhub.azurewebsites.net/locations', requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));
      }
      else{
        alert("Bitte fülle alle Felder aus!")
      }
    },
  },
});
</script>

<style>
.text-center {
  text-align: center;
}

.elment-seperation2{
  padding-bottom: 2%;
}

.bottomSeperation{
  padding-top: 10%;
}
</style>