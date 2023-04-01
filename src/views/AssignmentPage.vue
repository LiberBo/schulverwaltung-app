<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="text-center">Assignments</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="(assignment, index) in currentUser.assignments" :key="index">
          <ion-label>
            <h2>{{ assignment.name }}</h2>
            <p>{{ assignment.creditPoints }} CP - {{ assignment.moduleType }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <IonItem class="ReduceSize">
      <ion-item>
        <ion-label>Optionales Modul hinzufügen:</ion-label>
        <ion-select v-model="selectedAssignmentsString" multiple placeholder="Wähle Assignment">
          <ion-select-option v-for="(assignment, idx) in assignments" :key="idx" :value="assignment.id">{{ assignment.name }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button @click="updateUserAssignments();">Speichern</ion-button>
    </IonItem>
  </ion-page>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/vue';
import jwt_decode from "jwt-decode";

interface Assignment {
  id: string;
  name: string;
  creditPoints: number;
  moduleType: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  authorization: string;
  assignments: Assignment[];
}

export default defineComponent({
  name: 'AnmeldungPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton
  },
  data() {
    return {
      currentUser: {} as User,
      assignments: [] as Assignment[],
      selectedAssignmentsString: undefined,
    };
  },

  mounted() {
    this.decodeToken();
    this.fetchAssignments();
  },
  
  methods: {
  async decodeToken() {
    const token = localStorage.getItem('token') || '';
    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.sub;
    try {
      const response = await fetch(`https://universityhub.azurewebsites.net/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: User = await response.json();
        console.log(data);
        this.currentUser = data;
        console.log(this.currentUser.assignments);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async fetchAssignments() {
    const token = localStorage.getItem('token') || '';
    const response = await fetch('https://universityhub.azurewebsites.net/modules?moduleType=Optional', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    this.assignments = data;
  },

  async updateUserAssignments() {
    const token = localStorage.getItem('token') || '';
    console.log("Ich bin im Update " + this.selectedAssignmentsString)
    const payload: { add: string[]; remove: string[] } = {
      "add": Array.isArray(this.selectedAssignmentsString) ? this.selectedAssignmentsString : [],
      "remove": [],
    };
    payload.add = Array.prototype.filter.call(payload.add, (moduleId: string) => !this.currentUser.assignments.map(assignment => assignment.id).includes(moduleId));

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
    await this.decodeToken();
    this.selectedAssignmentsString = undefined;
  },
},
});
</script>

<style>

@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .ReduceSize {
    max-width: 50%;
    margin: 0 auto;
  }
}
</style>