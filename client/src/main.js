import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/scss/_globals.scss";
import "./assets/scss/_typo.scss";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
