

<template>
    <ion-button id="open-modal" expand="block" size="fixed">Module anlegen</ion-button>
    <ion-modal ref="modal" trigger="open-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title class="text-center">Module</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addTo()">Hinzufügen</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Modulnamen:</ion-label>
          <ion-input ref="moduleName" type="text" placeholder="Informatik"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Modulbeschreibung:</ion-label>
          <ion-input ref="moduleDescription" type="text" placeholder="Cool"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Credit Points:</ion-label>
          <ion-input ref="creditPoints" type="number" placeholder="3"></ion-input>
        </ion-item>
        <!--
        <ion-list>
            <ion-item>
              <ion-select
                placeholder="Suche ein oder mehrere erforderliche Ausstattungen aus:"
                :compareWith="compareWith"
                :multiple="true"
                ref="equipmentNames"
              >
                <ion-select-option v-for="equipmentName in equipmentNames" v-bind:key="equipmentName" :value="equipmentName">{{ equipmentName.name }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list> 
        -->
        <!--
        <ion-item>
          <ion-label position="stacked">Professor:</ion-label>
          <ion-input ref="professor" type="text" placeholder="Dr. Smith"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Raum:</ion-label>
          <ion-input ref="room" type="text" placeholder="C111"></ion-input>
        </ion-item>
      -->
        
        <ion-item v-for="item in items" :key="item" class="elment-seperation2"> Modulnamen: {{ item.name }}, Credit Points: {{ item.creditPoints }}, Equipment: {{ item.equipmentNames.map(element => { 
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
 // IonList,
 // IonSelect,
 // IonSelectOption,
} from '@ionic/vue';
import { defineComponent } from 'vue';

interface Module {
  name: string;
  creditPoints: number;
  equipmentNames: [];
  //professor: string;
  //room: string;
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
    //IonList,
  //  IonSelect,
  //  IonSelectOption
  },

  data() {
    return {
      Module: [], // Neue Komponenten-Variable
      currentEquipmentName: "",
      module: {
        moduleName: "",
        moduleDescription: "",
        creitPoints: "",
   //     equipmentNames: []
      },
      equipmentNames: [
          {
            id: 1,
            name: "Beamer",
            type: "Technik"
          },
          {
            id: 2,
            name: "Tafel",
            type: "Old"
          },
          {
            id: 3,
            name: "Fenster",
            type: "Ablenkung"
          }
        ]
    };
  },
  methods: {
    cancel(): void {
      (this.$refs.modal as typeof IonModal).$el.dismiss(null, 'cancel');
    },
    addTo(): void {
      // Abfrage welches der beiden (Pflich oder optinale Module) = true ist und dann abspeichern
      const moduleNameElement = (this.$refs.moduleName as typeof IonInput).$el;
      const moduleDescriptionElement = (this.$refs.moduleDescription as typeof IonInput).$el;
      const creditPointsElement = (this.$refs.creditPoints as typeof IonInput).$el;
    //  const equipmentNamesElement = (this.$refs.equipmentNames as typeof IonInput).$el;
    //  const professorElement = (this.$refs.professor as typeof IonInput).$el;
    //  const roomElement = (this.$refs.room as typeof IonInput).$el;
      // Construct the module object

      let module: Module = {
        name: moduleNameElement.value,
        creditPoints: creditPointsElement.value,
        moduleDescription: moduleDescriptionElement.value,
       // equipmentNames: equipmentNamesElement.value,
      //  professor: professorElement.value,
      //  room: roomElement.value,
      };

      if(moduleNameElement.value && creditPointsElement.value ){ //&& professorElement.value && roomElement.value && equipmentNamesElement.value
      //this.items.push(module); // Eintrag hinzufügen

      const url = 'https://universityhub.azurewebsites.net/modules';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(module)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Update the module list
        this.Module.push(module);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


      }
      else{
        alert("Bitte fülle alle Felder aus!")
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