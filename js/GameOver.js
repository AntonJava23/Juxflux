
//import { store } from "./store/StoreData";

//function showPointStore() {

  //const pointStoreElement = document.getElementById('point-store');
  //pointStoreElement.innerHTML = `
  //<p>Pöang: ${store.points}</p>  `;

  //}

  //showPointStore();

  const restartButton = document.getElementById('restart-button');
  document.getElementById("restart-button").addEventListener("click", function () {
    window.location.href = "index-branch2.html"
  });

  const startMenuText = document.getElementById('start-menu-text');
document.getElementById("start-menu-text").addEventListener("click", function () {
  window.location.href = "StartmenyVue.html"
});