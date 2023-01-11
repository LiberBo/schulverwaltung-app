<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Verwaltung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Verwaltung</ion-title>
        </ion-toolbar>
      </ion-header>


      <ion-card href="/Kalender">
    <ion-card-header>
      <ion-card-title>Kalender</ion-card-title>
      <ion-card-subtitle>Hier siehst du deine aktuellen Stunden</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
  <ion-card href="/Raumverwaltung">
    <ion-card-header>
      <ion-card-title>Raumverwaltung</ion-card-title>
      <ion-card-subtitle>Hier bekommst du eine Übersicht über alle Räume</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
      

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'KalenderundRaumverwaltung',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>
