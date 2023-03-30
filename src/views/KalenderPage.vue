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

      <h1 color="primary" id="Kontostandsanzeige">Hier finden Sie den Kalender </h1>
      

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
      

    </ion-content>
  </ion-page>
</template>



<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { INITIAL_EVENTS, createEventId } from "../components/event-utils";
  import AccountManagement from '@/views/AccountAnzeigen.vue';
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


  
  export default {
    components: {
      FullCalendar,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      AccountManagement,
      
  },
    data() {
      return {
        currentEvents: [],
        selectedDateEvents: [],
        calendarOptions: {
          dateClick: this.handleDateClick,
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
        },
      }
    },
    mounted() {
      this.fetchLectures();
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.$refs.cal.getApi().render();
      }, 10);
    },

    methods: {
      handleEvents(events: never[]) {
        this.currentEvents = events;
      },
      handleWeekendsToggle() {
        this.calendarOptions.weekends = !this.calendarOptions.weekends;
      },
      handleDateSelect(selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) {
        let title = prompt("Please enter a new title for your event");
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        }
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
      } else {
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setInitialEvents(lectures: Lecture[]) {
    for (const lecture of lectures) {
      const event = {
        id: createEventId(),
        title: lecture.moduleName,
        start: lecture.date,
        allDay: lecture.duration === 0,
      };
      this.calendarOptions.initialEvents.push(event);
    }
  },
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
