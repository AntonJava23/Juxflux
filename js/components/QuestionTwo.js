import SverigesRiksdag from "../services/SverigesRiksdag.js";
//import { store } from "../store/StoreData.js";

export default {
    name: "QuizPortrait",
    props: {
        portrait: Object
    },

    data() {
        return {
            portraits: [],
            commissioners: [],
            correctAnswer: false,
            wrongAnswer: false,
            showPortraitName: false,
            portraitName: "",
            selectedPortraitIndex: null,
            showQuestionText: true,
            selectionLocked: false,
            store
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {
        async fetchData() {
            this.commissioners = await SverigesRiksdag.getData()
            console.log("Lista med alla ledamöt och ministrar", this.commissioners);

            this.portraits = await SverigesRiksdag.getFourPortraits(this.commissioners)
            console.log("3 ledamör porträtt, 1 minister", this.portraits);

            this.shuffle(this.portraits)
        },

        handleClick(index) {
            if (this.selectionLocked) return;  // Prevent further clicks if selection is locked
            const isMinister = this.portraits[index].minister;

            if (isMinister) {
                this.correctAnswer = true
                this.wrongAnswer = false
                this.store.score += 1 // Increment score for correct answer
            } else {
                this.wrongAnswer = true
                this.correctAnswer = false
                this.store.health -= 1 // Reduce HP for incorrect answer
            }
            this.showPortraitName = true
            this.selectedPortraitIndex = index
            // this.showQuestionText = false
            this.selectionLocked = true;

            // Set faded property for all incorrect portraits
            this.portraits = this.portraits.map(portrait => {
                if (!portrait.minister) {
                    return { ...portrait, faded: true };
                } else {
                    return { ...portrait, faded: false };
                }
            });

            this.handleSessionStorage() // Save score and health

        },

        handleSessionStorage() {
            // saving stats in browser tab
            sessionStorage.setItem("health", this.store.health.toString())
            sessionStorage.setItem("score", this.store.score.toString())
        },

        nextQuestion() {
            window.location.href = "index-branch3.html";
        },

        shuffle(array) {
            let currentIndex = array.length;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }
    },

    template: `    
    <div class="quiz-portrait">
        <h2>Vem är ministern?</h2>        
        <div v-show="showQuestionText" class="question-text">
            <p>En av dessa fyra är minister, de andra är ledamöter. Välj den som är minister!</p>
        </div>
        <ul>
            <li v-for="(port, index) in portraits" :key="port.url" class="portrait-item">
                <div class="image-wrapper" @click="handleClick(index)">
                    <img 
                        :src="port.url" 
                        :data-minister="port.minister" 
                        alt="Bild på ledamot eller minister"
                        :class="{'faded': port.faded}"
                    />
                    <span v-if="showPortraitName && selectedPortraitIndex === index" 
                          :class="{'indicator': true, 'correct': port.minister, 'incorrect': !port.minister}">
                        <template v-if="port.minister">&#10003;</template>
                        <template v-else>&#10007;</template>
                    </span>
                </div>
                <p v-show="showPortraitName">
                    {{ port.name }} <br> {{ port.party }} <br> {{ port.status }}
                </p>
            </li>
        </ul>
    </div>    
        <div v-show="correctAnswer || wrongAnswer" class="button-container">
            <button class="next-question" @click="nextQuestion">Nästa fråga &rarr;</button>
        </div>
    `
}