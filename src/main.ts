import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "vue-toast-notification/dist/theme-bootstrap.css";

createApp(App).use(store).use(router).mount('#app')
