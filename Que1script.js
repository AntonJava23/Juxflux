import QuestionOne from "Que1.js";

const app = {  
    
    
}

const vueApp = Vue.createApp(app)
vueApp.component('question-one', QuestionOne)
vueApp.mount("#app")