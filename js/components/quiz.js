import riksdagen from '../util/riksdagen.js'
import shuffle from '../util/shuffle.js'
import { store } from '../store/StoreData.js'

export default {
    data() {
        return {
            allMembers: [],
            members: [],
            memberNames: [],
            selectedPortrait: 0,
            selectedName: 0,
            isPortraitSelected: false,
            incorrectAnswer: false,
            store
        }
    },
    methods: {
        refreshMembers() {
            //resetting values to restart the game 
            this.showResults = false
            this.showCorrect = false
            this.showIncorrect = false
            this.correct = this.incorrect = 0

            this.members = []
            shuffle.shuffle(this.allMembers)
            for (let i = 0; i < 4; i++) {
                this.members.push(this.allMembers[i])
            }
            this.memberNames = [...this.members] //make an independent copy of the members-array
            shuffle.shuffle(this.memberNames)

        },
        selectMemberPortrait(evt) {

            this.selectedPortrait = evt.target.id
            console.log(this.selectedPortrait)

            //clear previous borders
            for (const portrait of document.getElementsByClassName('member-portrait')) {
                portrait.style.border = ''
            }
            //selected portrait gets a border 
            document.getElementById(evt.target.id).style.border = '4px solid rgb(218, 140, 102)'

            this.isPortraitSelected = true

        },
        selectMemberName(evt) {
            // you must first select portrait and then a name
            if (this.isPortraitSelected === true) {
                // removing the letter N that was used to make html element IDs unique
                this.selectedName = evt.target.id.replace('N', '')
                console.log(this.selectedName)

                // checking to see if correct answer or not
                if (this.selectedName === this.selectedPortrait) {
                    this.store.score++
                    this.incorrectAnswer = false

                    for (const member of this.members) {
                        if (member.id === this.selectedPortrait) {
                            member.correctAnswer = true
                        }
                    }

                }
                else {
                    this.store.health--
                    this.incorrectAnswer = true
                }

                console.log(this.correct + " correct " + this.incorrect + " incorrect")
                document.getElementById(this.selectedPortrait).style.border = ''
                this.isPortraitSelected = false
                this.handleSessionStorage()
            }
        },
        handleSessionStorage() {
            // saving stats in browser tab
            sessionStorage.setItem("health", this.store.health.toString())
            sessionStorage.setItem("score", this.store.score.toString())
            console.log('saving to session storage')
        }
    },
    created() {
        riksdagen.getPersonList()
            .then(personList => {
                this.allMembers = riksdagen.getNamesAndParties(personList)
                shuffle.shuffle(this.allMembers)
            })
            .then(() => {
                for (let i = 0; i < 4; i++) {
                    this.members.push(this.allMembers[i])
                }
                this.memberNames = [...this.members] //make an independent copy of the members array
                shuffle.shuffle(this.memberNames)
            })
            .catch(error => {
                console.log(error)
            })

        // const jsonData = JSON.parse(sessionStorage.getItem('questionFourStorage'))

        // this.allMembers = riksdagen.getNamesAndParties(jsonData)
        // shuffle.shuffle(this.allMembers)
        // for (let i = 0; i < 4; i++) {
        //     this.members.push(this.allMembers[i])
        // }
        // this.memberNames = [...this.members] //make an independent copy of the members array
        // shuffle.shuffle(this.memberNames)

    },
    template: `<div class="comp">
                    <h1> Vem är vem? <br>Para ihop namn och bild </h1>
                    <div class="member-portraits">
                        <div v-for="member of members"> 
                            <img :src="member.portrait" :id="member.id" alt="member of parliament" class="member-portrait" 
                            @click="selectMemberPortrait"> 
                            <h2 v-show="member.correctAnswer" class="correct-name"> {{ member.name }}  </h2>
                        </div>
                    </div>
                    <img src="../../images/incorrect.png" v-show="incorrectAnswer" id="incorrect">
                    <div class="member-names">                          <!-- adding N in id because element id must be unique -->
                        <h2 v-for="member of memberNames" class="member-name" @click="selectMemberName" :id="member.id+\'N\'"> {{ member.name }} </h2>
                    </div>

                    <input type="button" @click="refreshMembers" value="Refresh">
                    <input type="button" @click="this.store.health = 3; handleSessionStorage()" value="Reset health">
                    <input type="button" @click="this.store.score = 0; handleSessionStorage()" value="Reset score"> 
                </div>`
}


// lös så att namnet försvinner där nere när man svarat rätt