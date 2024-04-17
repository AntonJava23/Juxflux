const app = {
    data() {
        return {
            missionCount: 0,
            currentMissions: [],
            portrait: 0,
            fullName: "",
            age: ""
        }
    },
    methods: {
        async fetchData() {
            try {
                const missionCount = await getMissionCount("0598053101129");
                this.missionCount = missionCount;

                const currentMissions = await getCurrentMission("0598053101129");
                this.currentMissions = currentMissions;

                const portrait = await getPortraitById("0598053101129");
                this.portrait = portrait;

                const fullName = await getName("0598053101129");
                this.fullName = fullName;
                
                const age = await getAge("0598053101129");
                this.age = age;

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

async function getCurrentMission(intressent_id) {
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

async function getAge(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&utformat=json`);
    const data = await resp.json();
    if (resp.ok && data.personlista && data.personlista.person) {
        let currentYear = new Date().getFullYear();
        return `${currentYear -data.personlista.person.fodd_ar}`;
    }
    else{
        console.error("Error getting the current age", error);
    }
}

Vue.createApp(app).mount("#app")