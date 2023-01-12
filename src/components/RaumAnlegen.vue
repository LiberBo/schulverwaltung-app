

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

        <ion-list>
            <ion-item class="elment-seperation2">
              <ion-select
                placeholder="Wähle das zugehörige Gebäude aus:"
                :compareWith="compareWith"
                @ionChange="currentBuildingName = JSON.stringify($event.detail.value)"
                ref="buildingNames"
              >
                <ion-select-option v-for="buildingName in buildingNames" v-bind:key="buildingName" :value="buildingName">{{ buildingName.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentBuildingNames }}</ion-label>
            </ion-item>
          </ion-list> 
        
        <ion-list>
            <ion-item class="elment-seperation2">
              <ion-select
                placeholder="Wähle die zugehörige Etage aus:"
                :compareWith="compareWith"
                @ionChange="currentBuildingFloors = JSON.stringify($event.detail.value)"
                ref="buildingFloors"
              >
                <ion-select-option v-for=" buildingFloor in buildingFloors" v-bind:key="buildingFloor" :value="buildingFloor">{{ buildingFloor.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentBuildingFloors }}</ion-label>
            </ion-item>
          </ion-list> 



        <ion-item class="elment-seperation2">
          <ion-label position="stacked">Bitte Anzahl der Plätze angeben:</ion-label>
          <ion-input ref="roomSeats" type="number" placeholder="69"></ion-input>
        </ion-item>

        <ion-list>
            <ion-item class="elment-seperation2">
              <ion-select
                placeholder="Wähle das zugehörige Equipment aus:"
                :compareWith="compareWith"
                @ionChange="currentRoomEquipments = JSON.stringify($event.detail.value)"
                :multiple="true"
                ref="roomEquipments"
              >
                <ion-select-option v-for=" roomEquipment in roomEquipments" v-bind:key="roomEquipment" :value="roomEquipment">{{ roomEquipment.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentRoomEquiptment }}</ion-label>
            </ion-item>
          </ion-list> 

        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Gebäudename: {{ item.buildingName }}, Etage: {{ item.buildingFloors }}, Gebäudestr.: {{ item.roomSeats }}, Postleitzahl: {{ item.roomEquipment.map(element => { 
          return element.name;
            }) }}</ion-item>
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
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface Module {
  buildingNames: [];
  buildingFloors: [];
  roomSeats: number;
  roomEquipment: [];
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
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable


      buildingNames: [
          {
            id: 1,
            name: "A",
            type: "Physik"
          },
          {
            id: 2,
            name: "B",
            type: "Mathematik"
          },
          {
            id: 3,
            name: "C",
            type: "Geologie"
          }
        ],
        buildingFloors: [
          {
            id: 1,
            name: "1",
            type: "Physik"
          },
          {
            id: 2,
            name: "2",
            type: "Mathematik"
          },
          {
            id: 3,
            name: "3",
            type: "Geologie"
          }
        ],
        roomEquipment: [
          {
            id: 1,
            name: "Beamer",
            type: "Physik"
          },
          {
            id: 2,
            name: "Tafel",
            type: "Mathematik"
          },
          {
            id: 3,
            name: "Fenster",
            type: "Geologie"
          }
        ],
        
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
    addTo(): void {
      // Abfrage welches der beiden (Pflich oder optinale Module) = true ist und dann abspeichern
      const buildingNameElement = (this.$refs.buildingName as typeof IonInput).$el;
      const buildingFloorsElement = (this.$refs.buildingFloors as typeof IonInput).$el;
      const roomSeatsElement = (this.$refs.roomSeats as typeof IonInput).$el;
      const roomEquipmentElement = (this.$refs.roomEquipment as typeof IonInput).$el;
      // Construct the module object

      let building: Module = {
        buildingName: buildingNameElement.value,
        buildingFloors: buildingFloorsElement.value,
        roomSeats: roomSeatsElement.value,
        roomEquipment: roomEquipmentElement.value,
      };

      if(buildingNameElement.value && buildingFloorsElement.value && roomSeatsElement.value && roomEquipmentElement.value){
      this.items.push(building); // Eintrag hinzufügen
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
</style>