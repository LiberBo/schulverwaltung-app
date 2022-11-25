<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Wallet" href="/tabs/Wallet">
          <ion-icon :icon="triangle" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="Verwaltung" href="/tabs/Verwaltung">
          <ion-icon :icon="ellipse" />
          <ion-label>Verwaltung</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="Prüfungsleistung" href="/tabs/Prüfungsleistung">
          <ion-icon :icon="square" />
          <ion-label>Prüfungsleistung</ion-label>
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
