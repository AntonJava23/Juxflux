const app = {
    data() {
        return {
            missionCount: 0,
            currentMission: null,
        }
    },
    methods: {
        async fetchMissionCount() {
            try {
                const count = await getMissionCount();
                this.missionCount = count;
            } catch (error) {
                console.error("Error fetching mission count:", error);
            }
        }
    },
    mounted() {
        this.fetchMissionCount();
    }
}

async function getMissionCount() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=1990&kn=&parti=S&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=");
    if(resp.ok) {
        const data = await resp.json();
        const missionCount = data.personlista.person.personuppdrag.uppdrag.length;
        return missionCount;        
    } else {
        throw new Error("Network resp was not ok.")
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




Vue.createApp(app).mount("#app")