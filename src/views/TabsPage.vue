<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <!--
        <ion-tab-button tab="Wallet" href="/tabs/Wallet">
          <ion-icon :icon="triangle" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
      -->
        <ion-tab-button tab="Kalender" href="/tabs/Kalender">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Kalender</ion-label>
        </ion-tab-button>
        <!---
        <ion-tab-button tab="Raumverwaltung" href="/tabs/Raumverwaltung">
      <ion-icon :icon="businessOutline" />
      <ion-label>Raumverwaltung</ion-label>
    </ion-tab-button> -->

        <ion-tab-button v-if="currentUser.authorization === 'Administrator' || currentUser.authorization === 'Professor'" tab="Verwaltung" href="/tabs/Verwaltung/overview">
          <ion-icon :icon="pencilOutline" />
          <ion-label>Verwaltung</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Anmeldung" href="/tabs/Anmeldung">
          <ion-icon :icon="personOutline" />
          <ion-label>Anmeldung</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Accountverwaltung" href="/tabs/Accountverwaltung">
          <ion-icon :icon="personOutline" />
          <ion-label>Accountverwaltung</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';  
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { pencilOutline, calendarOutline, businessOutline, personOutline } from 'ionicons/icons';
import jwt_decode from "jwt-decode";

interface UserAuthorization {
  authorization: string;
}

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  
  data(){
    return {
      calendarOutline,
      businessOutline,
      pencilOutline,
      personOutline,
      currentUser: {} as UserAuthorization,
    }
  },
  async mounted() {
    this.decodeToken();
  },
  methods: {
    async decodeToken() {
      const token = localStorage.getItem('token') || '';
      const decodedToken: any = jwt_decode(token);
      const currentUser: UserAuthorization = {
        authorization: decodedToken.authorization,
      };
      this.currentUser = currentUser;
    },
  },

});
</script>
