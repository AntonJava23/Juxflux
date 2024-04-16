const app = {
    data() {
        return {
            missionCount: 0,
            portrait: 0,
            fullName: 0,
            age: ""
        }
    },
    methods: {
        async fetchData() {
            try {
                const count = await getMissionCount("0598053101129");
                this.missionCount = count;
                const portrait = await getPortraitById("0598053101129");
                this.portrait = portrait;
                const fullName = await getName();
                this.fullName = fullName;
                const age = await getAge();
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
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${intressent_id}&f_ar=1990&parti=S&utformat=json`);
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
    const resp = await fetch();
    if (resp.ok) {
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
        }
    }
    throw Error("No portrait found for the given ID");
}

async function getName() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=kvinna&parti=S&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=")
    if (resp.ok) {
        const data = await resp.json();
        if (data.personlista && data.personlista.person && data.personlista.person.length > 0) {
            const firstName = data.personlista.person[0].tilltalsnamn;
            const lastName = data.personlista.person[0].efternamn;
            const fullName = firstName + " " + lastName;
            return fullName;
        }
        return null;
    }
}

async function getAge() {
    const resp = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=kvinna&parti=S&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=");
    if (resp.ok) {
        const data = await resp.json();
        if(data.personlista && data.personlista.person && data.personlista.person.length > 0){
            // const firstPerson = data.personlista.person[0];
        
        const birthYear = data.personlista.person[0].fodd_ar;
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        const age = currentYear - birthYear;
        return age + "år";
        }
        else{
            return null;
        }
    }
    else{
        console.error("Error getting the current age", error);
    }
}

Vue.createApp(app).mount("#app")