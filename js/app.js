import SverigesRiksdag from "./services/SverigesRiksdag.js"
import QuizQuestion from "./components/QuizQuestion.js"
import QuizPortrait from "./components/QuizPortrait.js";

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

// vueApp.component('quiz-question', QuizQuestion)
vueApp.component('quiz-portrait', QuizPortrait)

vueApp.mount("#app")