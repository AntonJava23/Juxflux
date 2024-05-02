import QuestionTwo from "./components/QuestionTwo.js";

const app = {
    data() {
        return {
            currentMissions: [],
            portrait: "",
            fullName: "",
            status: "",
            intressentIDs: [],
            idCount: "",
            isMini: ""
        }
    },
    methods: {

    },
    mounted() {

    }
}

const vueApp = Vue.createApp(app)
vueApp.component('question-two', QuestionTwo)
vueApp.mount("#app")