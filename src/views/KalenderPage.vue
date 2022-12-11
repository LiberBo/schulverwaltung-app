<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Kalender</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <h1 color="primary" id="Kontostandsanzeige">Hallo, hier ist der Kalender </h1>
        
        
        
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

  
  export default  defineComponent({
    name: 'KalenderPage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
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