<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="text-center">
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

      <ion-list>
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
            <ion-label>Studenten hinzufügen/entfernen:</ion-label>
            <ion-select v-model="selectedStudents" multiple placeholder="Wähle Studenten">
              <ion-select-option v-for="(user, idx) in users" :key="idx" :value="user.id">{{ user.firstName }} {{ user.lastName }}</ion-select-option>
            </ion-select>
          </ion-item>
      <ion-button @click="updateCourseStudents()">Speichern</ion-button>

      
      <ion-list>
        <ion-item v-for="(courseUser, index) in courseUsers" :key="index">
          <ion-label>{{ courseUser?.firstName }} {{ courseUser?.lastName }}</ion-label>
          <ion-button slot="end" fill="clear" @click="removeStudent(courseUser.id)">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      


          <ion-button @click="closeModal()">Schließen</ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonButton, IonModal, IonText, IonSelect, IonSelectOption } from '@ionic/vue';
import StudiengangAnlegen from './StudiengangAnlegen.vue';

interface Course {
  id: number;
  name: string;
  description: string;
  students: string[];
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


export default defineComponent({
  name: 'RaumVerwaltung',
  components: { IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonButton, IonModal, StudiengangAnlegen, IonText, IonSelect, IonSelectOption },
  data() {
    return {
      courses: [] as Course[],
      showModal: false,
      selectedCourse: {} as Course,
      users: [] as User[],
      // eslint-disable-next-line vue/no-reserved-keys
      _selectedStudents: [] as string[],
      courseUsers: [] as CourseUser[],
    };
  },
  computed: {
    selectedStudents: {
      get() {
        return this._selectedStudents;
      },
      set(value: string[]) {
        this._selectedStudents = value;
      },
    },
    removedStudents() {
    if (!this.selectedCourse.students) return [];
    return this.users.map(user => user.id).filter((studentId: string) => !this.selectedStudents.includes(studentId));
  },
  
},
watch:{
  displayedStudents() {
    this.courseUsers = [];
    if (!this.selectedCourse.students) return [];
    return this.selectedCourse.students.map((studentId) =>
      this.users.find((user) => user.id === studentId)
    );
  },
},
  async mounted() {
    const token = localStorage.getItem('token') || '';
    // Erstellung der Auswahl der Studenten, die auch wirklich Studenten sind
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
    async removeStudent(studentId) {
    this.selectedStudents = this.selectedStudents.filter((id) => id !== studentId);
    await this.updateCourseStudents();
    await this.displayStudentsFromCourse(); 
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
        "add": this.selectedStudents.filter((studentId: string) => !this.selectedCourse.students.includes(studentId)),
        "remove": this.removedStudents,
      };
      console.log(this.selectedStudents);
      console.log(this.selectedStudents.filter((studentId: string) => !this.selectedCourse.students.includes(studentId)));

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
          this.selectedCourse.students = this.selectedStudents;
          await this.displayStudentsFromCourse();
        //  this.displayStudentsFromCourse();
        } else {
          console.error(`HTTP error: ${response.status}`);
          console.log("Hier ist der Fehler")
          console.log(schema)
        }
      } catch (error) {
        console.error(error);
      }
    },

    async openModal(course: Course) {
      this.selectedCourse = course;
      this.showModal = true;
      await this.displayStudentsFromCourse(); 
    },
    closeModal() {
      this.showModal = false;
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

</style>