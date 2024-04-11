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
                const portrait = await getPortrait();
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

async function getPortrait() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?f_ar=1990&parti=S&utformat=json")
    if(resp.ok) {
        const data = await resp.json();
        const portrait = data.personlista.person.bild_url_192;
        return portrait;
    }
}






Vue.createApp(app).mount("#app")