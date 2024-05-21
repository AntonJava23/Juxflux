import Quiz from './components/quiz.js'
import infoHeader from "./components/InfoHeader.js"

Vue.createApp({}).component('quiz', Quiz).component('info-header', infoHeader).mount('#app')

