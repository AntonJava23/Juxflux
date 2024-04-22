const app = {
    data() {
        return {
            missionCount: 0,
            currentMissions: [],
            portrait: 0,
            fullName: "",
            status: ""
        }
    },
    methods: {
        async fetchData() {
            try {
                // const missionCount = await getMissionCount("0598053101129");
                // this.missionCount = missionCount;

                const currentMissions = await getCurrentMissions("0222691314314");
                this.currentMissions = currentMissions;

                const portrait = await getPortraitById("0222691314314");
                this.portrait = portrait;

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

//INTE LÄNGRE RELEVANT 
// async function getMissionCount(intressent_id) {
//     const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
//     if (resp.ok) {
//         const data = await resp.json();
//         const missionCount = data.personlista.person.personuppdrag.uppdrag.length;
//         if (missionCount) {
//             return missionCount;
//         }
//     }
//     throw Error("No mission count found for the given ID")
// }

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
    
}

Vue.createApp(app).mount("#app")