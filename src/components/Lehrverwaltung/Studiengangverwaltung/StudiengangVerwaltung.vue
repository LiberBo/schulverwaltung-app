<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/Verwaltung/Lehrverwaltung"></ion-back-button>
        </ion-buttons>
        <ion-title>Kursverwaltung</ion-title>
        <ion-buttons slot="end">
          <StudiengangAnlegen></StudiengangAnlegen>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Kursverwaltung</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list class="elementSize">
        <ion-item v-for="(course, index) in courses" :key="index">
          <ion-label>
            <h2>{{ course.name }}</h2>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(course)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-modal :is-open="showModal">
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label> 
            <ion-text>{{ selectedCourse?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Beschreibung:</ion-label>
            <ion-text>{{ selectedCourse?.description }}</ion-text>
          </ion-item>
          
          <ion-item>
            <ion-label>Studenten hinzufügen:</ion-label>
            <ion-select v-model="selectedStudentsString" multiple placeholder="Wähle Studenten">
              <ion-select-option v-for="(user, idx) in users" :key="idx" :value="user.id">{{ user.firstName }} {{ user.lastName }}</ion-select-option>
            </ion-select>
          </ion-item>
      <ion-button @click="updateCourseStudents()">Speichern</ion-button>

      <ion-item>
        <ion-label>Module hinzufügen:</ion-label>
        <ion-select v-model="selectedModulesString" multiple placeholder="Wähle Module">
          <ion-select-option v-for="(module, idx) in modules" :key="idx" :value="module.id">{{ module.name }}</ion-select-option>
        </ion-select>
      </ion-item>
<ion-button @click=" updateCourseModules();">Speichern</ion-button>


      <ion-accordion-group>
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Studenten</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-list>
              <ion-item v-for="(courseUser, index) in courseUsers" :key="index">
                <ion-label>{{ courseUser?.firstName }} {{ courseUser?.lastName }}</ion-label>
              <ion-button slot="end" fill="clear" @click="removeStudent(courseUser.id)">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>Module</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-list>
              <ion-item v-for="(courseModule, index) in courseModules" :key="index">
                <ion-label>{{ courseModule.name }}</ion-label>
                <ion-button slot="end" fill="clear" @click="removeModule(courseModule.id)">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </div>
        </ion-accordion>
      </ion-accordion-group>

          <ion-button @click="closeModal()">Schließen</ion-button>

          <ion-item>
            <ion-label>Kurs löschen:</ion-label>
            <ion-button slot="end" fill="clear" color="danger" @click="deleteCourse()">
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
import { IonPage, IonButtons, IonBackButton, IonAccordion, IonAccordionGroup, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal, IonText, IonSelect, IonSelectOption } from '@ionic/vue';
import StudiengangAnlegen from './StudiengangAnlegen.vue';
import { closeOutline } from 'ionicons/icons';

interface Course {
  id: number;
  name: string;
  description: string;
  students: string[];
  modules: string[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface CourseUser {
  id: string;
  firstName: string;
  lastName: string;
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
  components: { IonHeader, IonButtons, IonBackButton, IonAccordion, IonAccordionGroup, IonIcon, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, StudiengangAnlegen, IonText, IonSelect, IonSelectOption },
  data() {
    return {
      courses: [] as Course[],
      showModal: false,
      selectedCourse: {} as Course,
      users: [] as User[],
      // eslint-disable-next-line vue/no-reserved-keys
      _selectedStudents: [] as string[],
      courseUsers: [] as CourseUser[],
      closeOutline,
      modules: [] as Module[],
      // eslint-disable-next-line vue/no-reserved-keys
      _selectedModules: [] as string[],
      courseModules: [] as Module[],
    };
  },
  computed: {

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

  selectedStudentsString: {
    get() {
      return this._selectedStudents.join(',');
    },
    set(value) {
      if (typeof value !== 'undefined' && value !== null) {
        if (Array.isArray(value)) {
          this._selectedStudents = value;
        } else {
          this._selectedStudents = value.split(',').map(id => id.trim());
        }
      } else {
        this._selectedStudents = [];
      }
    },
  },
  removedModules() {
  if (!this.selectedCourse.modules) return [];
  return this.modules.map(module => module.id).filter((moduleId: string) => !this.selectedCourse.modules.includes(moduleId));
},

  removedStudents() {
      if (!this.selectedCourse.students) return [];
      return this.users.map(user => user.id).filter((studentId: string) => !this.selectedCourse.students.includes(studentId));
    },
},
  watch: {
    selectedCourse: {
      handler() {
        this.displayStudentsFromCourse();
      },
      deep: true,
    },
  },
  async mounted() {
    const token = localStorage.getItem('token') || '';


    try {
  const response = await fetch('https://universityhub.azurewebsites.net/modules?moduleType=Compulsory', {
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
      const response = await fetch('https://universityhub.azurewebsites.net/users?authorization=Student', {
        headers: {
          Authorization: `Bearer ${token}`,
          
    },
      });

      if (response.ok) {
        const data: User[] = await response.json();
        this.users.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    

    try {
      const response = await fetch('https://universityhub.azurewebsites.net/Courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Course[] = await response.json();
        this.courses.push(...data);
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

    async deleteCourse() {
      const token = localStorage.getItem('token') || '';
      const courseId = this.selectedCourse.id;
      const url = `https://universityhub.azurewebsites.net/courses/${courseId}`;

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.courses = this.courses.filter((course) => course.id !== courseId);
          this.closeModal();
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },


    async displayModulesFromCourse() {
  const token = localStorage.getItem('token') || '';
  const courseId = this.selectedCourse.id;
  const url = `https://universityhub.azurewebsites.net/courses/${courseId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const courseModules = data.modules.map((module: any) => {
        return {
          id: module.id,
          name: module.name,
        };
      });
      this.courseModules = courseModules;
    } else {
      console.error(`HTTP error: ${response.status}`);
      
    }
  } catch (error) {
    console.error(error);
  }
},


    async updateCourseModules() {
  const token = localStorage.getItem('token') || '';
  const courseId = this.selectedCourse.id;
  const url = `https://universityhub.azurewebsites.net/courses/${courseId}/assignments`;

  const schema = {
    "add": this._selectedModules.filter((moduleId: string) => !this.selectedCourse.modules.includes(moduleId)),
    "remove": [],
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
      this.selectedCourse.modules = this._selectedModules;
      await this.displayModulesFromCourse();
    } else {
      console.error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
},

    async removeStudent(studentId) {
      this.selectedCourse.students = this.selectedCourse.students.filter((id) => id !== studentId);
      await this.updateCourseStudents();
      await this.displayStudentsFromCourse(); 
    },
    async removeModule(moduleId) {
      this.selectedCourse.modules = this.selectedCourse.modules.filter((id) => id !== moduleId);
      await this.updateCourseModules();
      await this.displayModulesFromCourse();
    },

  async displayStudentsFromCourse() {
  const token = localStorage.getItem('token') || '';
  const courseId = this.selectedCourse.id;
  const url = `https://universityhub.azurewebsites.net/courses/${courseId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const students = data.students.map((student: any) => {
        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
        };
      });
      this.courseUsers = students;
    } else {
      console.error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
},

    
  


    async updateCourseStudents() {
      const token = localStorage.getItem('token') || '';
      const courseId = this.selectedCourse.id;
      const url = `https://universityhub.azurewebsites.net/courses/${courseId}/students`;

      const schema = {
        "add": this._selectedStudents.filter((studentId: string) => !this.selectedCourse.students.includes(studentId)),
        "remove": [],
        //this.removedStudents,
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
          this.selectedCourse.students = this._selectedStudents;
          await this.displayStudentsFromCourse();
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async openModal(course: Course) {
  this.selectedCourse = course;
  this.showModal = true;
  await this.displayStudentsFromCourse();
  await this.displayModulesFromCourse();
},

    closeModal() {
      this.showModal = false;
      window.location.reload()
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

.delete-course {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
  color: #ff3b30;
  font-weight: 600;
}

@media (min-width: 768px) { /* Für Desktop-Bildschirme */
  .elementSize {
    max-width: 60%;
    margin: 0 auto;
  }
}


</style>