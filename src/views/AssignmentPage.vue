<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title class="text-center">Assignments</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-list>
          <ion-item v-for="(assignment, index) in currentUser.assignments" :key="index">
            <ion-label>
              <h2>{{ assignment.name }}</h2>
              <p>{{ assignment.creditPoints }} CP - {{ assignment.moduleType }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {
    IonPage,
    IonBackButton,
    IonHeader,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  } from '@ionic/vue';
  import jwt_decode from "jwt-decode";
  

  
  interface Assignment {
  name: string;
  creditPoints: number;
  moduleType: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  authorization: string;
  assignments: Assignment[];
}

  
  export default defineComponent({
    name: 'AnmeldungPage',
    components: {
      IonPage,
      IonBackButton,
      IonHeader,
      IonButtons,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonLabel
    },
    data() {
      return {
        currentUser: {} as User,
      };
    },
  
    mounted() {
      this.decodeToken();
    },
  
    methods: {
        async decodeToken() {
      const token = localStorage.getItem('token') || '';
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.sub;
      try {
        const response = await fetch(`https://universityhub.azurewebsites.net/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data: User = await response.json();
          console.log(data);
          this.currentUser = data;
          console.log(this.currentUser.assignments);
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<style>
</style>