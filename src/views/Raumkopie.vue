<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
            <RaumAnlegen></RaumAnlegen>
          </ion-buttons>
        <ion-title>Raumverwaltung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
  <h1 color="primary" id="Kontostandsanzeige">Willkommen in der Raumverwaltung</h1>
<ion-list class="ion-justify-content-between">
  <ion-item v-for="building in buildings" :key="building.id">
    <ion-label>
     <h1>{{building.name}}</h1>
     <div v-for="floor in building.floors" :key="floor.id" class="floors">{{floor.name}}
      <p v-for="room in floor.rooms" :key="room.id" style="margin-left: 4%" @click="openModal(room)">{{room.name}}</p>
      </div>
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

interface Room {
  id: number;
  name: string;
  equipment: string[];
}

export default  defineComponent({
  name: 'RaumverwaltungPage',
  components: { IonHeader, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonModal, IonButton, RaumAnlegen },
  data() {
    return {
      buildings: [
        {
          id: 1,
          name: 'Gebäude 1',
          floors: [
            {
              id: 1,
              name: 'Etage 1',
              rooms: [
                { id: 1, name: 'Raum 101', equipment: ['Beamer', 'Tafel'] },
                { id: 2, name: 'Raum 102', equipment: ['Beamer', 'Tafel'] },
              ]
            },
            {
              id: 2,
              name: 'Etage 2',
              rooms: [
                { id: 3, name: 'Raum 201', equipment: ['Beamer', 'Tafel'] },
                { id: 4, name: 'Raum 202', equipment: ['Beamer', 'Tafel'] },
              ]
            },
          ]
        },
        {
          id: 2,
          name: 'Gebäude 2',
          floors: [
            {
              id: 3,
              name: 'Etage 1',
              rooms: [
                { id: 5, name: 'Raum 301', equipment: ['Beamer', 'Tafel'] },
                { id: 6, name: 'Raum 302', equipment: ['Beamer', 'Tafel'] },
              ]
            },
            {
              id: 4,
              name: 'Etage 2',
              rooms: [
                { id: 7, name: 'Raum 401', equipment: ['Beamer', 'Tafel'] },
                { id: 8, name: 'Raum 402', equipment: ['Beamer', 'Tafel'] },
              ]
            },
          ]
        },
      ],
      showModal: false,
      currentRoom: {} as Room,
      d: false,
    };
  },
  methods: {
    openModal(room: Room) {
      this.currentRoom = room;
      this.showModal = true;
      console.log("Werde ich getriggert?")
    },
    closeModal() {
      this.showModal = false;
    },
    modalClosed() {
      this.currentRoom = {} as Room;
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