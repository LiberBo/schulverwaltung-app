import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { toastController } from '@ionic/vue';
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



const originalFetch: typeof fetch = window.fetch;
window.fetch = async function (...args) {
  const response = await originalFetch(...args);
  if (!response.ok && !response.status.toString().startsWith('2')) {
    try {
      const errorData = await response.json();
      const errorMessage = errorData.errors
        ? Object.values(errorData.errors).flat().join(', ')
        : errorData.message || 'Unknown error';

      const toast = await toastController.create({
        message: `HTTP error: ${response.status} - ${errorMessage}`,
        duration: 3000,
        position: 'top',
      });
      await toast.present();
      console.error(response.json)
    } catch (error) {
      const toast = await toastController.create({
        message: `HTTP error: ${response.status} - Failed to parse error message.`,
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }
  } else if (response.status === 401) {
    handle401Error();
  }
  return response;
} as typeof fetch;





router.isReady().then(() => {
  app.mount('#app');
});
