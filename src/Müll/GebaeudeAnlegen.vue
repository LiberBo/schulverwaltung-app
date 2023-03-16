

<template>
    <ion-button id="open-modal4" expand="block" size="fixed">Gebäude anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal4">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Gebäude</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        
        <ion-item>
          <ion-label position="stacked">Bitte Name des Gebäudes eingeben:</ion-label>
          <ion-input ref="buildingName" type="text" placeholder="Hochsicherheitsgefängnis Biologie"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Bitte Etagen des Gebäudes eingeben:</ion-label>
          <ion-input ref="buildingFloors" type="number" placeholder="3"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Straße + Hausnummer:</ion-label>
          <ion-input ref="buildingStreet" type="text" placeholder="Meisenstr. 92"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Postleitzahl:</ion-label>
          <ion-input ref="buildingPLZ" type="number" placeholder="56789"></ion-input>
        </ion-item>
        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Gebäudename: {{ item.buildingName }}, Etage: {{ item.buildingFloors }}, Gebäudestr.: {{ item.buildingStreet }}, Postleitzahl: {{ item.buildingPLZ }}</ion-item>
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
  buildingName: string;
  buildingFloors: number;
  buildingStreet: string;
  buildingPLZ: string;
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
      const buildingStreetElement = (this.$refs.buildingStreet as typeof IonInput).$el;
      const buildingPLZElement = (this.$refs.buildingPLZ as typeof IonInput).$el;
      // Construct the module object

      let building: Module = {
        buildingName: buildingNameElement.value,
        buildingFloors: buildingFloorsElement.value,
        buildingStreet: buildingStreetElement.value,
        buildingPLZ: buildingPLZElement.value,
      };

      if(buildingNameElement.value && buildingFloorsElement.value && buildingStreetElement.value && buildingPLZElement.value){
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