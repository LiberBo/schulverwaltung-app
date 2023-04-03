<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="text-center">Kalender</ion-title>
        <ion-buttons slot="end">
          <AccountManagement></AccountManagement>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      

      <FullCalendar ref="cal" weekNumbers="true" class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.event.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>

      <ion-list class="demo-app-calendar">
        <ion-item v-for="(event, index) in selectedDateEvents" :key="index">
          <ion-label>{{ event.title }}</ion-label>
          <ion-note slot="end">{{ event.start.toLocaleTimeString() }}</ion-note>
        </ion-item>
      </ion-list>

      
      <ion-list class="demo-app-calendar">
        <h1>Räume:</h1>
        <ion-item v-for="(location, index) in locations" :key="index">
          <ion-label>
            <h2>{{ location.name }}</h2>
          </ion-label>
          <ion-button slot="end" fill="clear" @click="openModal(location)">
            Bearbeiten
          </ion-button>
        </ion-item>
      </ion-list>


      <ion-modal :is-open="showModal">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>{{ selectedLocation?.name }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal()">
                <ion-icon name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item>
            <ion-label>Name:</ion-label>
            <ion-text>{{ selectedLocation?.name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Breitengrad:</ion-label>
            <ion-text>{{ selectedLocation?.coordinates.latitude }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Längengrad:</ion-label>
            <ion-text>{{ selectedLocation?.coordinates.longitude }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Maximale Kapazität:</ion-label>
            <ion-text>{{ selectedLocation?.size }}</ion-text>
          </ion-item>
          <ion-item>
            <IonButton :href="`https://maps.google.com/?q=${selectedLocation?.coordinates.latitude},${selectedLocation?.coordinates.longitude}`" target="_blank">
              Auf der Karte anzeigen lassen
            </IonButton>
          </ion-item>
        </ion-content>
      </ion-modal>
      
      

    </ion-content>
  </ion-page>
</template>



<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
  import { IonPage, IonHeader, IonToolbar, IonButton, IonModal, IonText, IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButtons, IonNote } from '@ionic/vue';
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { INITIAL_EVENTS, createEventId } from "../components/event-utils";
  import AccountManagement from '@/views/AccountAnzeigen.vue';
  import { EventClickArg } from "@fullcalendar/common";
  import jwt_decode from "jwt-decode";

  interface Lecture {
  duration: number;
  location: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    size: number;
  };
  date: string;
  moduleName: string;
  professor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    authorization: string;
    assignments: {
      id: string;
      name: string;
      description: string;
      creditPoints: number;
      moduleType: string;
      status: string;
    }[];
  };
}
interface Location {
  id: string;
  name: string;
  coordinates: {
    latitude: 0,
    longitude: 0
  },

  size: 0;
}


  
  export default {
    components: {
      FullCalendar,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      AccountManagement,
      IonList, 
      IonItem, 
      IonLabel, 
      IonButtons,
      IonNote,
      IonButton, 
      IonModal, 
      IonText, 
      IonIcon,
      
  },
    data() {
      return {
        currentEvents: [],
        selectedDateEvents: [],
        calendarOptions: {
          dateClick: this.handleDateClick,
          eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          },
          eventClick: this.handleEventClick,
          plugins: [
            dayGridPlugin, 
            timeGridPlugin, 
            interactionPlugin,
          ],
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
          },
          initialView: "dayGridMonth",
          initialEvents: INITIAL_EVENTS,
          editable: false,
          selectable: false,
          selectMirror: true,
          dayMaxEvents: false,
          weekends: true,
          eventsSet: this.handleEvents,
          locale: 'de',
          weekNumberCalculation: 'ISO',
          weekNumberFormat: 'W',
          buttonText: {
            today: 'Heute',
            month: 'Monat',
            week: 'Woche',
            day: 'Tag',
            list: 'Liste'
          },
          allDayText: 'Ganztägig',
          noEventsText: 'Keine Ereignisse anzuzeigen',
        },
        locations: [] as Location[],
        showModal: false,
        selectedLocation: {} as Location,
      }
    },
    async mounted() {
      this.fetchLectures();
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.$refs.cal.getApi().render();
      }, 10);
      const token = localStorage.getItem('token') || '';

      try {
        const response = await fetch('https://universityhub.azurewebsites.net/Locations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Location[] = await response.json();
          this.locations.push(...data);
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

  methods: {

    handleEvents(events: never[]) {
      this.currentEvents = events;
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },

    handleEventClick(eventClickInfo: EventClickArg) {
      const eventTitle = eventClickInfo.event.title;
      const eventStart = eventClickInfo.event.start;
      const eventEnd = eventClickInfo.event.end;
      const lecture = eventClickInfo.event.extendedProps.lecture;
      const locationName = lecture.location.name;

      // Display more information about the event, including the location name
      alert(`Vorlesung - Dozent: ${eventTitle}\n\nStart: ${eventStart}\n\nEnde: ${eventEnd}\n\n ${locationName}`);
    },
    
    
    handleDateClick(dateClickInfo) {
      const clickedDate = dateClickInfo.date;
      const calendarApi = dateClickInfo.view.calendar;
      const events = calendarApi.getEvents();

      // Filter events for the clicked date
      const eventsOnClickedDate = events.filter((event) => {
        const eventStart = event.start;
        const eventEnd = event.end || eventStart;

        return (
          clickedDate >= eventStart &&
          clickedDate <= eventEnd
        );
      });
      this.selectedDateEvents = eventsOnClickedDate;
    },

    async openModal(location: Location) {
      this.selectedLocation = location;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },


        
    async fetchLectures() {
      const token = localStorage.getItem("token") || "";
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.sub;
      try {
        const response = await fetch(
          `https://universityhub.azurewebsites.net/users/${userId}/lectures`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const lectures: Lecture[] = await response.json();
          this.setInitialEvents(lectures);
          console.log(lectures)
        } else {
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    setInitialEvents(lectures: Lecture[]) {
      const calendarEvents = lectures.map((lecture) => {
      const eventStart = new Date(lecture.date);
      const eventEnd = new Date(lecture.date);
      eventEnd.setMinutes(eventEnd.getMinutes() + lecture.duration);

      return {
        id: createEventId(),
        title: `${lecture.moduleName} - ${lecture.professor.lastName}`,
        start: eventStart.toISOString(),
        end: eventEnd.toISOString(),
        allDay: lecture.duration === 0,
        extendedProps: {
          lecture: lecture
        }
      };
    });


  // Aktualisieren der initialEvents
  this.calendarOptions.initialEvents = calendarEvents;

  // Entfernen aller vorhandenen Events aus dem Kalender
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  this.$refs.cal.getApi().removeAllEvents();

  // Hinzufügen der neuen Events zum Kalender
  calendarEvents.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.$refs.cal.getApi().addEvent(event);
  });

  // Neuzeichnen des Kalenders, um die Änderungen anzuzeigen
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  this.$refs.cal.getApi().render();
}


  },
};
</script>

<style>
  webkit-scrollbar {
    width: 0px;
  }
  @media screen and (min-width: 992px) {
    .demo-app-calendar {
      height: Auto;
      width: 70%;
      margin: 0 auto;
      padding-top: 2%
    }
  }

  @media screen and (max-width: 991px) {
    .demo-app-calendar {
      width: 95%;
      height: 100%;
      margin: 0 auto;
      padding-top: 2%
    }
  }

  .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
  }
  vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  vc-weeks {
    padding: 0;
  }
  vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
  }
  weekday-7 {
    background-color: #eff8ff;
  }
  noton-bottom {
    border-bottom: var(--day-border);
  }
  weekday-1 {
    border-bottom: var(--day-border-highlight);
  }

  vc-day-dots {
    margin-bottom: 5px;
  }
</style>
