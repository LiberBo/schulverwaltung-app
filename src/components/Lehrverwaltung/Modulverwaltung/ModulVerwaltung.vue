<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/Verwaltung/Lehrverwaltung"></ion-back-button>
        </ion-buttons>
        <ion-title>Modulverwaltung</ion-title>
        <ion-buttons slot="end">
          <ModuleAnlegen></ModuleAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Modulverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list class="elementSize">
        <ion-item-group>
          <ion-item-divider sticky>
            <h1>Pflichtmodule</h1>
          </ion-item-divider>
          <ion-item v-for="(module, index) in compulsoryModules" :key="index">
            <ion-label>
              <h2>{{ module.name }}</h2>
              <p>{{ module.description }}</p>
            </ion-label>
            <ion-button slot="end" fill="clear" @click="openModal(module)">
              Bearbeiten
            </ion-button>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider sticky>
            <h1>Optionale Module</h1>
          </ion-item-divider>
          <ion-item v-for="(module, index) in optionalModules" :key="index">
            <ion-label>
              <h2>{{ module.name }}</h2>
              <p>{{ module.description }}</p>
            </ion-label>
            <ion-button slot="end" fill="clear" @click="openModal(module)">
              Bearbeiten
            </ion-button>
          </ion-item>
        </ion-item-group>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedModule?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Beschreibung:</ion-label>
            <ion-text>{{ selectedModule?.description }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Modultyp:</ion-label>
            <ion-text>{{ selectedModule?.moduleType }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Maximale Teilnehmerzahl:</ion-label>
            <ion-text>{{ selectedModule?.maxSize }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Professoren hinzufügen:</ion-label>
            <ion-select :selected="_selectedProfessors" multiple placeholder="Wähle Professoren" @ionChange="onProfessorSelected($event)">
              <ion-select-option v-for="(professor, idx) in professors" :key="idx" :value="professor.id">{{ professor.firstName }} {{ professor.lastName }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button @click=" updateModuleProfessors();">Speichern</ion-button>
          <ion-accordion-group>
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Professoren</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-list>
              <ion-item v-for="(moduleProfessor, index) in selectedModule.professors" :key="index">
                <ion-label>{{ moduleProfessor.firstName }} {{ moduleProfessor.lastName }}</ion-label>
                <ion-button slot="end" fill="clear" @click="removeProfessor(moduleProfessor.id)">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
      </ion-accordion-group>

          <ion-button @click="closeModal()">Schließen</ion-button>
          <ion-item>
            <ion-label>Modul löschen:</ion-label>
            <ion-button slot="end" fill="clear" color="danger" @click="deleteModule()">
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
import { IonPage, IonText, IonButtons, IonIcon, IonItemDivider,IonItemGroup, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal, IonAccordion, IonAccordionGroup, IonSelect, IonSelectOption } from '@ionic/vue';
import ModuleAnlegen from './ModuleAnlegen.vue';
import { closeOutline } from 'ionicons/icons';

interface Module {
  id: string;
  name: string;
  description: string;
  moduleType: string;
  maxSize: number;
  professors: Professor[];
  isCompulsory: boolean;
}

interface Professor {
  id: string;
  firstName: string;
  lastName: string;
}

export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonText, IonIcon, IonButtons, IonBackButton, IonItemDivider,IonItemGroup, IonAccordion, IonAccordionGroup, IonSelect, IonSelectOption, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, ModuleAnlegen, IonModal },
  data() {
    return {
      modules: [] as Module[],
      showModal: false,
      selectedModule: {} as Module,
      closeOutline,
      // eslint-disable-next-line vue/no-reserved-keys
      _selectedProfessors: [] as Professor[],
      professors: [] as Professor[],
      moduleProfessors: [] as Professor[],
    };
  },
  computed: {
    selectedModulesString: {
      get() {
      return this._selectedProfessors.map(p => p.id).join(",");
    },
    set(value) {
      if (typeof value === "string") {
        const ids = value.split(",").filter((id: string) => id);
        this._selectedProfessors = this.professors.filter((p: Professor) => ids.includes(p.id));
      } else {
        this._selectedProfessors = [];
      }
    },
    },
    compulsoryModules() {
    return this.modules.filter(module => module.moduleType === 'Compulsory');
    },
    optionalModules() {
      return this.modules.filter(module => module.moduleType !== 'Compulsory');
    },


  removedProfessors(): Professor[] {
    if (!this.selectedModule.professors) return [];
    return this.professors.filter((professor: Professor) => !this.selectedModule.professors.includes(professor));
  },
},


async mounted() {
    const token = localStorage.getItem('token') || '';
    try {
      const response = await fetch('https://universityhub.azurewebsites.net/users?authorization=Professor', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data: Professor[] = await response.json();
        this.professors.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }

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

  methods: {
  async openModal(module: Module) {
    this.selectedModule = module;
    this.showModal = true;
    await this.displayProfessorsFromModule();
  },
  closeModal() {
    this.showModal = false;
    window.location.reload()
  },

  async deleteModule() {
    const token = localStorage.getItem('token') || '';
    const moduleId = this.selectedModule.id;
    const url = `https://universityhub.azurewebsites.net/modules/${moduleId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        this.modules = this.modules.filter((module) => module.id !== moduleId);
        this.closeModal();
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },

  onProfessorSelected(event: CustomEvent) {
  this._selectedProfessors = event.detail.value
    .map((id: string) => this.professors.find((professor) => professor.id === id))
    .filter((professor: Professor | undefined) => professor !== undefined) as Professor[];
},




  async displayProfessorsFromModule() {
    const token = localStorage.getItem('token') || '';
    const moduleId = this.selectedModule.id;
    const url = `https://universityhub.azurewebsites.net/modules/${moduleId}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const moduleProfessors = data.professors.map((professor: any) => {
          return {
            id: professor.id,
            firstName: professor.firstName,
            lastName: professor.lastName
          };
        });
        this.moduleProfessors = moduleProfessors;
        console.log(moduleProfessors)
        console.log(moduleId)
      } else {
        console.error(`HTTP error: ${response.status}`);
        
      }
    } catch (error) {
      console.error(error);
    }
  },

  async updateModuleProfessors() {
  const token = localStorage.getItem('token') || '';
  const moduleId = this.selectedModule.id;
  const url = `https://universityhub.azurewebsites.net/modules/${moduleId}/professors`;

  const schema = {
        add: this._selectedProfessors
          .filter((professor: Professor) => !this.selectedModule.professors.some((p) => p.id === professor.id))
          .map((professor: Professor) => professor.id),
        remove: [],
      };

  try {
    console.log(JSON.stringify(schema));
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schema),
    });

    if (response.ok) {
      console.log("Der Response war in Ordnung");
      this.selectedModule.professors = this._selectedProfessors;
      await this.displayProfessorsFromModule();
    } else {
      console.error(`HTTP error: ${response.status}`);
      console.error(`HTTP error: ${response}`);
    }
  } catch (error) {
    console.error(error);
  }
},

  
removeProfessor(professorId: string) {
  this._selectedProfessors = this._selectedProfessors.filter((professor) => professor.id !== professorId);
  this.updateModuleProfessors();
  this.displayProfessorsFromModule();
},


}

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

@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .elementSize {
    max-width: 60%;
    margin: 0 auto;
  }
}

</style>
