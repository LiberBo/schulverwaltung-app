

<template>
    <ion-button id="modalRaumVerwalten" expand="block" size="fixed">Räume verwalten</ion-button>
    <ion-modal ref="modal" trigger="modalRaumVerwalten">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Equipment</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">

        

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
} from '@ionic/vue';
import { defineComponent } from 'vue';


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