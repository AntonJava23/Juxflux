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
            <ul>
                <li v-for="port of portraits" :key="port">
                    <img :src="port" :alt="port"/>
                    
                </li>
            </ul>
        </div>`
}