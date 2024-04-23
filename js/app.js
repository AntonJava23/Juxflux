import SverigesRiksdag from "./services/SverigesRiksdag.js"
import QuizQuestion from "./components/QuizQuestion.js"

const app = {
    data() {
        return {
            currentMissions: [],
            portrait: 0,
            fullName: "",
            status: "",
            intressentIDs: [],
            idCount: ""
        }
    },
    methods: {
        async fetchData() {
            try {
                const currentMissions = await SverigesRiksdag.getCurrentMissions("0222691314314");
                this.currentMissions = currentMissions;

                const portrait = await SverigesRiksdag.getPortraitById("0222691314314");
                this.portrait = portrait;

                const intressentIDs = await SverigesRiksdag.getIntressentIDs();
                this.intressentIDs = intressentIDs;
                const idCount = intressentIDs.length
                this.idCount = idCount

                const fullName = await SverigesRiksdag.getName("0222691314314");
                this.fullName = fullName;

                const status = await SverigesRiksdag.getStatus("0222691314314");
                this.status = status;


            } catch (error) {
                console.error("Error fetching mission count:", error);
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}

async function questionTwo() {
    const choices = [];
    const portrait = "";
    const name = "";
    const randomIDs = this.intressentIDs.sort(() => Math.random() - 0.5);
    if (this.intressentIDs.length >= 4) {
        for (let i = 0; i < 4; i++) {
            choices.push(randomIDs[i]);
        }
    }
    console.log("Chosen ids: ", choices)

    choices.forEach(id => {
        let portrait = getPortraitById(id);
        let name = getName(id)
    });


}

const vueApp = Vue.createApp(app)

vueApp.component('quiz-question', QuizQuestion)

vueApp.mount("#app")