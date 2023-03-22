<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Mein Konto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mein Konto</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>E-Mail: {{ currentUser.email }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>Berechtigung: {{ currentUser.authorization }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
import jwt_decode from "jwt-decode";

interface UserInformation {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  authorization: string;
  assignments: [];
}

export default defineComponent({
  name: 'AccountAnzeigen',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonList },
  data() {
    return {
      currentUser: {} as UserInformation,
    };
  },
  async mounted() {
    this.decodeToken();
  },
  methods: {
    async decodeToken() {
      const token = localStorage.getItem('token') || '';
      const decodedToken: any = jwt_decode(token);
      const currentUser: UserInformation = {
        id: decodedToken.sub,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        email: decodedToken.email,
        authorization: decodedToken.authorization,
        assignments: decodedToken.assignments,
      };
      this.currentUser = currentUser;
    },
  },
});
</script>
<style>
.buttonSeperation {
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
  justify-content: center;
}

.titileSeperation {
  margin-bottom: 3%;
  margin-top: 5%;
}

.addSemester {
  margin-top: 4%;
  margin-right: 4%;
}
</style>
