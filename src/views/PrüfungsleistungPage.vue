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
      
      <ion-button @click="askForSchoolYear">Schuljahr auswählen</ion-button>
      
      <div v-if="tableVisible">
        <table>
          <tr>
            <th>Lehrveranstaltung</th>
            <th>Note</th>
          </tr>
          <tr v-for="(row, index) in tableData" v-bind:key="index">
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
  name: 'PrüfungsleistungPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  data() {
    return {
      schoolYear: "", // schoolYear is now nullable
      tableVisible: false,
      tableData: [{subject: "Deutsch", grade: 4}] as TableDataRow[]
    }
  },
  methods: {
    askForSchoolYear() {
      this.schoolYear = String(prompt('Bitte gib das Schuljahr ein:'));
      this.tableVisible = true;
    },
    addRow(subject: string, grade: number) {
      this.tableData.push({ subject, grade });
    }
  }
});

</script>