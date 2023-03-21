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
          <ion-label position="floating">E-Mail Adresse</ion-label>
          <ion-input type="text" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Passwort</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
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
      email: '' as string,
      password: '' as string,
    };
  },
  methods: {

    submitForm() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      };

      fetch('https://universityhub.azurewebsites.net/token', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Anmeldung fehlgeschlagen');
        }
        return response.json();
      })
      .then(data => {
        // Token abspeichern
        localStorage.setItem('token', data.token);
        console.log('Anmeldung erfolgreich');

        
        // Weiterleiten zur Modulverwaltung
        this.$router.push('/tabs/Verwaltung');
      })
      .catch(error => {
        console.error(error);
      });
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