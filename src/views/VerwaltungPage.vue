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


      <IonTitle style="text-align: center;">Uni-Verwaltung</IonTitle>  
      <IonCol>
        <IonRow class="buttonSeperation">
          <ModuleAnlegen></ModuleAnlegen>
        </IonRow>
        <IonRow class="buttonSeperation">
          <SemesterAnlegen></SemesterAnlegen>
        </IonRow>
        <IonRow class="buttonSeperation">
         <StudiengangAnlegen></StudiengangAnlegen> 
        </IonRow>    
      </IonCol>


      <IonTitle style="text-align: center;">Gebäudeverwaltung</IonTitle>
      <IonCol>
        <IonRow class="buttonSeperation">
          <GebaeudeAnlegen></GebaeudeAnlegen>
        </IonRow>
        <IonRow class="buttonSeperation">
          <RaumAnlegen></RaumAnlegen>
        </IonRow>
      </IonCol>

      <IonTitle style="text-align: center;">Ausstattungs-Verwaltung</IonTitle>
      <IonCol>
        <IonRow class="buttonSeperation">
          <EquipmentAnlegen></EquipmentAnlegen>
        </IonRow>
      </IonCol> 


      <IonTitle style="text-align: center;">Account-Verwaltung</IonTitle>
      


      

   </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow } from '@ionic/vue';
import ModuleAnlegen from '../components/ModuleAnlegen.vue';
import SemesterAnlegen from '../components/SemesterAnlegen.vue';
import StudiengangAnlegen from '../components/StudiengangAnlegen.vue';
import GebaeudeAnlegen from '../components/GebaeudeAnlegen.vue';
import RaumAnlegen from '../components/RaumAnlegen.vue';
import EquipmentAnlegen from '@/components/EquipmentAnlegen.vue';

export default defineComponent({
  name: 'VerwaltungPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { StudiengangAnlegen, SemesterAnlegen, ModuleAnlegen, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, GebaeudeAnlegen, RaumAnlegen, EquipmentAnlegen }
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




</style>
