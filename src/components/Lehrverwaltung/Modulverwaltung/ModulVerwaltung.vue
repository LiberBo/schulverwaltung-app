<template>

  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Raumverwaltung</ion-title>
        <ion-buttons slot="end">
        <ModuleAnlegen></ModuleAnlegen>
      </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true"> 
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Modulverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

        <IonItem class="AddSemester"><ModuleAnlegen></ModuleAnlegen></IonItem>

        Hier werden die Module angezeigt



      

   </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonList, IonItem } from '@ionic/vue';
import ModuleAnlegen from './ModuleAnlegen.vue';

export default defineComponent({
  name: 'RaumVerwaltung',
  // eslint-disable-next-line vue/no-unused-components
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, IonList, IonItem, ModuleAnlegen }
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

.addSemester{
  margin-top: 4%;
  margin-right: 4%;
}




</style>
