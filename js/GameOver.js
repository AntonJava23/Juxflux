
import { store } from "./store/StoreData";

function showPointStore() {

  const pointStoreElement = document.getElementById('point-store');
  pointStoreElement.innerHTML = `
  <p>Pöang: ${store.points}</p>  `;

  }

  function restartgame(){
    window.location.href = "index-branch2.html" 
  }

  function gotoStartmenu(){
    window.location.href = "Startmeny.html"
  }

  showPointStore();

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartgame);

const startMenuButton = document.getElementById('start-menu-button');
startMenuButton.addEventListener('click', gotoStartmenu);