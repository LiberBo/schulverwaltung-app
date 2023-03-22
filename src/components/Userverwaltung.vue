
  
 <template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Userverwaltung</ion-title>
        <ion-buttons slot="end">
            <UserAnlegen></UserAnlegen>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Userverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="(user, index) in users" :key="index" @click="openUserModal(user)">
          <ion-label>
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <p>{{ user.email }}</p>
            <p>{{ user.authorization }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="isUserModalOpen" @didDismiss="closeUserModal">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeUserModal">Schließen</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Vorname</ion-label>
              <h2>{{ selectedUser?.firstName }}</h2>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Nachname</ion-label>
              <h2>{{ selectedUser?.lastName }}</h2>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">E-Mail</ion-label>
              <h2>{{ selectedUser?.email }}</h2>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Berechtigung</ion-label>
              <h2>{{ selectedUser?.authorization }}</h2>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
  
  <script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButtons, IonModal } from '@ionic/vue';
import UserAnlegen from './Userverwaltung/UserAnlegen.vue';

interface UserInformation {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  authorization: string;
  assignments: [];
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, UserAnlegen, IonButtons, IonModal },
  data() {
    return {
      users: [] as UserInformation[],
      showModal: false,
      selectedUser: {} as UserInformation,
      isUserModalOpen: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const users: UserInformation[] = userData.map((userData: any) => ({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          authorization: userData.authorization,
          assignments: userData.assignments,
        }));
        this.users = users;
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async openUserModal(user: UserInformation) {
      this.selectedUser = user;
      this.isUserModalOpen = true;
    },
    closeUserModal() {
      this.isUserModalOpen = false;
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