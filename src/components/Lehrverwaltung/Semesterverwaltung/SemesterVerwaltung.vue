<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-title>Semesterverwaltung</ion-title>
        <ion-buttons slot="end">
          <SemesterAnlegen></SemesterAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Semesterverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="(semester, index) in semesters" :key="index">
          <ion-label>
            <h2>{{ semester.name }}</h2>
            <p>{{ semester.startDate }}</p>
            <p>{{ semester.endDate }}</p>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(semester)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedSemester?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Startdatum:</ion-label>
            <ion-text>{{ selectedSemester?.startDate }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Enddatum:</ion-label>
            <ion-text>{{ selectedSemester?.endDate }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Maximale Teilnehmerzahl:</ion-label>
            <ion-text>{{ selectedSemester?.modules }}</ion-text>
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
import SemesterAnlegen from './SemesterAnlegen.vue';

interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  modules: [];
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, SemesterAnlegen },
  data() {
    return {
      semesters: [] as Semester[],
      showModal: false,
      selectedSemester: {} as Semester,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/semesters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {

        const data: Semester[] = await response.json();
        this.semesters.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async openModal(semester: Semester) {
      this.selectedSemester = semester;
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
