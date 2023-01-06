<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prüfungsleistung</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Prüfungsleistung</ion-title>
        </ion-toolbar>
      </ion-header>






      
      <ion-button @click="askForFinishedGrade">Eingabe tätigen</ion-button>
      
      <div v-for="(yearData) in sortedTableDataRows" :key="yearData[0].schoolYear">
    <h2>{{ yearData[0].schoolYear }}</h2>
    <table class="color-{{ index % 4 + 1 }}">
      <tr>
        <th>Lehrveranstaltung</th>
        <th>Note</th>
      </tr>
      <tr v-for="row in yearData" v-bind:key="row.subject">
        <td>{{ row.subject }}</td>
        <td>{{ row.grade }}</td>
      </tr>
    </table>
  </div>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';


// Define the type for the table data rows
type TableDataRow = {
  subject: string,
  grade: number
}

export default defineComponent({
  name: 'ExamPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  
  data() {
    return {
      schoolYear: "",
      schoolSubject: "",
      schoolGrade: "",
      tableData: {} as { [year: string]: TableDataRow[] },
    }
  },
  methods: {
    askForSchoolYear() {
      this.schoolYear = String(prompt('Bitte gib das Schuljahr ein:'));
    },
    askForSubject() {
      this.schoolSubject = String(prompt('Bitte gib das Fach ein:'));
    },
    askForGrade() {
      this.schoolGrade = String(prompt('Bitte gib die Note ein:'));
    },
    addRow() {
      if (!this.tableData[this.schoolYear]) {
        this.tableData[this.schoolYear] = [];
      }
      this.tableData[this.schoolYear].push({
        subject: this.schoolSubject,
        grade: Number(this.schoolGrade),
      });
    },
    askForFinishedGrade() {
      this.askForSchoolYear();
      this.askForSubject();
      this.askForGrade();
      this.addRow();
    },
  },
  computed: {
    sortedTableDataRows(): TableDataRow[][] {
      return Object.entries(this.tableData)
        .sort(([year1], [year2]) => year1.localeCompare(year2))
        .map(([_, yearData]) => yearData);
    },
  },
});


</script>

<style>
  .tableBackground-1 {
    background-color: lightblue;
  }
</style>