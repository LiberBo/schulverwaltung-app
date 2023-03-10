<template>
  <ion-button id="open-modal7" expand="block" size="fixed">Account anlegen</ion-button>
  <ion-modal ref="modal" trigger="open-modal7">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="text-center">Accounts</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Vorname</ion-label>
        <ion-input v-model="firstName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Nachname</ion-label>
        <ion-input v-model="lastName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Rolle</ion-label>
        <ion-select v-model="role" interface="popover">
            <ion-select-option value="Student">Student</ion-select-option>
            <ion-select-option value="Professor">Dozent</ion-select-option>
            <ion-select-option value="Administrator">Sekretariat</ion-select-option>
        </ion-select>
      </ion-item>
      <div class="centeredButton">
      <ion-button id="listUsersButton" @click="listUsers()">Alle Benutzer auflisten</ion-button>
        </div>
      <ion-grid>
        <ion-row>
          <ion-col class="gridHead">
            Vorname
          </ion-col>
          <ion-col class="gridHead">
            Nachname
          </ion-col>
          <ion-col class="gridHead">
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
  </ion-modal>
</template>

<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption
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
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
    async addTo() {
      if (!this.firstName || !this.lastName || !this.role) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
      }
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
  .text-center {
    text-align: center;
  }

  .elment-seperation2 {
    padding-bottom: 2%;
  }
  .centeredButton{
    text-align: center;
    padding: 2%
  } 
  .gridHead{
    font-weight: bold;
  }
  
</style>