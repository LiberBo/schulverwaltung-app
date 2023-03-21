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
  
          Hier werden die Räume angezeigt
  
  
  
        
  
     </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonList } from '@ionic/vue';
  import RaumVerwalten from './Raumverwaltung/RaumVerwalten.vue';
  import RaumAnlegen from './Raumverwaltung/RaumAnlegen.vue';
  
  export default defineComponent({
    name: 'RaumVerwaltung',
    // eslint-disable-next-line vue/no-unused-components
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, IonList, RaumVerwalten, RaumAnlegen }
  });

  </script>
  
  
  <style>
  .buttonSeperation{
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 1%;
    justify-content: center;
  }
  
  .titileSeperation{
    margin-bottom: 3%;
    margin-top: 5%;
  }
  
  
  
  
  </style>
  