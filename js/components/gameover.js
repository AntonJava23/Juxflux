import { store } from "../store/StoreData.js";

export default{
    data() {
        return {
            store
        }
    },

    created() {
        this.store.score = sessionStorage.getItem('score')
    },
    methods: {
        redirect(){
            store.score = 0
            store.health = 3
            sessionStorage.setItem('score', store.score)
            sessionStorage.setItem('health', store.health)
            window.location.href = "index-branch2.html"
        },
        redirectHome(){
            store.score = 0
            store.health = 3
            sessionStorage.setItem('score', store.score)
            sessionStorage.setItem('health', store.health)
            window.location.href = "index.html"
        },

        homeImage(){
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
        }
    },
    template: `
    <div id="comp">
       <h1>Game Over</h1>
      <p id="point-store"></p>
      <p id="point"> {{store.score}} p </p>
      <img @click="homeImage" id="homeImage" src="images/riksdagenBig.png">
      <div class="buttons"> 
        <button @click="redirect" id="restart-button">Spela Igen &#x21BB</button>
        <button @click="redirectHome" id="home-button">Tillbaka till hem</button>
      </div>
    </div>`
}