<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="text-center">Prüfungsleistung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Prüfungsleistung</ion-title>
        </ion-toolbar>
      </ion-header>


      <v-table class="TablePosition">
      <thead>
        <tr class="TableHeader text-left HeaderHight">1. Klasse</tr>
        <tr class="TableHeader">
          <th class="text-center">
            Fach
          </th>
          <th class="text-center">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in SchoolGrade"
          :key="item.Subject"
        >
          <td>{{ item.Subject }}</td>
          <td>{{ item.Grade }}</td>
        </tr>
      </tbody>
    </v-table>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


export default defineComponent({
  name: 'ExamPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  
  data() {
    return {
    
      SchoolGrade: [
        {
          Subject: 'Mathematik',
          Grade: 2,
        },
        {
          Subject: 'Deutsch',
          Grade: 2,
        },
      ],
    }
  },
});


</script>

<style>
  .tableBackground-1 {
    background-color: lightblue;
  }

  .TablePosition {
    Margin-left: 10%;
    margin-right: 10%;
    margin-top: 1%;
  }

  .text-left {
    text-align: left;

  }
  
</style>