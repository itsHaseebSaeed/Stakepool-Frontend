// Root app component
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import `gripVueJsApp`
import { gripVueJsApp } from "@stakeordie/griptape-vue.js";
import router from "../src/router/router";
const conf = {
  restUrl: "https://api.holodeck.stakeordie.com",
};

import "/src/assets/css/style.css";

// Grip your app, you are now ready to develop your application
gripVueJsApp(conf, App, (app, pinia) => {
  app.use(router);
});
