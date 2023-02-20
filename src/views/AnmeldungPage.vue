<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Anmeldung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1 color="primary" id="Kontostandsanzeige">Hallo, hier ist die Anmeldung </h1>
      <ion-list>
        <ion-item>
          <ion-label position="floating">Vorname</ion-label>
          <ion-input type="text" v-model="firstName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nachname</ion-label>
          <ion-input type="text" v-model="lastName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Rolle</ion-label>
          <ion-select v-model="role" interface="popover">
            <ion-select-option value="Student">Student</ion-select-option>
            <ion-select-option value="Teacher">Dozent</ion-select-option>
            <ion-select-option value="Secretary">Sekretariat</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button id="submitButton" @click="submitForm()">Anmelden</ion-button>
      <ion-button id="listUsersButton" @click="listUsers()">Benutzer auflisten</ion-button>
      <ion-grid>
        <ion-row>
          <ion-col>
            Vorname
          </ion-col>
          <ion-col>
            Nachname
          </ion-col>
          <ion-col>
            Rolle
          </ion-col>
        </ion-row>
        <ion-row v-for="(user, index) in users" :key="index">
          <ion-col>
            {{ user.firstName }}
          </ion-col>
          <ion-col>
            {{ user.lastName }}
          </ion-col>
          <ion-col>
            {{ user.authorization }}
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonSelect,
  IonSelectOption,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
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
    IonSelect,
    IonSelectOption,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
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
    submitForm() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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