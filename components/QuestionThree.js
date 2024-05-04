export default {
    name: "QuestionThree",
    props: {
        portrait: Object
    },
    data() {
        return {
            portrait: null,
            fullName: "",
            party: "",
            memberDataLoaded: false,
            correctAnswer: "",
            whichParties: [],
            fullPartyNames: {
                'V': 'Vänsterpartiet',
                'SD': 'Sverigedemokraterna',
                'MP': 'Miljöpartiet',
                'KD': 'Kristdemokraterna'
            }
        }
    },

    mounted() {
        this.randomParties();
        this.fetchData();
    },

    methods: {
        /**
         * This 'randomParties()' method desides if the question will be about V and SD och MP and KD. 
         * Before collecting data.
         */
        randomParties() {
            const randNum = Math.floor(Math.random() * 2); // Ger 0 eller 1
            if (randNum === 0) {
                this.whichParties = ['V', 'SD'];
            } else {
                this.whichParties = ['MP', 'KD'];
            }
        },

        /**
         *This 'fetchData()' together with 'fetchMembers()' and 'filterMembersByParty' collects the 
         * data from the API and filter them out to only include members of the 'V' party or 'SD' party
         * and puts it in a list.
         */
        async fetchData() {
            try {
                const members = await this.fetchMembers();
                const filteredMembers = this.filterMembersByParty(members, this.whichParties);
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

        /**
         * This gives us a random member from the list we created in the methods above.
         * @param {*} members is the list of members within the 'V' or 'SD' party.
        */
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
        /**
         * Here we check the answer.
         * @param {*} selectedParty 
         * @returns if no member data was loaded.
         * Sends the answer to the user if its correct or wrong. 
        */
        checkAnswer(selectedParty) {
            if (!this.memberDataLoaded) {
                alert('No member data loaded');
                return;
            }
            const correct = selectedParty.toLowerCase() === this.party.toLowerCase();
            const fullPartyName = this.fullPartyNames[selectedParty.toUpperCase()];
            this.correctAnswer = correct ? `Rätt! ${this.fullName} tillhör ${fullPartyName}.` : `Fel! ${this.fullName} tillhör inte ${fullPartyName}.`;
        }
    },
    template: ` 
    <div class="Questionthree">
    <p>
        Fråga 3:
    </p>
    Vilket parti tillhör personen på bilden?<br>
    <br><img :src="portrait" alt="Bild på ledamot"><br>

    <button class="buttons-question-3" v-for="party in whichParties" :key="party" @click="checkAnswer(party)">
            {{ fullPartyNames[party] }}</button>

    <div id="correctAnswer">
        {{correctAnswer}}<br>

        <a href="index4.html">Nästa fråga</a>

    </div>
    </div>`
}
