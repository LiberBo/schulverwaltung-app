import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(vuetify);

// 401-Interceptor
const handle401Error = () => {
  router.push('/Anmeldung');
}

// Add the 401 interceptor to the Fetch API
// Add the 401 interceptor to the Fetch API
const originalFetch: typeof fetch = window.fetch;
window.fetch = async function (...args) {
  const response = await originalFetch(...args);
  if (!response.ok && !response.status.toString().startsWith('2')) {
    console.error(`HTTP error: ${response.status}`);
    // Additional error handling here if needed
    const toast = document.createElement('ion-toast');
    toast.message = `HTTP error: ${response.status}`;
    toast.duration = 3000;
    toast.position = 'top';
    document.body.appendChild(toast);
    await toast.present();
  } else if (response.status === 401) {
    handle401Error();
  }
  return response;
} as typeof fetch; // <-- Add this to ensure the custom fetch has the same type as the original


router.isReady().then(() => {
  app.mount('#app');
});
