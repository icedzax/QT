import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import router from "./routes";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import VNum from "v3-num";

const app = createApp(App);

app.use(VNum);
app.use(router);
app.use(SimpleTypeahead);
app.mount("#app");
