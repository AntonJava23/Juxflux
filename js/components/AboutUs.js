export default {

    data() {
        return {
            homeButtonImage: "../../images/riksdagen.png",
        }
    },

    methods: {     
        homeButton() {
            window.location.href = "StartmenyVue.html";
        },

    },

    template: `
    <div>
        <button @click="homeButton" class="image-button">
            <img :src="homeButtonImage" alt="Bild på riksdagen" id="riksdagen">
            <span class="button-text">Hem</span>
        </button>
        <div class="about-container">
            <h1>Om Oss</h1>
            <p>
                Vi som skapat Riksdagquizet <br> studerar på Yrgo
                och har använt <br> oss utav Riksdagens öppna api <br>
                för att trolla fram frågor och svar <br> till vårt 
                supersmarta quiz med 3 <br> olika frågetyper!<br> 
            </p>
            <h2>Vårt Team</h2>
            <p>
                Java: Anton Bringner, 
                Demi Kull <br> Therese Frimanson, Gurjot Kaur Dhillon                
                <br><br>

                UX: John Hamrin, Felix Björelid,<br>
                Jennyfer Sandler & Fannie Lund.<br>
            </p>
        </div>
    </div>`
}