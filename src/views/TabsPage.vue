<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <!--
        <ion-tab-button tab="Wallet" href="/tabs/Wallet">
          <ion-icon :icon="triangle" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
      -->
        <ion-tab-button tab="Kalender" href="/tabs/Kalender">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Kalender</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="Raumverwaltung" href="/tabs/Raumverwaltung">
          <ion-icon :icon="businessOutline" />
          <ion-label>Raumverwaltung</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="Verwaltung" href="/tabs/Verwaltung">
          <ion-icon :icon="pencilOutline" />
          <ion-label>Verwaltung</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Anmeldung" href="/tabs/Anmeldung">
          <ion-icon :icon="personOutline" />
          <ion-label>Anmeldung</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { pencilOutline, calendarOutline, businessOutline, personOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      calendarOutline,
      businessOutline,
      pencilOutline,
      personOutline
    }
  }
});
</script>
