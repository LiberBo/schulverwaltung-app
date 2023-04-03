<template>
  <ion-button id="open-modal" expand="block" size="fixed">Modul anlegen</ion-button>
  <ion-modal ref="modal" trigger="open-modal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="text-center">Module</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Modulname</ion-label>
        <ion-input v-model="moduleName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Beschreibung</ion-label>
        <ion-input v-model="moduleDescription"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Credit Points</ion-label>
        <ion-input type="number" v-model="creditPoints"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Modultyp</ion-label>
        <ion-select v-model="moduleType">
          <ion-select-option value="Compulsory">Pflichtmodul</ion-select-option>
          <ion-select-option value="Optional">Wahlmodul</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Maximale Größe</ion-label>
        <ion-input type="number" v-model="maxSize"></ion-input>
      </ion-item>

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
      moduleName: '',
      moduleDescription: '',
      creditPoints: 0,
      moduleType: 'Optional',
      maxSize: 0,
      modules: [],
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
      window.location.reload()
    },

    resetFields(): void {
      this.moduleName = '';
      this.moduleDescription = '';
      this.creditPoints = 0;
      this.moduleType = 'Optional';
      this.maxSize = 0;
    },

    async addTo() {
      if (!this.moduleName || !this.moduleDescription || !this.creditPoints || !this.moduleType || !this.maxSize) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
      }
      const requestOptions = {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: this.moduleName,
              description: this.moduleDescription,
              creditPoints: this.creditPoints,
              moduleType: this.moduleType,
              maxSize: this.maxSize,
            }),
      };
      fetch('https://universityhub.azurewebsites.net/modules', requestOptions)
        .then((response) => {
          if (response.ok) {
            prompt("Modul wurde erfolgreich hinzugefügt")
            this.resetFields();
            return response.json();
          } else {
            throw new Error('Fehler beim Hinzufügen des Moduls');
          }
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
</style>