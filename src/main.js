import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loader from "@/components/Loader.vue";
import Paginate from "vuejs-paginate-next";
import tooltipDirective from "./directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min";
import { Vuelidate } from "vuelidate";
import toastPlugin from "./utils/toastPlugin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseApp = initializeApp(
//Your config from https://firebase.google.com/
);

const auth = getAuth(firebaseApp);
let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(store);
    app.use(Vuelidate);

    app.directive("tooltip", tooltipDirective);
    app.component("Loader", Loader);
    app.component("Paginate", Paginate);


    app.mount("#app");

    app.config.globalProperties.$error = toastPlugin.error;
    app.config.globalProperties.$message = toastPlugin.message;
  }
});

export { firebaseApp, auth };

