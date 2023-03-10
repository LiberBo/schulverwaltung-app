<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="text-center">Anmeldung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1 color="primary" id="Kontostandsanzeige">Herzlich Wilkommen, bitte melden Sie sich an</h1>
      <ion-list>
        <ion-item>
          <ion-label position="floating">Vorname</ion-label>
          <ion-input type="text" v-model="firstName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nachname</ion-label>
          <ion-input type="text" v-model="lastName"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button id="submitButton" @click="submitForm()">Anmelden</ion-button>
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
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/vue';

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
    IonLabel,
    IonInput,
    IonButton,
  },
  data() {
    return {
      firstName: '' as string,
    lastName: '' as string,
    role: '' as string,
    users: [] as Array<any>,
    };
  },
  methods: {
    /*
    submitForm() {
      console.log(this.firstName, this.lastName, this.role);
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",    "Access-Control-Allow-Methods": "GET, POST",    "Access-Control-Allow-Headers": "Authorization, Expires, Pragma, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",    "Access-Control-Expose-Headers": "*" },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          authorization: this.role,
        }),
      };
      fetch('https://universityhub.azurewebsites.net/users', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }, */

    submitForm() {
  const fullName = this.firstName + ' ' + this.lastName;
  fetch(`https://universityhub.azurewebsites.net/users?fullName=${fullName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const user = data[0];
        console.log(`User role for ${fullName}: ${user.role}`);
      } else {
        console.log(`User ${fullName} not found`);
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
},


    listUsers() {
      fetch('https://universityhub.azurewebsites.net/users')
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => console.error(error));
    },
  },
});

</script>

<style>
ion-content {
  text-align: center;
}

#submitButton {
  padding-top: 5%;
}

</style>