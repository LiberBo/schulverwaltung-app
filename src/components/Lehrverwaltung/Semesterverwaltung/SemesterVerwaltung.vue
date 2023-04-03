<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/Verwaltung/Lehrverwaltung"></ion-back-button>
        </ion-buttons>
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

      <ion-item class="elementSize">
        <ion-label>Semester aktualisieren:</ion-label>
        <ion-button slot="end" fill="clear" color="secondary" OnClick="window.location.reload()">
          Aktualisieren
        </ion-button>
      </ion-item>

      <ion-list class="elementSize">
        <ion-item v-for="(semester, index) in semesters" :key="index">
          <ion-label>
            <h2>{{ semester.name }}</h2>
            <p>Startdatum: {{ formatDate(semester.startDate) }}</p>
            <p>Enddatum: {{ formatDate(semester.endDate) }}</p>
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
            <ion-text>{{ formatDate(selectedSemester?.startDate) }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Enddatum:</ion-label>
            <ion-text>{{ formatDate(selectedSemester?.endDate) }}</ion-text>
          </ion-item>

          <ion-item>
            <ion-label>Module hinzufügen:</ion-label>
            <ion-select :selected="_selectedModules" multiple placeholder="Wähle Module" @ionChange="onModulesSelected($event)">
              <ion-select-option v-for="(module, idx) in modules" :key="idx" :value="module.id">{{ module.name }}</ion-select-option>
            </ion-select>

          </ion-item>
          <ion-button @click=" updateSemesterModules();">Speichern</ion-button>
          <ion-accordion-group>
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Module</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-list>
              <ion-item v-for="(semesterModule, index) in semesterModules" :key="index">
                <ion-label>{{ semesterModule.name }}</ion-label>
                <ion-button slot="end" fill="clear" @click="removeModule(semesterModule.id)">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
      </ion-accordion-group>
      <ion-item>     
        <ion-label>Semester starten</ion-label>
        <ion-button slot="end" fill="clear" color="secondary" @click="startSemester()" :disabled="loading">
          <ion-spinner v-if="loading" name="dots" slot="start"></ion-spinner>
          <span v-else>Semester berechnen</span>
        </ion-button>
      </ion-item>
          <ion-button @click="closeModal()">Schließen</ion-button>
          <ion-item>
            <ion-label>Kurs löschen:</ion-label>
            <ion-button slot="end" fill="clear" color="danger" @click="deleteSemester()">
              Löschen
            </ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSelect, IonSelectOption, IonText, IonIcon, IonAccordion, IonAccordionGroup, IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal } from '@ionic/vue';
import SemesterAnlegen from './SemesterAnlegen.vue';
import { closeOutline } from 'ionicons/icons';


interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  modules: string[];
}
interface Module {
  id: string;
  name: string;
  description: string;
  creditPoints: number;
  moduleType: string;
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonSpinner, IonSelect, IonAccordion, IonText, IonIcon,  IonAccordionGroup, IonButtons, IonBackButton, IonSelectOption, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, SemesterAnlegen },
  data() {
    return {
      semesters: [] as Semester[],
      showModal: false,
      selectedSemester: {} as Semester,
      closeOutline,
      // eslint-disable-next-line vue/no-reserved-keys
      _selectedModules: [] as string[],
      semesterModules: [] as Module[],
      modules: [] as Module[],
      loading: false,
    };
  },

  computed:{
    selectedModulesString: {
    get() {
      return this._selectedModules.join(',');
    },
    
    set(value) {
      if (typeof value !== 'undefined' && value !== null) {
        if (Array.isArray(value)) {
          this._selectedModules = value;
        } else {
          this._selectedModules = value.split(',').map(id => id.trim());
        }
      } else {
        this._selectedModules = [];
      }
    },
  },

  removedModules() {
  if (!this.selectedSemester.modules) return [];
  return this.modules.map(module => module.id).filter((moduleId: string) => !this.selectedSemester.modules.includes(moduleId));
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
      await this.displayModulesFromSemester();
    },
    closeModal() {
      this.showModal = false;
      window.location.reload()
    },
    async deleteSemester() {
      const token = localStorage.getItem('token') || '';
      const semesterId = this.selectedSemester.id;
      const url = `https://universityhub.azurewebsites.net/semesters/${semesterId}`;

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.semesters = this.semesters.filter((semester) => semester.id !== semesterId);
          this.closeModal();
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

    onModulesSelected(event) {
  this._selectedModules = event.detail.value;
},

    formatDate(isoString) {
        const date = new Date(isoString);
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  },

    async startSemester() {
      const token = localStorage.getItem('token') || '';
      this.loading = true;
      const semesterId = this.selectedSemester.id;
      const url = `https://universityhub.azurewebsites.net/semesters/${semesterId}/activate`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Semester = await response.json();
          this.selectedSemester.modules = data.modules;
          prompt("Das Semester wurde berechnet!");
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
        } catch (error) {
          console.error(error);
        }
        this.loading = false;
    },

    async displayModulesFromSemester() {
  const token = localStorage.getItem('token') || '';
  const semesterId = this.selectedSemester.id;
  const url = `https://universityhub.azurewebsites.net/semesters/${semesterId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const semesterModules = data.modules.map((module: any) => {
        return {
          id: module.id,
          name: module.name,
        };
      });
      this.semesterModules = semesterModules;
    } else {
      console.error(`HTTP error: ${response.status}`);
      
    }
  } catch (error) {
    console.error(error);
  }
},


async updateSemesterModules() {
  const token = localStorage.getItem('token') || '';
  const semesterId = this.selectedSemester.id;
  const url = `https://universityhub.azurewebsites.net/semesters/${semesterId}/modules`;
    
  const schema = {
    "add": this._selectedModules.filter((moduleId: string) => !this.selectedSemester.modules.includes(moduleId)),
    "remove": []
  };
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schema),
    });

    if (response.ok) {
      this.selectedSemester.modules = this._selectedModules;
      await this.displayModulesFromSemester();
    } else {
      console.error(`HTTP error: ${response.status}`);

    }
  } catch (error) {
    console.error(error);
  }
},


async removeModule(moduleId) {
      this.selectedSemester.modules = this.selectedSemester.modules.filter((id) => id !== moduleId);
      await this.updateSemesterModules();
      await this.displayModulesFromSemester();
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

@media (min-width: 768px) {
  .elementSize {
    max-width: 60%;
    margin: 0 auto;
  }
}

</style>
