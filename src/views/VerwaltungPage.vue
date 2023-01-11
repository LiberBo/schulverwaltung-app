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


      <h1>Diese Seite ist nur fürs Sekretariat</h1>

      <ModuleAnlegen></ModuleAnlegen>
      <h1>Semester anlegen:</h1>

      <SemesterAnlegen></SemesterAnlegen>

      <h1>Studiengang anlegen</h1>
      <StudiengangAnlegen></StudiengangAnlegen>


      

   </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ModuleAnlegen from '../components/ModuleAnlegen.vue';
import SemesterAnlegen from '../components/SemesterAnlegen.vue';
import StudiengangAnlegen from '../components/StudiengangAnlegen.vue';

export default defineComponent({
  name: 'VerwaltungPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { StudiengangAnlegen, SemesterAnlegen, ModuleAnlegen, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>
