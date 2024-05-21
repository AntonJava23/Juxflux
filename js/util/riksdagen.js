export default {
    async getPersonList() {
        const resp = await fetch("https://data.riksdagen.se/personlista/?utformat=json&sort=parti")
        if (resp.ok) {
            const json = await resp.json();

            return json.personlista.person
        }
        throw Error("Error fetching data")
    },

    getNamesAndParties(persons) {
        let namesAndParties = []
        for (let person of persons) {
            namesAndParties.push({
                name: `${person.tilltalsnamn} ${person.efternamn}`,
                party: person.parti,
                portrait: person.bild_url_192,
                year: person.fodd_ar,
                id: person.intressent_id,
                correctAnswer: false
            })
        }
        return namesAndParties
    }
}



