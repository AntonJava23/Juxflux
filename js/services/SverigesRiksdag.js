export default {
    baseUrl: "",
    commissioners: [],

    async getData() {
        if (this.commissioners.length > 0) {
            return this.commissioners
        }

        const resp = await fetch(`https://data.riksdagen.se/personlista/?rdlstatus=tjanst&utformat=json`)
        if (resp.ok) {
            const data = await resp.json();
            data.personlista.person.forEach(item => {
                if (item?.bild_url_192 === "https://data.riksdagen.se/filarkiv/bilder/ledamot/1c96b775-a474-49d4-a829-e841280de062_192.jpg") {
                    return
                }

                this.commissioners.push({
                    id: item?.intressent_id,
                    image: item?.bild_url_192,
                    firstName: item?.tilltalsnamn,
                    lastName: item?.efternamn,
                    party: item?.parti,
                    status: item?.status,
                    // and more relevant properties
                })
            });
            return this.commissioners
        }
        else {
            throw Error("No ids found");
        }
    },

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

    async isMinister(commissioner) {
        if (commissioner && commissioner.status) {
            return commissioner.status.includes("minister")
        }
        return false; // If no matching commissioner or no status, return false
    },

    async getPortraitById(commissioner) {       
        // If found, return the portrait URL
        if (commissioner && commissioner.image) {
            return commissioner.image;
        }
        // If not found, throw an error indicating that no portrait exists for this ID
        throw new Error("No portrait found for the given ID");
    },

    async getFourPortraits(commissioners) {
        // Divide IDs into two categories: non-ministers (leda) and ministers (mini)        
        const leda = [];
        const mini = [];

        for (const comm of commissioners) {
            const isMin = await this.isMinister(comm);
            if (isMin) {
                mini.push(comm);
            } else {
                leda.push(comm);
            }
        }        

        // Get random indices from each category
        const leda_idx = this.getRandomIndices(leda.length, 3)
        console.log("3st ledamöt index", leda_idx);
        const mini_idx = this.getRandomIndices(mini.length, 1)
        console.log("1 minister index", mini_idx);

        // Get portraits based on the random indices
        const portraits = []

        for (const idx of leda_idx) {
            const portrait = await this.getPortraitById(leda[idx])
            if (portrait) {
                portraits.push(portrait)
            }
        }

        for (const idx of mini_idx) {
            const portrait = await this.getPortraitById(mini[idx]);
            if (portrait) {
                portraits.push(portrait);
            }
        }
        return portraits

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
    },

    // A helper function to get a random index
    getRandomIndices(totalCount, desiredCount) {
        const indices = [];
        while (indices.length < desiredCount) {
            const randomIndex = Math.floor(Math.random() * totalCount);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        return indices;
    }
}
