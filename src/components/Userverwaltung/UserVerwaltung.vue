<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary" class="text-center">
          <ion-title>Accountverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Modulverwaltung</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-list>
          <ion-item v-for="(user, index) in users" :key="index">
            <ion-label>
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              <p>{{ user.email }}</p>
              <p>{{ user.authorization }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel } from '@ionic/vue';
  
  interface UserInformation {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    authorization: string;
    assignments: [];
  }
  
  export default defineComponent({
    name: 'RaumVerwaltung',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel },
    data() {
      return {
        users: [] as UserInformation[],
      };
    },
    async mounted() {
      const token = localStorage.getItem('token') || '';
  
      try {
        const response = await fetch('https://universityhub.azurewebsites.net/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          const users: UserInformation[] = userData.map((userData: any) => ({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            authorization: userData.authorization,
            assignments: userData.assignments,
          }));
          this.users = users;
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  
  </script>
  
  <style>
  .buttonSeperation {
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 1%;
    justify-content: center;
  }
  
  .titileSeperation {
    margin-bottom: 3%;
    margin-top: 5%;
  }
  
  .addSemester {
    margin-top: 4%;
    margin-right: 4%;
  }
  
  </style>