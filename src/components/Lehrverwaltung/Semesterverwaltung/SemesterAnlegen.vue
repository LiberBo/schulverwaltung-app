<template>
  <ion-button id="open-modal2" expand="block" size="fixed">Semester anlegen</ion-button>
  <ion-modal ref="modal2" trigger="open-modal2">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="text-center">Semester</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item class="elment-seperation">
        <ion-label position="stacked">Semestername:</ion-label>
        <ion-input ref="name" type="text" placeholder="Wintersemester 2022/2023"></ion-input>
      </ion-item>
      <ion-item class="ion-justify-content-between">
        <ion-datetime presentation="date" size="fixed" displayFormat="DD.MM.YYYY" ref="startDate" style="width: 47.5%; margin-right: 5%;">
          <span slot="title">Startdatum Semester</span>
        </ion-datetime>
        <ion-datetime presentation="date" size="fixed" displayFormat="DD.MM.YYYY" ref="endDate" style="width: 47.5%">
          <span slot="title">Enddatum Semester</span>
        </ion-datetime>
      </ion-item>
<!--
      <ion-item>
        <ion-label>Module:</ion-label>
        <ion-select multiple="true" ref="selectedModules" @ionChange="toggleModule($event)">
        <ion-select-option v-for="module in modules" v-bind:key="module.id" :value="module">{{ module.name }}</ion-select-option>
        </ion-select>
      </ion-item>
    -->
      <ion-item v-for="item in items" :key="item.name" class="elment-seperation2"> Semestername: {{ item.name }}, Anfangsdatum: {{ moment(item.startDate).format('DD.MM.YYYY') }}, Enddatum: {{ moment(item.endDate).format('DD.MM.YYYY') }}</ion-item>
      <h1 class="sizeCorrection">Platzhalter</h1>
      <!--, Module: {{ item.modules.map(element => { 
        return element.name;
      }) }} -->
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
  IonLabel,
  IonDatetime,
 // IonSelect,
 // IonSelectOption
} from '@ionic/vue';
import { defineComponent } from 'vue';
import * as moment from 'moment';

interface Module {
  id: number;
  name: string;
}

interface Semester {
  name: string;
  startDate: string;
  endDate: string;
  modules: Module[];
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
    IonItem,
    IonInput,
    IonLabel,
    IonDatetime,
   // IonSelect,
   // IonSelectOption
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable
      currentModule: "",
      modules: [],
      selectedModules: [],
      semester: {
        name: "",
        startDate: "",
        endDate: "",
        modules: []
      },
    };
  },
  
  methods: {
    cancel(): void {
      (this.$refs.modal2 as typeof IonModal).$el.dismiss(null, 'cancel');
      window.location.reload()
    },

    moment(): any {
      return moment;
    },
/*
    toggleModule(event): void {
      this.selectedModules = event.detail.value || [];
    },
 */   
    async addTo(): Promise<void> {
      const nameElement = (this.$refs.name as typeof IonInput).$el;
      const startDateElement = (this.$refs.startDate as typeof IonInput).$el;
      const endDateElement = (this.$refs.endDate as typeof IonInput).$el;
      // Construct the semester object
      const semester: Semester = {
        name: nameElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value,
      //  modules: this.selectedModules,
      };

      if (semester.name && semester.startDate && semester.endDate ) {
        // && semester.modules.length > 0
        try {
          const response = await fetch('https://universityhub.azurewebsites.net/Semesters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(semester),
          });

          if (response.ok) {
            alert('Semester erfolgreich hinzugefügt!');
            this.items.push(semester);
            
           // this.selectedModules = [];
            nameElement.value = "";
            startDateElement.value = "";
            endDateElement.value = "";
          } else {
            alert('Fehler beim Hinzufügen des Semesters. Bitte versuchen Sie es später erneut.');
            console.error(`HTTP error: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
         } else {
          alert("Bitte fülle alle Felder aus!");
        }
    },
    

  },

  async mounted() {
      const token = localStorage.getItem('token') || '';

  try {
    const response = await fetch('https://universityhub.azurewebsites.net/modules', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: Module[] = await response.json();
      this.modules.push(...data);
    } else {
      console.error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
},
}
);
</script>

<style>
.text-center {
  text-align: center;
}

.elment-seperation{
  padding-bottom: 5%;
}

ion-content {
  overflow: scroll;
}

.elment-seperation2{
  padding-bottom: 2%;
}

.sizeCorrection{
  color: white;
}
</style>