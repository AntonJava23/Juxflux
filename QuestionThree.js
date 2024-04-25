const app = {
    data() {
        return {
            portrait: null,
            fullName: "",
            party: "",
            memberDataLoaded: false,
        };
    },
    methods: {
        async fetchData() {
            try {
                const members = await this.fetchMembers();
                const filteredMembers = this.filterMembersByParty(members, ['V', 'SD']);
                this.selectRandomMember(filteredMembers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async fetchMembers() {
            const response = await fetch(`https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`);
            if (!response.ok) throw new Error('Failed to fetch members');
            const data = await response.json();
            return data.personlista.person;
        },
        filterMembersByParty(members, parties) {
            return members.filter(member => parties.includes(member.parti));
        },
        selectRandomMember(members) {
            if (members.length === 0) {
                throw new Error('No members found for the given parties');
            }
            const randomIndex = Math.floor(Math.random() * members.length);
            const member = members[randomIndex];
            this.portrait = member.bild_url_192;
            this.fullName = `${member.tilltalsnamn} ${member.efternamn}`;
            this.party = member.parti;
            this.memberDataLoaded = true;
        },
        checkAnswer(selectedParty) {
            if (!this.memberDataLoaded) {
                alert('No member data loaded');
                return;
            }
            const correct = selectedParty.toLowerCase() === this.party.toLowerCase();
            alert(correct ? `Rätt! ${this.fullName} tillhör ${this.party}.`: `Fel! ${this.fullName} tillhör ${this.party}.`);
        }
    },

    mounted() {
        this.fetchData();
    }
}

Vue.createApp(app).mount("#app");
