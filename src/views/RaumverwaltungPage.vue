<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Raumverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <h1 color="primary" id="Kontostandsanzeige">Hallo, hier ist die Raumverwaltung </h1>
  
  
        
        
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonBackButton, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  export default  defineComponent({
    name: 'RaumverwaltungPage',
    components: { IonHeader, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonPage }
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
  
  
  
  
  </style>