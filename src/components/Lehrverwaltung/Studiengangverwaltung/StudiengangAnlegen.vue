

<template>
    <ion-button id="open-modal3" expand="block" size="fixed">Studiengang anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal3">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Studiengang</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> 
        <ion-item>
        <ion-label position="stacked">Studiengangname:</ion-label>
        <ion-input v-model="course.name" type="text" placeholder="IFWS420"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Beschreibung:</ion-label>
        <ion-input v-model="course.description" type="text" placeholder=""></ion-input>
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
  IonLabel,/*
  IonSelect,
  IonSelectOption,
  IonList,*/
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
  },

  data() {
    return {
      items: [],
      course: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
      window.location.reload()
    },

    addTo(): void {
      if (this.course.name && this.course.description) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: this.course.name,
            description: this.course.description,
          }),
        };
        fetch('https://universityhub.azurewebsites.net/Courses', requestOptions)
          .then((response) => response.json())
          .catch((error) => console.error(error));
      } else {
        alert("Bitte fülle alle Felder aus!");
      }
    },

  },
});
</script>

<style>
.text-center {
  text-align: center;
}
.elment-seperation2{
  padding-bottom: 2%;
}
</style>