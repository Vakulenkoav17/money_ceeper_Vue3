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

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCbYCbi7HmeUT59uNaXl8c-LZSpaVbCi_4",
  authDomain: "vue-money-manager.firebaseapp.com",
  databaseURL: "https://vue-money-manager-default-rtdb.firebaseio.com",
  projectId: "vue-money-manager",
  storageBucket: "vue-money-manager.appspot.com",
  messagingSenderId: "775214734290",
  appId: "1:775214734290:web:82aedcea8d6c422106460b",
  measurementId: "G-K6K2VWGKZ5",
});

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

