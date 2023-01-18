

<template>
    <ion-button id="open-modal6" expand="block" size="fixed">Equipment anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal6">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Equipment</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">

        <ion-item>
          <ion-label position="stacked">Bitte mögliches Equipment eingeben:</ion-label>
          <ion-input ref="equipmentName" type="text" placeholder="Beamer, Tafel, Fenster, usw." clear-input="true"  clear-on-edit="true"></ion-input>
        </ion-item>

        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Equipment: {{ item.equipmentName }}</ion-item>
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
  equipmentName: string;
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
      const equipmentNameElement = (this.$refs.equipmentName as typeof IonInput).$el;
  
      let equipments: Module = {
        equipmentName: equipmentNameElement.value,
      };

      if(equipmentNameElement.value){
      this.items.push(equipments); // Eintrag hinzufügen
      
      
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