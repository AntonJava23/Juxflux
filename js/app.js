const app = {
    data() {
        return {
            currentMissions: [],
            portrait: 0,
            fullName: "",
            status: "",
            intressentIDs: [],
            idCount: ""
        }
    },
    methods: {
        async fetchData() {
            try {             
                const currentMissions = await getCurrentMissions("0222691314314");
                this.currentMissions = currentMissions;

                const portrait = await getPortraitById("0222691314314");
                this.portrait = portrait;

                const intressentIDs = await getIntressentIDs();
                this.intressentIDs = intressentIDs;
                const idCount = intressentIDs.length
                this.idCount = idCount

                const fullName = await getName("0222691314314");
                this.fullName = fullName;

                const status = await getStatus("0222691314314");
                this.status = status;


            } catch (error) {
                console.error("Error fetching mission count:", error);
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}

async function getCurrentMissions(intressent_id) {
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
}

async function getIntressentIDs() {
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
}

async function isMinister(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`)
    if (resp.ok) {
        const data = await resp.json()
        const minister = data.personlista.person.status
        if (minister.contains("minister")) {
            return true
        }

    }
}

async function getPortraitById(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
    if (resp.ok) {
        const data = await resp.json();
        const person = data.personlista.person
        if (person) {
            return person.bild_url_192;
        }
    }
    throw Error("No portrait found for the given ID");
}

async function getName(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`)
    const data = await resp.json();
    if (resp.ok && data.personlista && data.personlista.person) {
        return `${data.personlista.person.tilltalsnamn} ${data.personlista.person.efternamn}`;
    }
}

async function getStatus(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
    const data = await resp.json();
    if (resp.ok && data.personlista && data.personlista.person) {

        return `${data.personlista.person.status}`;
    }
    else {
        console.error("Error getting the current status", error);
    }
}

async function questionTwo() {
    const choices = [];
    const portrait = "";
    const name = "";
    const randomIDs = this.intressentIDs.sort(() => Math.random() - 0.5);
    if (this.intressentIDs.length >= 4) {
        for (let i = 0; i < 4; i++) {
            choices.push(randomIDs[i]);
        }
    }
    console.log("Chosen ids: ", choices)

    choices.forEach(id => {
        let portrait = getPortraitById(id);
            let name = getName(id)
    });
}

const vueApp = Vue.createApp(app)



vueApp.mount("#app")