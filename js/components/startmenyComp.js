import { store } from '../store/StoreData.js'
import imageCacher from '../services/imageCacher.js'

export default {
    created() {
        store.health = 3
        store.score = 0
        sessionStorage.setItem('health', store.health)
        sessionStorage.setItem('score', store.score)
    },
    methods: {
        redirect() {
            window.location.href = "index-branch2.html"
        }
    },
    template: `<div class="comp">
                    <a href="omOss.html" id="about-button">Om oss</a>
                    <h1>Quizdan</h1>
                    <img src="images/riksdagenBig.png">
  
                    <div id="start-text">
                        <p>Ett quiz för dig som vill lära dig<br>
                         mer om ledamöterna i den<br>
                        svenska riksdagen.<br>
                        </p>
                        <p>
                        Du har tre liv. Du förlorar ett liv <br>
                        när du svarar fel. Spelet<br>
                        fortsätter tills dess att du har<br>
                        svarat fel tre gånger och har slut <br>
                        på liv.
                        </p>
                        <p>
                            Lycka till!
                        </p>
                    </div>
                    <button id="start-button" @click="redirect" >
                        Spela &rarr;
                    </button>
                </div>`
}
