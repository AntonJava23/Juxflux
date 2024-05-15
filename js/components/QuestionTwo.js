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
            portraitName: "",
            selectedPortraitIndex: null

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

        handleClick(index) {
            // const isMinister = event.target.dataset.minister === "true"
            const isMinister = this.portraits[index].minister;
            console.log(`Image clicked`, typeof isMinister, isMinister);

            if (isMinister) {
                this.correctAnswer = true
                this.wrongAnswer = false
            } else {
                this.wrongAnswer = true
                this.correctAnswer = false
            }
            this.showPortraitName = true
            this.selectedPortraitIndex = index
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
            <h1>Vem är minister?</h1>
            <ul>
                <li v-for="(port, index) in portraits" :key="port.url" class="portrait-item">
                    <div class="image-wrapper" @click="handleClick(index)">
                        <img :src="port.url" :data-minister="port.minister" alt="Bild på ledamot eller minister"/>                    
                        <span v-if="showPortraitName && selectedPortraitIndex === index" 
                              :class="{'indicator': true, 'correct': port.minister, 'incorrect': !port.minister}">
                            <template v-if="port.minister">&#10003;</template>
                            <template v-else>&#10007;</template>
                        </span>
                    </div>
                    <p v-show="showPortraitName"> 
                        {{ port.name }} <br> 
                        {{ port.party }} <br> 
                        {{ port.status }} 
                    </p>         
                </li>
            </ul>

            <div v-show="correctAnswer || wrongAnswer">
                <button @click="nextQuestion">Nästa fråga</button>
            </div>
        </div>
    `
}