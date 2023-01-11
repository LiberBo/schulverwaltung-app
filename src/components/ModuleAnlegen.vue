

<template>
    <ion-button id="open-modal" expand="block">Module anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Module</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-segment value="Modulart">
          <ion-segment-button value="Pflichmodul">
            <ion-label>Pflichtmodul</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Optoinales Modul">
            <ion-label>Optionales Modul</ion-label>
           </ion-segment-button>
        </ion-segment>
        <ion-item>
          <ion-label position="stacked">Bitte alle Module eingeben:</ion-label>
          <ion-input ref="input" type="text" placeholder="Informatik"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Credit Points:</ion-label>
          <ion-input ref="creditPoints" type="number" placeholder="3"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Professor:</ion-label>
          <ion-input ref="professor" type="text" placeholder="Dr. Smith"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Raum:</ion-label>
          <ion-input ref="room" type="text" placeholder="C111"></ion-input>
        </ion-item>
        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Modulnamen: {{ item.name }}, Credit Points: {{ item.creditPoints }}, Professor: {{ item.professor }}, Raum: {{ item.room }}</ion-item>
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
  IonSegmentButton
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface Module {
  name: string;
  creditPoints: number;
  professor: string;
  room: string;
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
    IonSegmentButton,
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
      const inputElement = (this.$refs.input as typeof IonInput).$el;
      const creditPointsElement = (this.$refs.creditPoints as typeof IonInput).$el;
      const professorElement = (this.$refs.professor as typeof IonInput).$el;
      const roomElement = (this.$refs.room as typeof IonInput).$el;
      // Construct the module object

      let module: Module = {
        name: inputElement.value,
        creditPoints: creditPointsElement.value,
        professor: professorElement.value,
        room: roomElement.value,
      };

      console.log(inputElement.value);

      if(inputElement.value && creditPointsElement.value && professorElement.value && roomElement.value){
      this.items.push(module); // Eintrag hinzufügen
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