<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidEnter } from '@ionic/vue';
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
import { ref } from 'vue';


  const calendarOptions ={
        plugins: [
          dayGridPlugin,
        ],
        initialView: "dayGridMonth",
      }

  const cal = ref()

  onIonViewDidEnter(() => {
      setTimeout(() => {
        cal.value.getApi().render()
      }, 10)
    
    });
    
</script>

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Kalender</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <h1 color="primary" id="Kontostandsanzeige">Hallo, hier ist der Kalender </h1>
        

        <FullCalendar ref="cal" :options="calendarOptions" v-if="calendarOptions"/>


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