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
        }
    },
    template: `
    <div id="app">
       <h1>Game Over</h1>
      <p id="point-store">

    <img id="firework" src="images/Fireworks.png">
      <p> {{store.score}} </p>
      <img src="images/riksdagen.png">
      <button @click="redirect" id="restart-button">Spela Igen</button>
    </div>`
}