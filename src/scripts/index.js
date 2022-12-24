import "regenerator-runtime"; /* for async await transpile */
import "../styles/relative-style.css";
import "../styles/style.css";
import "../styles/detail-page-style.css";
import swRegister from "./utils/sw-register";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import App from "./views/app";

const app = new App({
  drawertoogle: document.querySelector(".menuToggle"),
  drawernavigation: document.querySelector(".navigation"),
  content: document.querySelector("#maincontent"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
