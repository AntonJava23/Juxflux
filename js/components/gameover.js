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

        homeImage(){
            window.location.href = "StartmenyVue.html";
        }
    },
    template: `
    <div id="app">
       <h1>Game Over</h1>
      <p id="point-store"></p>
<<<<<<< HEAD
      <p id="points"> {{store.score}} </p>
      <img @click="homeImage" id="homeImage" src="images/riksdagen.png">
=======

    <img id="firework" src="images/Fireworks.png">
      <p> {{store.score}} </p>
      <img @click="homeImage" id="homeImage" src="images/riksdagenBig.png">
>>>>>>> 611d2f5b7f1bb9a86a349bbc843acae659b10155
      <span> Hem </span>
      <button @click="redirect" id="restart-button">Spela Igen</button>
    </div>`
}