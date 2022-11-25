<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prüfungsleistung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Prüfungsleistung</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Prüfungsleistung page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  name: 'PrüfungsleistungPage',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>
