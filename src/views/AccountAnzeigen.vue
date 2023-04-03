<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Mein Konto</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logoutUser">
            <ion-label>Logout</ion-label>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mein Konto</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="logoutUser">
              <ion-label>Logout</ion-label>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-list class="UserDataSize">
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
        <ion-item>
          <ion-button @click="showModal = true">Passwort ändern</ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Passwort ändern</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="showModal = false">Schließen</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Neues Passwort</ion-label>
            <ion-input v-model="newPassword" type="password" required></ion-input>
          </ion-item>
          <ion-button expand="full" @click="changePassword">Passwort ändern</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonModal, IonInput} from '@ionic/vue';
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
  components: { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonList, IonButton, IonModal, IonInput },
  data(): { currentUser: UserInformation; assignments: any[]; userAssignments: any[]; compulsoryAssignments: any[]; optionalAssignments: any[]; showModal: boolean; newPassword: string } {
  return {
    currentUser: {} as UserInformation,
    assignments: [],
    userAssignments: [],
    compulsoryAssignments: [],
    optionalAssignments: [],
    showModal: false,
    newPassword: '',
  };
},


  mounted() {
    this.loadData();
  },
  watch: {
    '$route': {
      async handler() {
        await this.loadData();
      },
      immediate: true,
    },
  },

  methods: {
    async loadData() {
      if (localStorage.getItem('token')) {
        this.decodeToken();
      }
    },

    async changePassword() {
  const token = localStorage.getItem('token') || '';
  const newPasswordData = {
    password: this.newPassword,
  };

  await fetch(`/users/${this.currentUser.id}/credentials`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPasswordData),
  })
    .then(async (response) => {
      if (response.status === 200) {
        this.showModal = false;
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Error updating password:', error);
    });
},

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

    async logoutUser() {
      localStorage.removeItem('token');
      this.$router.push('/Anmeldung');
    }
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
@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .UserDataSize {
    max-width: 40%;
    margin: 0 auto;
  }
}
</style>
