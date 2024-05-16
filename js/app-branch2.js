import QuestionTwo from "./components/QuestionTwo.js";
import InfoHeader from "./components/InfoHeader.js";

const app = {     
    
}

const vueApp = Vue.createApp(app)
vueApp.component('question-two', QuestionTwo)
vueApp.component('info-header', InfoHeader)
vueApp.mount("#app")