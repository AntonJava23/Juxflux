import { store } from "../store/storeData.js";

export default {
    name: "InfoHeader",

    data() {
        return {
            homeButtonImage: "../../images/riksdagen.png",
            // lives: "../../images/threeCrowns.png",
            store
        }
    },

    computed: {
        lives() {
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
    }
    ,mounted() {
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
        <img :src="lives" alt="Riksdagens logga tre kronor">
            Poäng: {{ store.score }}
        <button @click="homeButton" class="image-button">
            <img :src="homeButtonImage" alt="Bild på riksdagen" id="riksdagen">
            <span>Hem</span>
        </button>
    </div>`
}