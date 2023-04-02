<template>
  <ion-button id="open-create-Account" expand="block" size="default">User anlegen</ion-button>
  <ion-modal ref="modal" trigger="open-create-Account">
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
        <ion-label position="floating">E-Mail Adresse</ion-label>
        <ion-input v-model="email"></ion-input>
      </ion-item>
      <ion-item>
      <ion-label position="floating">Passwort</ion-label>
      <ion-input v-model="password" type="password"></ion-input>
    </ion-item>
      <ion-item>
        <ion-label position="floating">Rolle</ion-label>
        <ion-select v-model="role" interface="popover">
            <ion-select-option value="Student">Student</ion-select-option>
            <ion-select-option value="Professor">Professor</ion-select-option>
            <ion-select-option value="Administrator">Administrator</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
console.log("Wird dies überhaupt aufgerufen?");
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
  IonSelect,
  IonSelectOption,
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
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      firstName: '' as string,
      lastName: '' as string,
      email: '' as string,
      password: '' as string,
      role: '' as string,
      users: [] as Array<any>,
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
      window.location.reload()
    },
    async addTo() {
        if (!this.firstName || !this.lastName || !this.role || !this.password) {
          alert('Bitte füllen Sie alle Felder aus.');
          return;
        }
        console.log(this.firstName, this.lastName, this.role, this.password);
        const token = localStorage.getItem('token') || '';
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
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