import riksdagen from '../util/riksdagen.js'

export default {
    data() {
        return {
            allMembers: [],
            members: [],
            isNameVisible: false
        }
    },
    methods: {
        refreshMembers() {

        },
        showName(evt) {
            this.isNameVisible = true;
        }
    },
    created() {
        riksdagen.getPersonList()
            .then(personList => {
                this.allMembers = riksdagen.getNamesAndParties(personList)
            })
            .then(() => {
                for (let i = 0; i < 4; i++) {
                    this.members.push(this.allMembers[i])
                }
            })
            .catch(error => {
                console.log(error)
            })

    },
    template: `<div class="comp">
                    <div class="member-portraits">
                        <img v-for="member of members" :src="member.portrait" :id="member.id" alt="member of parliament" class="member-portrait">
                    </div>
                    <div class="member-names">
                        <h2 v-for="member of members" class="member-name">{{ member.name }}</h2>
                    </div>

                    <input type="button" @click="refreshMembers" value="Refresh">
                </div>`
}