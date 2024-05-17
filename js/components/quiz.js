import riksdagen from '../util/riksdagen.js'
import shuffle from '../util/shuffle.js'
import { store } from '../store/storeData.js'

export default {
    data() {
        return {
            allMembers: [],
            members: [],
            memberNames: [],
            selectedPortrait: 0,
            selectedName: 0,
            correct: 0,
            incorrect: 0,
            showResults: false,
            showCorrect: false,
            showIncorrect: false,
            isPortraitSelected: false,
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
            document.getElementById(evt.target.id).style.border = '4px solid green'

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
                    this.correct++
                    this.store.score++

                    for (const member of this.members) {
                        if (member.id === this.selectedPortrait) {
                            member.correctAnswer = true
                        }
                    }

                }
                else {
                    this.incorrect++
                    this.store.health--
                    
                }

                console.log(this.correct + " correct " + this.incorrect + " incorrect")
                document.getElementById(this.selectedPortrait).style.border = ''
                this.isPortraitSelected = false
                this.handleSessionStorage()
            }
        },
        handleSessionStorage() {
            // saving stats in browser tab
            sessionStorage.setItem("health", store.health.toString())
            sessionStorage.setItem("score", store.score.toString())
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

    },
    template: `<div class="comp">
                    <h1> Markera en bild och sedan namnet du tror den tillhör </h1>
                    <div class="member-portraits">
                        <div v-for="member of members"> 
                            <img :src="member.portrait" :id="member.id" alt="member of parliament" class="member-portrait" 
                            @click="selectMemberPortrait">
                            <h2 v-show="member.correctAnswer"> {{ member.name }} </h2>
                        </div>
                    </div>
                    <div class="member-names">                          <!-- adding N in id because element id must be unique -->
                        <h2 v-for="member of memberNames" class="member-name" @click="selectMemberName" :id="member.id+\'N\'"> {{ member.name }} </h2>
                    </div>

                    <input type="button" @click="refreshMembers" value="Refresh">
                    <input type="button" @click="this.store.health = 3" value="Reset health">
                    <input type="button" @click="this.store.score = 0" value="Reset score">
                </div>`
}


// lös så att namnet försvinner där nere när man svarat rätt