import riksdagen from '../util/riksdagen.js'
import shuffle from '../util/shuffle.js'

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
            isPortraitSelected: false
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
            // you must first select portrait and then a name
            if (this.isPortraitSelected === false) {
                this.selectedPortrait = evt.target.id
                console.log(this.selectedPortrait)

                //selected portrait gets a border 
                document.getElementById(evt.target.id).style.border = '4px solid green'
                this.isPortraitSelected = true
            }
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
                    this.showCorrect = true
                    this.showIncorrect = false
                }
                else {
                    this.showCorrect = false
                    this.showIncorrect = true
                    this.incorrect++
                }

                //showing final results
                if (this.correct + this.incorrect === 4) {
                    this.showResults = true
                }

                console.log(this.correct + " correct " + this.incorrect + " incorrect")
                document.getElementById(this.selectedPortrait).style.border = ''
                this.isPortraitSelected = false 
            }
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
                        <img v-for="member of members" :src="member.portrait" :id="member.id" alt="member of parliament" class="member-portrait" 
                            @click="selectMemberPortrait">
                    </div>
                    <div class="member-names">                          <!-- adding N in id because element id must be unique -->
                        <h2 v-for="member of memberNames" class="member-name" @click="selectMemberName" :id="member.id+\'N\'">{{ member.name }}</h2>
                    </div>

                    <input type="button" @click="refreshMembers" value="Refresh">
                    <h1 v-show="showCorrect"> RÄTT! </h1>
                    <h1 v-show="showIncorrect"> FEL! </h1>
                    <p v-show="showResults">{{ correct }} rätta och {{ incorrect }} fel svar</p> 
                </div>`
}