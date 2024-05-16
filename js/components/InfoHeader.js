export default {
    name: "InfoHeader",

    data() {
        return {
            homeButtonImage: "../../images/riksdagen.png",
            lives: "../../images/threeCrowns.png"
        }
    },

    methods: {
        homeButton() {
            window.location.href = "index.html";
        },
    },


    template: `
    <div class="header">
        <img :src="this.lives" alt="Riksdagens logga tre kronor" id="Lives">
            Poäng: 2
        <button @click="homeButton" class="image-button">
            <img :src="homeButtonImage" alt="Bild på riksdagen" id="riksdagen">
            <span>Hem</span>
        </button>
    </div>`
}