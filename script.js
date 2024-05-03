import QuestionThree from "./components/QuestionThree.js";

const app = {
    data() {

    },
    methods: {
       
    },

    mounted() {
        
    }
}

const vueApp = Vue.createApp(app)
vueApp.component('question-three', QuestionThree)
vueApp.mount("#app")