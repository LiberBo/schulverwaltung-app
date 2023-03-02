<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../components/event-utils";

export default {
  components: {
    FullCalendar,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
  },
  data() {
    return {
      currentEvents: [],
      calendarOptions: {
        plugins: [
          dayGridPlugin, 
          timeGridPlugin, 
          interactionPlugin
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        // select: this.handleDateSelect.bind(this),
       //  eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
    }
  },
  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.$refs.cal.getApi().render()
    }, 10)
  },
  methods: {
    handleEvents(events: never[]) {
      this.currentEvents = events;
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
        //this.currentEvents = calendarApi.getEvents();
      }
    },
    handleEventClick(clickInfo: { event: { title: any; remove: () => void; }; }) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
  },
};



    
</script>

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Kalender</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <h1 color="primary" id="Kontostandsanzeige">Hier finden Sie den Kalender </h1>
        

        <!---<FullCalendar ref="cal" :options="calendarOptions" v-if="calendarOptions"/> -->
        <FullCalendar ref="cal" weekNumbers="true" class="demo-app-calendar" :options="calendarOptions">
    <template v-slot:eventContent="arg">
      <b>{{ arg.event.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>


      </ion-content>
    </ion-page>
  </template>
  
  
  
  <style>

webkit-scrollbar {
  width: 0px;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;};
  vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  };
  vc-weeks {
    padding: 0;
  };
  vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  };
  vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
  }
    weekday-7 {
      background-color: #eff8ff;
    };
    noton-bottom {
      border-bottom: var(--day-border);
    };
    weekday-1 {
        border-bottom: var(--day-border-highlight);
      };
    
    
  
  vc-day-dots {
    margin-bottom: 5px;
  }
</style>