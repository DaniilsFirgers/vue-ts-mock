import { createApp } from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import router from "./router";

createApp(App).use(router).use(Vuetify).mount("#app");
