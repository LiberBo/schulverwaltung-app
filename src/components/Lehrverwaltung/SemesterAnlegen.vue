<!--Todos:
      //Timestamps müssen noch entfernt werden ToDo
      //semesterName wird nicht angezeigt
      // modules werden nicht angezeigt
      // padding zwischen den hinzugefügten

-->

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
          <ion-input ref="semesterName" type="text" placeholder="Wintersemester 2022/2023"></ion-input>
        </ion-item>
        <ion-item class="ion-justify-content-between">
          <ion-datetime presentation="date" size="fixed"  displayFormat="DD.MM.YYYY" ref="startDate"  style="width: 47,5%; margin-right: 5%;">
            <span slot="title">Startdatum Semester</span>
          </ion-datetime>
          <ion-datetime presentation="date" size="fixed" displayFormat="DD.MM.YYYY" ref="endDate" style="width: 47,5%">
            <span slot="title">Enddatum Semester</span>
          </ion-datetime>
        </ion-item>

          <ion-list>
            <ion-item>
              <ion-select
                placeholder="Suche ein oder mehrere Module aus:"
                :compareWith="compareWith"
                @click="listModules()"
                @ionChange="currentModule = JSON.stringify($event.detail.value)"
                :multiple="true"
                ref="modules"
              >
                <ion-select-option v-for="module in modules" v-bind:key="module" :value="module">{{ module.name }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list> 
    
        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Semestername: {{ item.semesterName}}, Anfangsdatum: {{ moment(item.startDate).format('DD.MM.YYYY') }}, Enddatum: {{ moment(item.endDate).format('DD.MM.YYYY') }}, Module: {{ item.modules.map(element => { 
          return element.name;
        }) }} </ion-item>
        <h1 class="sizeCorrection">Platzhalter</h1>
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
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import * as moment from 'moment';

interface Module {
  name: string;
  semesterName: string;
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
    IonSelect,
    IonSelectOption,
    IonList
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable
      currentModule: "",
      modules: [],
      semester: {
        moduleName: "",
        startDate: "",
        endDate: "",
        module: []
      },/*
        modules: [
          {
            id: 1,
            name: "Mathematik",
            type: "Komishces Fach"
          },
          {
            id: 2,
            name: "Informatik",
            type: "IT"
          },
          {
            id: 3,
            name: "BWL",
            type: "Wirtschaftswissenschaften"
          }
        ] */
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal2 as typeof IonModal).$el.dismiss(null, 'cancel');
    },

    moment: function(){
      return moment();
    },
    
    addTo(): void { 

      

      const semesterNameElement = (this.$refs.semesterName as typeof IonInput).$el;
      const startDateElement = (this.$refs.startDate as typeof IonInput).$el;
      const endDateElement = (this.$refs.endDate as typeof IonInput).$el;
      const modulesElement = (this.$refs.modules as typeof IonInput).$el;
      // Construct the module object


      let semester: Module = {
        semesterName: semesterNameElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value,
        modules: modulesElement.value,
      };

      console.log(semesterNameElement.value);
      console.log(startDateElement.value);
      console.log(endDateElement.value);
      console.log(modulesElement.value);

      if(semesterNameElement.value && startDateElement.value && endDateElement.value && modulesElement.value){
      this.items.push(semester); // Eintrag hinzufügen
      }
      else{
        alert("Bitte fülle alle Felder aus!")
      }
    },
    listModules() {
        fetch('https://universityhub.azurewebsites.net/modules')
        .then((response) => response.json())
        .then((data) => {
          this.modules = data;
          console.log(this.modules)
          console.log("Das kommt an:" + data)
        })
        .catch((error) => console.error(error));
    },

    },
  },
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
  color: #121212;
}
</style>