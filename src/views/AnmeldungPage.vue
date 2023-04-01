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
      <img class="fullLogo" src="../Pictures/University_Hub-3.png">
      <ion-list class="RegistrationSize">
        <ion-item>
          <ion-label position="floating">E-Mail Adresse</ion-label>
          <ion-input type="text" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Passwort</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button id="submitButton" fill="clear" @click="submitForm()" :disabled="loading">
        <ion-spinner v-if="loading" name="dots" slot="start"></ion-spinner>
        <span v-else>Anmelden</span>
      </ion-button>
      <p>Derzeitige Anmeldedaten <br> Mail: test <br> Passwort: test </p>
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
  IonSpinner,
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
    IonSpinner,
  },
  data() {
    return {
      email: '' as string,
      password: '' as string,
      loading: false,
    };
  },
  methods: {
    submitForm() {
      this.loading = true;

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

        // Zurücksetzen des Formulars
        this.email = '';
        this.password = '';
        this.loading = false;

        // Weiterleiten zur Modulverwaltung
        this.$router.push('/tabs/Assignments');
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
        this.loading = false;
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
  padding-top: 2%;
}

.fullLogo{
  height: 30%;
  padding-top: 5%;
  color: #c2a7dd;
}

#submitButton {
  color: #7ea4c6;
  font-size: large;
}

#submitButton:disabled {
  background-color: #ccc;
  color: #666;
  box-shadow: none;
}

@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .RegistrationSize {
    max-width: 20%;
    margin: 0 auto;
  }
}

</style>
