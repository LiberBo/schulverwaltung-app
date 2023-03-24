<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Kursverwaltung</ion-title>
        <ion-buttons slot="end">
          <StudiengangAnlegen></StudiengangAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Kursverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="(course, index) in courses" :key="index">
          <ion-label>
            <h2>{{ course.name }}</h2>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(course)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedCourse?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Beschreibung:</ion-label>
            <ion-text>{{ selectedCourse?.description }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Module:</ion-label>
            <ion-text>{{ selectedCourse?.students }}</ion-text>
          </ion-item>
          <ion-button @click="closeModal()">Schließen</ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal } from '@ionic/vue';
import StudiengangAnlegen from './StudiengangAnlegen.vue';

interface Course {
  id: number;
  name: string;
  description: string;
  students: [];
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, StudiengangAnlegen },
  data() {
    return {
      courses: [] as Course[],
      showModal: false,
      selectedCourse: {} as Course,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/Courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Course[] = await response.json();
        this.courses.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async openModal(course: Course) {
      this.selectedCourse = course;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
