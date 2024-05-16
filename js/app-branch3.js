import QuestionThree from "./components/QuestionThree.js";
import infoHeader from "./components/InfoHeader.js";
import storeData from "./store/storeData.js";

const app = {

}

const vueApp = Vue.createApp(app)
vueApp.component('question-three', QuestionThree)
vueApp.component('info-header', infoHeader)
vueApp.store('store-data', storeData)
vueApp.mount("#app")