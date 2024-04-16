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
                const count = await getMissionCount();
                this.missionCount = count;
                const portrait = await getPortraitById(	"0598053101129");
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

async function getMissionCount() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?f_ar=1990&parti=S&utformat=json");
    if(resp.ok) {
        const data = await resp.json();
        const missionCount = data.personlista.person.personuppdrag.uppdrag.length;
        return missionCount;        
    } 
}

async function getCurrentMission() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.currentMission) {
            return data.currentMission
        }
    }
}

async function getPortraitById(intressent_id) {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&f_ar=1990&parti=S&utformat=json`);
    if (resp.ok) {
        const data = await resp.json();
        const person = data.personlista.person
        if (person) {
            return person.bild_url_192;
        } else {
            throw Error ("No portrait found for the given ID");
        }    
    }
}
Vue.createApp(app).mount("#app")