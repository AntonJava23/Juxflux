export default {
    baseUrl: "",

    async getCurrentMissions(intressent_id) {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
        if (resp.ok) {
            const data = await resp.json();
            const currentMissions = [];
            data.personlista.person.personuppdrag.uppdrag.forEach(item => {
                currentMissions.push(item.roll_kod)
            });
            return currentMissions;
        }
        throw Error("No missions found for given ID")
    },

    async getIntressentIDs() {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?utformat=json`)
        if (resp.ok) {
            const data = await resp.json();
            const intressentIDs = [];
            data.personlista.person.forEach(item => {
                intressentIDs.push(item.intressent_id)
            });
            return intressentIDs;
        }
        else {
            throw Error("No ids found");
        }
    },

    async isMinister(intressent_id) {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`)
        if (resp.ok) {
            const data = await resp.json()
            const minister = data.personlista.person.status
            if (!minister.contains("minister")) {
                return false
            }

        }
    },

    async getPortraitById(intressent_id) {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
        if (resp.ok) {
            const data = await resp.json();
            const person = data.personlista.person
            if (person) {
                return person.bild_url_192;
            }
        }
        throw Error("No portrait found for the given ID");
    },

    async getName(intressent_id) {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`)
        const data = await resp.json();
        if (resp.ok && data.personlista && data.personlista.person) {
            return `${data.personlista.person.tilltalsnamn} ${data.personlista.person.efternamn}`;
        }
    },

    async getStatus(intressent_id) {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
        const data = await resp.json();
        if (resp.ok && data.personlista && data.personlista.person) {

            return `${data.personlista.person.status}`;
        }
        else {
            console.error("Error getting the current status", error);
        }
    }
}