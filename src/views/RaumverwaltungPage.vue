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
              {{ currentRoom.name }}
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Schließen</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
          <ion-content>
            <p>Details zum Raum: {{ currentRoom.id }}</p>
            <p>Die Ausstattung des Raumes:</p> 
            <p v-for="equipment in currentRoom.equipment" :key="equipment">{{ equipment }}</p> 
          </ion-content>
      </ion-modal>

<!---
      <IonModal :isOpen="d"> <ion-header>
          <ion-toolbar>
            <ion-title>
              {{ currentRoom.name }}
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
import AccountManagement from '@/components/AccountManagement.vue';

interface Room {
  id: number;
  name: string;
  equipment: string[];
}




export default  defineComponent({
  name: 'RaumverwaltungPage',
  components: { IonHeader, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonModal, IonButton, RaumAnlegen, AccountManagement },
  data() {
    return {
      //buildings: [],
      showModal: false,
      currentRoom: {} as Room,
      d: false,
      locations: [] as Array<any>,
    };
  },

  methods: {
    openModal(room: Room) {
      this.currentRoom = room;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    modalClosed() {
      this.currentRoom = {} as Room;
    },
    listlocations() {
        fetch('https://universityhub.azurewebsites.net/locations')
        .then((response) => response.json())
        .then((data) => {
          this.locations = data;
          console.log(this.locations);
          console.log(this.locations)
        })
        .catch((error) => console.error(error));
    },
  }
});
</script>

  <style>
  
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

  .rooms{
    margin-left: 9%;
  }
  
  
  </style>