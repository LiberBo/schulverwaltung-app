<template>

    <ion-page>
      <ion-header>
        <ion-toolbar color="primary" class="text-center">
          <ion-title>Lehrverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true"> 
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Lehrverwaltung</ion-title>
          </ion-toolbar>
        </ion-header>
        
        <a class="contentBlock contentFill1" href="/tabs/Verwaltung/Lehrverwaltung/Semesterverwaltung">
          <ion-icon :icon="sunnyOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Semesterverwaltung</IonText>
        </a>

        <a class="contentBlock contentFill2" href="/tabs/Verwaltung/Lehrverwaltung/Modulverwaltung">
          <ion-icon :icon="easelOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Modulverwaltung</IonText>
        </a>

        <a class="contentBlock contentFill3" href="/tabs/Verwaltung/Lehrverwaltung/Studiengangverwaltung">
          <ion-icon :icon="peopleOutline" class="icon-above-text"/> <br>
          <IonText class="text-under-icon">Studiengangverwaltung</IonText>
        </a>
        
  
     </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonList } from '@ionic/vue';
  import { easelOutline, peopleOutline, sunnyOutline } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'RaumVerwaltung',
    // eslint-disable-next-line vue/no-unused-components
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, IonList },

    setup (){
    return {
    peopleOutline,
    sunnyOutline,
    easelOutline,
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
  