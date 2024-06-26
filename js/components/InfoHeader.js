import { store } from "../store/StoreData.js";

export default {
    name: "InfoHeader",

    data() {
        return {
            homeButtonImage: "../../images/riksdagen.png",
            store
        }
    },

    computed: {
        lives() {
            if (this.store.health < 1) {
                window.location.href = "GameOver.html"
            }
            const health = this.store.health;

            switch (health) {
                case 3:
                    return '../../images/threeCrowns.png';
                case 2:
                    return '../../images/twoCrowns.png';
                case 1:
                    return '../../images/oneCrown.png';
                default:
                    return ''; // Handle case where health is 0 or invalid
            }

            
        }
    },

    mounted() {
        this.store.health = Number(sessionStorage.getItem("health"))
        this.store.score = Number(sessionStorage.getItem("score"))
    },

    methods: {
        homeButton() {
            window.location.href = "index.html";
        },


    },

    template: `
    <div class="header">
        <img :src="lives" alt="Tre kronor">
            <div class="score-container">
                <span>Poäng:</span>
                <span class="score">{{ store.score }}</span>
            </div>
        <button @click="homeButton" class="image-button">
            <img :src="homeButtonImage" alt="Bild på riksdagen" id="riksdagen">
            <span>Hem</span>
        </button>
    </div>`
}