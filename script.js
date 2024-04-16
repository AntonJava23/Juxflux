const app = {
    data() {
        return {
            missionCount: 0,
            portrait: 0,
        }
    },
    methods: {
        async fetchData() {
            try {
                const missionCount = await getMissionCount("0598053101129");
                this.missionCount = missionCount;
                const portrait = await getPortraitById("0598053101129");
                this.portrait = portrait;
            } catch (error) {
                console.error("Error fetching mission count:", error);
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}

async function getMissionCount(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
    if (resp.ok) {
        const data = await resp.json();
        const missionCount = data.personlista.person.personuppdrag.uppdrag.length;
        if (missionCount) {
            return missionCount;
        }
    }
    throw Error("No mission count found for the given ID")
}

async function getCurrentMission() {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
    if (resp.ok) {
        const data = await resp.json();
        const currentMission = data.personlista.person.personuppdrag.uppdrag
        if (data.currentMission) {
            return currentMission
        }
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
Vue.createApp(app).mount("#app")