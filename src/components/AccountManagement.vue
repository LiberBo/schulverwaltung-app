<template>
  <ion-button id="open-modal9" expand="block" size="large">Mein Konto</ion-button>
  <ion-modal ref="modal" trigger="open-modal9">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="text-center">Accountübersicht</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </ion-content>
  </ion-modal>
</template>
<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface User {
  name: string;
  email: string;
  phone: string;
}

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
  },

  data() {
    return {
      user: null as User | null,
    };
  },

  async created() {
    const response = await fetch('https://universityhub.azurewebsites.net/users/');
    const data = await response.json();
    this.user = data;
  },

  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
  },
});
</script>