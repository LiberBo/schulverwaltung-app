

<template>
    <ion-button id="open-modal3" expand="block" size="fixed">Studiengang anlegen</ion-button>
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
        <ion-input v-model="course.name" type="text" placeholder="IFWS420"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Beschreibung:</ion-label>
        <ion-input v-model="course.description" type="text" placeholder=""></ion-input>
      </ion-item>










        <!--Auswahl der Studenten-->
<!--
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
        -->
          <!--Auswahl der Pflichtmodule-->
<!--
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
        -->
          <!--Auswahl der optiomalen Modulen-->
      <!--
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
          -->
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
  IonLabel,/*
  IonSelect,
  IonSelectOption,
  IonList,*/
} from '@ionic/vue';
import { defineComponent } from 'vue';


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
  //  IonSelect,
  //  IonSelectOption,
  //  IonList,
  },

  data() {
    return {
      items: [], // Neue Komponenten-Variable
    //  currentStudent: "",
     // currentMandatoryModule: "",
    //  currentOptionalModule: "",

      course: {
        name: "",
        description: "",
       // students: [],
      //  mandatoryModules: [],
      //  optionalModules: []
      },
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },/*
    addTo(): void {
      const nameElement = (this.$refs.name as typeof IonInput).$el;
      const descriptionElement = (this.$refs.description as typeof IonInput).$el;
      //console.log((this.$refs.students as typeof IonInput).$el);
     // const studentsElement = (this.$refs.students as typeof IonInput).$el;
     // const mandatoryModulesElement = (this.$refs.mandatoryModules as typeof IonInput).$el;
     // const optionalModulesElement = (this.$refs.optionalModules as typeof IonInput).$el;
      // Construct the module object

      console.log(nameElement)
      console.log(descriptionElement)


      if(nameElement.value && descriptionElement.value// && mandatoryModulesElement.value && optionalModulesElement.value
        ){
          const requestOptions = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
             // creditPoints: this.creditPoints,
            }),
            
          };
          fetch('https://universityhub.azurewebsites.net/Courses', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
          }
          else{
            alert("Bitte fülle alle Felder aus!")
          }

      
      console.log("inputElement.value", studyProgrammNameElement.value);
      console.log("inputElement.value", studentsElement.value);
      console.log("professorElement.value", mandatoryModulesElement.value);
      console.log("roomElement.value", optionalModulesElement.value); 

    }, */

    addTo(): void {
      if (this.course.name && this.course.description) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: this.course.name,
            description: this.course.description,
          }),
        };
        fetch('https://universityhub.azurewebsites.net/Courses', requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      } else {
        alert("Bitte fülle alle Felder aus!");
      }
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