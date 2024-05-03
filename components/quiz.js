import riksdagen from '../util/riksdagen.js'

export default {
    data() {
        return {
            members: []
        }
    },
    methods: {
    },
    created() {
        riksdagen.getPersonList()
                .then(personList => {
                    this.members = riksdagen.getNamesAndParties(personList)
                })
                .catch(error => {
                    console.log(error)
                })
    },
    template: `<div>
                <img v-for="member of members" :src="member.img" :id="member.id">
                </div>`
}


// Vue.createApp({
//     data() {
//         return {
//             persons: undefined
//         }
//     },
//     mounted() {
//         getPersonList()
//             .then(personList => {
//                 this.persons = getNamesAndParties(personList)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
// })
//     .mount('#app')