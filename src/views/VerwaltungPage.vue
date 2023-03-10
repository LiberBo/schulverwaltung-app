<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Verwaltung</ion-title>
        <ion-buttons slot="end">
            <AccountManagement></AccountManagement>
          </ion-buttons>
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
        <IonRow class="buttonSeperation">
          <ion-button tab="Verwaltung" href="/tabs/Verwaltung/Raumverwaltung">
          <ion-label>Raumverwaltung</ion-label>
        </ion-button>
        </IonRow>
      </IonCol>

      <IonTitle style="text-align: center;">Ausstattungs-Verwaltung</IonTitle>
      <IonCol>
        <IonRow class="buttonSeperation">
          <EquipmentAnlegen></EquipmentAnlegen>
        </IonRow>
      </IonCol> 


      <IonTitle style="text-align: center;">Account-Verwaltung</IonTitle>
      <IonCol>
        <IonRow class="buttonSeperation">
          <AccountAnlegen></AccountAnlegen>
        </IonRow>
      </IonCol> 


      

   </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonList } from '@ionic/vue';
import ModuleAnlegen from '../components/ModuleAnlegen.vue';
import SemesterAnlegen from '../components/SemesterAnlegen.vue';
import StudiengangAnlegen from '../components/StudiengangAnlegen.vue';
import GebaeudeAnlegen from '../components/GebaeudeAnlegen.vue';
import RaumAnlegen from '../components/Raumverwaltung/RaumAnlegen.vue';
import EquipmentAnlegen from '@/components/EquipmentAnlegen.vue';
import AccountAnlegen from '@/components/UserAnlegen.vue';
import AccountManagement from '@/components/AccountManagement.vue';
import Raumverwaltung from '@/components/Raumverwaltung.vue';

export default defineComponent({
  name: 'VerwaltungPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { AccountAnlegen, StudiengangAnlegen, SemesterAnlegen, ModuleAnlegen, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, GebaeudeAnlegen, RaumAnlegen, EquipmentAnlegen, IonList, AccountManagement, Raumverwaltung }
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
