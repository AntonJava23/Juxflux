const app = {
    data() {
        return {
            missionCount: 0,
            currentMission: 0,
            age: 0,
            party: 0,
            name: 0,
            portrait: 0,
            beenMinister: false,
        }
    },
    methods: {
    }
}

async function getMissionCount() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.missionCount) {
            return data.missionCount
        }
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

async function getAge() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.age) {
            return data.age
        }
    }
}

async function getParty() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.party) {
            return data.party
        }
    }
}

async function getName() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.name) {
            return data.name
        }
    }
}

async function getPortrait() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.portrait) {
            return data.portrait
        }
    }
}

async function beenMinister() {
    const resp = await fetch();
    if(resp.ok) {
        const data = await resp.json();
        if (data.beenMinister) {
            return data.beenMinister
        }
    }
}



Vue.createApp(app).mount("#app")