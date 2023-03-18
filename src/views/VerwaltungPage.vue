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
    <ion-content :fullscreen="true" class="middle"> 
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Verwaltung</ion-title>
        </ion-toolbar>
      </ion-header>
      <IonContent class="middle">

        <a class="contentBlock contentFill1" href="/tabs/Verwaltung/Lehrverwaltung">
          <ion-icon :icon="libraryOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Lehrverwaltung</IonText>
        </a>

        <a class="contentBlock contentFill2" href="/tabs/Verwaltung/Userverwaltung">
          <ion-icon :icon="personOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Userverwaltung</IonText>
        </a>

        <a class="contentBlock contentFill3" tab="Raumverwaltung" href="/tabs/Verwaltung/Raumverwaltung">
          <ion-icon :icon="businessOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Raumverwaltung</IonText>
        </a>


      </IonContent>


<!--
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
          <ion-button tab="Raumverwaltung" href="/tabs/Verwaltung/Raumverwaltung">
          <ion-label>Raumverwaltung</ion-label>
        </ion-button>
        </IonRow>
      </IonCol>




      <IonTitle style="text-align: center;">Account-Verwaltung</IonTitle>
      <IonCol>
        <IonRow class="buttonSeperation">
          <AccountAnlegen></AccountAnlegen>
        </IonRow>
      </IonCol> 

    -->
      

   </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonList, IonIcon, IonText } from '@ionic/vue';
import { businessOutline, libraryOutline, personOutline } from 'ionicons/icons';
import ModuleAnlegen from '../components/Lehrverwaltung/Modulverwaltung/ModuleAnlegen.vue';
import SemesterAnlegen from '../components/Lehrverwaltung/SemesterVerwaltung/SemesterVerwaltung.vue';
import StudiengangAnlegen from '../components/Lehrverwaltung/Kursverwaltung/StudiengangAnlegen.vue';
import RaumAnlegen from '../components/Raumverwaltung/RaumAnlegen.vue';
import AccountAnlegen from '@/components/Userverwaltung/UserAnlegen.vue';
import AccountManagement from '@/components/UserInformation.vue';
import Raumverwaltung from '@/components/Raumverwaltung.vue';

export default defineComponent({
  name: 'VerwaltungPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { AccountAnlegen, StudiengangAnlegen, SemesterAnlegen, ModuleAnlegen, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, RaumAnlegen, IonList, AccountManagement, Raumverwaltung, IonIcon, IonText },
  
  setup (){
    return {
    libraryOutline,
    personOutline,
    businessOutline
  }
  }
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

  .contentBlock {
  height: 150px;
  width: 200px;
  text-align: center;
  margin-top: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-decoration: none
}

  .middle{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .icon-above-text {
    position: absolute;
    padding-bottom: 12%;
    padding-top: 10%;
    height: 75px;
    width: 75px;
    color: black;
    pointer-events: none;
  }

  .text-under-icon{
    padding-top: 40%;
    text-decoration: none;
    color: black;
  }

  .contentFill1{
    background-color: #68d8d6;
  }

  .contentFill2{
    background-color: #9ceaef;
  }

  .contentFill3{
    background-color: #c4fff9;
  }




</style>
