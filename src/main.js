import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style.scss";

//vue-app/src/main.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-dark-teal/theme.css";
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("QuillEditor", QuillEditor);
app.use(ElementPlus);
app.use(PrimeVue);
app.use(store);
app.use(router);
app.mount("#app");
