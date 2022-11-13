<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Wallet</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">


      <h1 color="primary" id="Kontostandsanzeige">Dein Kontostand: Kontostand</h1>

      <ion-button id="Button1" tab="Wallet" href="/Geldeinzahlung">Geld einzahlen</ion-button>

      <ion-list>
        <ion-item> 
          <ion-label>Hier kommt eine For schleife mit den Zu und Abgängen des Kontos hin</ion-label>
        </ion-item>
      </ion-list>

    
  
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  defineComponent({
  name: 'WalletPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});

</script>

<style>

#Kontostandsanzeige {
  text-align: center; 
  padding-bottom: 5%;
}

ion-content {
  text-align: center; 
}




</style>