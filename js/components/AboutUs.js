


export default {

    data() {
        return {
            homeButtonImage: "../../images/riksdagen.png",
        }
    },

    methods: {
        redirect() {
            window.location.href = "index-branch2.html"
        },

        homeButton() {
            window.location.href = "StartmenyVue.html";
        },

    },

    template: `
    <div class="about-container">
        <button @click="homeButton" class="image-button">
            <img :src="homeButtonImage" alt="Bild på riksdagen" id="riksdagen">
            <span>Hem</span>
            </button>
        <h1>Om Oss</h1>
            <p>
                Vi som skapat Riksdagquizet studerar på Yrgo<br>
                och har använt oss utav Riksdagens öppna data<br> 
                för att trolla fram frågor och svar till vårt<br> 
                supersmarta quiz med fyra olika frågetyper!<br> 
            </p>
    
        <h2>Vårt Team</h2>
        <p>
            Java: Anton Bringner, Demi Kull,<br> 
            Therese Frimanson, Gurjot Kaur Dhillon,<br>
            <br>
            UX: John Hamrin, Felix Björelid,<br>
            Jennyfer Sandler och Fannie Lund.<br>
        </p>
    </div>`
}