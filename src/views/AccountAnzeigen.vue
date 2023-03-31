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
          <ion-label>Optionales Modul hinzufügen:</ion-label>
          <ion-select v-model="selectedAssignmentsString" multiple placeholder="Wähle Assignment">
  <ion-select-option v-for="(assignment, idx) in assignments" :key="idx" :value="assignment.id">{{ assignment.name }}</ion-select-option>
</ion-select>
        </ion-item>
        <ion-button @click="updateUserAssignments();">Speichern</ion-button>

        <div class="ion-padding">
      <h2>Optionale Module</h2>
      <ion-list>
        <ion-item v-for="(userAssignment, index) in userAssignments" :key="index">
          <ion-label>{{ userAssignment.name }}</ion-label>
          <ion-button slot="end" fill="clear" @click="removeAssignment(userAssignment.id)">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
    </div>


      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonSelect, IonSelectOption, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
import jwt_decode from "jwt-decode";
import { closeOutline } from 'ionicons/icons';


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
  components: { IonHeader, IonSelect, IonSelectOption, IonButton, IonIcon, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonList },
  data(): { currentUser: UserInformation; closeOutline: any; assignments: any[]; selectedAssignmentsString: string | number | boolean | undefined; userAssignments: any[] } {
  return {
    currentUser: {} as UserInformation,
    closeOutline,
    assignments: [],
    selectedAssignmentsString: undefined, // Set the default value to undefined
    userAssignments: [],
  };
},





  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      if (localStorage.getItem('token')) {
        this.decodeToken();
        await this.fetchAssignments();
        await this.fetchUserAssignments();
      }
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
    async fetchAssignments() {
      const token = localStorage.getItem('token') || '';
  const response = await fetch('https://universityhub.azurewebsites.net/modules?modulesType=Optional', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  const data = await response.json();
  this.assignments = data;
},

    async fetchUserAssignments() {
      const token = localStorage.getItem('token') || '';
      const response = await fetch(`https://universityhub.azurewebsites.net/users/${this.currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      this.userAssignments = data.assignments;
    },

    async updateUserAssignments() {
  const token = localStorage.getItem('token') || '';
  console.log("Ich bin im Update " + this.selectedAssignmentsString)
  const payload: { add: string[]; remove: string[] } = {
    "add": Array.isArray(this.selectedAssignmentsString) ? this.selectedAssignmentsString : [],
    "remove": [],
  };
  payload.add = Array.prototype.filter.call(payload.add, (moduleId: string) => !this.userAssignments.map(assignment => assignment.id).includes(moduleId));
  payload.remove = this.userAssignments.filter(assignment => !payload.add.includes(assignment.id)).map(assignment => assignment.id);
  
  
  
  console.log(payload)
  console.log(payload.add)
  await fetch(`https://universityhub.azurewebsites.net/users/${this.currentUser.id}/assignments`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  await this.fetchUserAssignments();
},

    async removeAssignment(assignmentId) {
      const token = localStorage.getItem('token') || '';
      const payload = {
        add: [],
        remove: [assignmentId],
      };
      await fetch(`https://universityhub.azurewebsites.net/users/${this.currentUser.id}/assignments`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      await this.fetchUserAssignments();
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
@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .UserDataSize {
    max-width: 40%;
    margin: 0 auto;
  }
}
</style>
