import SverigesRiksdag from "../services/SverigesRiksdag.js";

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
            portraitName: ""
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
            console.log("Shuffle", this.portraits);


        },

        handleClick(event) {
            const isMinister = event.target.dataset.minister === "true"
            console.log(`Image clicked`, typeof isMinister, isMinister);
            if (isMinister) {
                this.correctAnswer = true
                this.wrongAnswer = false
            } else {
                this.wrongAnswer = true
                this.correctAnswer = false
            }
            this.showPortraitName = true
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

    template:
        `<div class="quiz-portrait">
            <h1>Vem är minister?</h1>
            <ul>
                <li v-for="port of portraits" :key="port">
                    <img :src="port.url" :data-minister="port.minister" :alt=Bild på ledamot eller minister @click="handleClick"/>
                    <p v-show="showPortraitName"> {{ port.name }} <br> {{ port.party }} <br> {{ port.status }} </p>
                </li>
            </ul>

            <div v-show="correctAnswer">
                <h2>Korrekt!</h2>
                <a href="index3.html">Nästa fråga</a>
            </div>
            <div v-show="wrongAnswer">
                <h2>Du svara fel</h2>
                <a href="index3.html">Nästa fråga</a>
            </div>
            
        </div>`
}