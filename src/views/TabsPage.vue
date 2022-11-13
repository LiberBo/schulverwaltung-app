<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Wallet" href="/tabs/Wallet">
          <ion-icon :icon="triangle" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="Raumverwaltung" href="/tabs/Raumverwaltung">
          <ion-icon :icon="ellipse" />
          <ion-label>Raumverwaltung</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="Stundenplan" href="/tabs/Stundenplan">
          <ion-icon :icon="square" />
          <ion-label>Stundenplan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
});
</script>
