

<template>
    <ion-button id="open-modal3" expand="block">Studiengang anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal3">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Studiengang</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> 
        <!--Studiengangname-->
        <ion-item>
          <ion-label position="stacked">Studiengangname:</ion-label>
          <ion-input ref="studyProgrammName" type="text" placeholder="IFWS420"></ion-input>
        </ion-item>

        <!--Auswahl der Studenten-->

        <ion-list>
            <ion-item>
              <ion-select
                placeholder="Wähle die zugehörigen Studenten aus:"
                :compareWith="compareWith"
                @ionChange="currentStudent = JSON.stringify($event.detail.value)"
                :multiple="true"
                ref="students"
              >
                <ion-select-option v-for="student in students" v-bind:key="student" :value="student">{{ student.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentStudent }}</ion-label>
            </ion-item>
          </ion-list> 

          <!--Auswahl der Pflichtmodule-->

        <ion-list>
            <ion-item>
              <ion-select
                placeholder="Wähle die zugehörigen Pflichtmodule aus:"
                :compareWith="compareWith"
                @ionChange="currentMandatoryModule = JSON.stringify($event.detail.value)"
                :multiple="true"
                ref="mandatoryModules"
              >
                <ion-select-option v-for="mandatoryModule in mandatoryModules" v-bind:key="mandatoryModule" :value="mandatoryModule">{{ mandatoryModule.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentMandatoryModule }}</ion-label>
            </ion-item>
          </ion-list> 

          <!--Auswahl der optiomalen Modulen-->

        <ion-list>
            <ion-item>
              <ion-select
                placeholder="Wähle die zugehörigen optionalen Module aus:"
                :compareWith="compareWith"
                @ionChange="currentOptionalModule = JSON.stringify($event.detail.value)"
                :multiple="true"
                ref="optionalModules"
              >
                <ion-select-option v-for="optionalModule in optionalModules" v-bind:key="optionalModule" :value="optionalModule">{{ optionalModule.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Current value: {{ currentOptionalModule }}</ion-label>
            </ion-item>
          </ion-list> 

        
        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> 
          Studiengang Name: {{ item.studyProgrammName }}, 
          Studenten: {{ item.students.map(element => { 
          return element.name;
            }) }}, 
          Pflichtmodule: {{ item.mandatoryModules.map(element => { 
          return element.name;
            }) }}, 
          optionale Module: {{ item.optionalModules.map(element => { 
          return element.name;
            }) }}</ion-item>
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
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface Module {
  studyProgrammname: string;
  students: string;
  mandatoryModules: string;
  optionalModules: string;
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
    IonSelect,
    IonSelectOption,
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable
      currentStudent: "",
      currentMandatoryModule: "",
      currentOptionalModule: "",

      studyProgramm: {
        studyProgrammName: "",
        students: [],
        mandatoryModules: [],
        optionalModules: []
      },
      students: [
          {
            id: 1,
            name: "Ronny Schäfer",
            type: "Kranexperte"
          },
          {
            id: 2,
            name: "Claudia Nehmat",
            type: "Führungskraft"
          },
          {
            id: 3,
            name: "Andreas",
            type: "Schreihals"
          }
        ],
        mandatoryModules: [ //Modules where mandatory = true
          {
            id: 1,
            name: "Mathematik",
            type: "Komisches Fach"
          },
          {
            id: 2,
            name: "Physik",
            type: "Naturwissenschaft"
          },
          {
            id: 3,
            name: "Biologie",
            type: "Naturwissenschaft"
          }
        ],
        optionalModules: [
          {
            id: 1,
            name: "Deutsch",
            type: "Komisches Fach"
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
        ]
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
    addTo(): void {
      const studyProgrammNameElement = (this.$refs.studyProgrammName as typeof IonInput).$el;
      console.log((this.$refs.students as typeof IonInput).$el);
      const studentsElement = (this.$refs.students as typeof IonInput).$el;
      const mandatoryModulesElement = (this.$refs.mandatoryModules as typeof IonInput).$el;
      const optionalModulesElement = (this.$refs.optionalModules as typeof IonInput).$el;
      // Construct the module object

      

      let studyProgramm: Module = {
        studyProgrammName: studyProgrammNameElement.value,
        students: studentsElement.value,
        mandatoryModules: mandatoryModulesElement.value,
        optionalModules: optionalModulesElement.value,
      };


      if(studyProgrammNameElement.value && studentsElement.value && mandatoryModulesElement.value && optionalModulesElement.value){
      this.items.push(studyProgramm); // Eintrag hinzufügen
      }
      else{
        alert("Bitte fülle alle Felder aus!")
      }

      
      console.log("inputElement.value", studyProgrammNameElement.value);
      console.log("inputElement.value", studentsElement.value);
      console.log("professorElement.value", mandatoryModulesElement.value);
      console.log("roomElement.value", optionalModulesElement.value);

    },
  },
});
</script>

<style>
.text-center {
  text-align: center;
}
.elment-seperation2{
  padding-bottom: 2%;
}
</style>