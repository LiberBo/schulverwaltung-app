<template>
  <ion-modal ref="modal2" trigger="open-modal2">
      <h2>{{ room.name }}</h2>
      <p>Details zum Raum: {{ room.id }}</p>
      <p>Die Ausstattung des Raumes:</p> 
      <p v-for=" roomEquipment in roomEquipments" v-bind:key="roomEquipment.id" :value="roomEquipment">{{ roomEquipment.name }}</p> 
  </ion-modal>
      <!--
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content">
      <h2>{{ room.name }}</h2>
      <p>Details zum Raum: {{ room.id }}</p>
      <button @click="closeModal">Schließen</button>
    </div> 
  </div>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonModal,
} from '@ionic/vue';

export default defineComponent({
  props: ['room'],
  components: {
    IonModal,
  },
  data() {
    return {
      items: [],
      roomEquipments: [
          {
            id: 1,
            name: "Beamer",
            type: "Physik"
          },
          {
            id: 2,
            name: "Tafel",
            type: "Mathematik"
          },
          {
            id: 3,
            name: "Fenster",
            type: "Geologie"
          }
        ],
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    cancel(): void {
      (this.$refs.modalRoom as typeof IonModal).$el.dismiss(null, 'cancel');
    },
  }
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>