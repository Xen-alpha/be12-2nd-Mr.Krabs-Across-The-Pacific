import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@popperjs/core';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; // required if you're not going to override default slots

library.add(fas);
library.add(far);

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());

app.component("InfiniteLoading", InfiniteLoading);
app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");