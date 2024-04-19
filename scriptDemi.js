async function getPersonList() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?utformat=json&sort=parti")
    if (resp.ok) {
        const json = await resp.json();

        return json.personlista.person
    }
    throw Error("Error fetching data")
}

function getNamesAndParties(persons) {
    let namesAndParties = []
    for (let person of persons) {
        namesAndParties.push({
            name: `${person.tilltalsnamn} ${person.efternamn}`,
            party: person.parti,
            portrait: person.bild_url_80,
            year: person.fodd_ar
        })
    }
    return namesAndParties
}


// getPersonList()
//     .then(personList => {
//         const namesAndParties = getNamesAndParties(personList)

//         for (let person of namesAndParties) {
//             console.log(`Namn: ${person.name} \nParti: ${person.party}`)
//         }
//     })
//     .catch(error => console.log(error))


Vue.createApp({
    data() {
        return {
            persons: undefined
        }
    },
    mounted() {
        getPersonList()
            .then(personList => {
                this.persons = getNamesAndParties(personList)
            })
            .catch(error => {
                console.log(error)})
    }
})
    .mount('#app')