import SverigesRiksdag from "../services/SverigesRiksdag.js";

export default {
    name: "QuizQuestion",
    props: {
        question: Object
    },

    data() {
        return {
            questions: [],
            portraits: [], // Store fetched portraits            
        }

    },

    created() {
        this.fetchData()
    },

    methods: {
        async questionTwo() {
            const portraitIds = await SverigesRiksdag.getIntressentIDs()            
            return portraitIds
        },

        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        },

        async fetchData() {
            const portraitIds = await this.questionTwo();
            const allPortraits = await Promise.all(
                portraitIds.map(async (id) => {
                    const portrait = await SverigesRiksdag.getPortraitById(id);
                    const isMinister = await this.isMinister(id); // Check if the portrait is of a minister
                    return { id, portrait, isMinister };
                })
            );

            // Ensure at least one portrait is a minister
            const ministers = allPortraits.filter((p) => p.isMinister);
            const nonMinisters = allPortraits.filter((p) => !p.isMinister);

            let selectedPortraits = [];

            if (ministers.length > 0) {
                // Add a random minister
                const randomMinister = ministers[Math.floor(Math.random() * ministers.length)];
                selectedPortraits.push(randomMinister);

                // Select 3 random non-ministers to make a total of 4 portraits
                while (selectedPortraits.length < 4 && nonMinisters.length > 0) {
                    const randomIndex = Math.floor(Math.random() * nonMinisters.length);
                    selectedPortraits.push(nonMinisters.splice(randomIndex, 1)[0]);
                }
            } else {
                // If no ministers, choose any 4 portraits
                selectedPortraits = allPortraits.slice(0, 4);
            }

            this.portraits = selectedPortraits; // Store the selected portraits
        },
    },

    template:
        `<div class="quiz-question">
            <ul>
                <li v-for="port in portraits" :key="port.id">
                    <img :src="port.portrait" :alt="port.id"/>
                </li>
            </ul>
        </div>`
}
