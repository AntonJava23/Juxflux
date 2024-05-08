import QuestionThree from "./components/QuestionThree.js";

const app = {
}

const vueApp = Vue.createApp(app)
vueApp.component('question-three', QuestionThree)
vueApp.mount("#app")