import { store } from "../store/StoreData.js";
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
            lives: 3,
            whichParties: [],
            fullPartyNames: { //All the alternatives for parties.
                'V': 'Vänsterpartiet',
                'SD': 'Sverigedemokraterna',
                'MP': 'Miljöpartiet',
                'KD': 'Kristdemokraterna'
            },

            //All the logos for the parties.
            kdLogo: "images/kd/kd_image.png",
            mpLogo: "images/mp/mp_image.png",
            sdLogo: "images/sd/sd_image.png",
            vLogo: "images/v/v_image.png",

            partyColors: { //All the colors decided for the parties.
                'SD': '#f2a001', // gul
                'V': '#ae6e3d',  // brun
                'KD': '#976dd0', // lila
                'MP': '#05a6ff', // blå
            },
            crownLives: "images/enKrona.png",
            riksdagen: "images/riksdagen.png"
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
                // this.partyMembers = ['V', 'SD'];
            } else {
                this.whichParties = ['MP', 'KD'];
                // this.partyMembers = ['MP', 'KD'];
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
         * This method ads the logos of the relevant parties.
         * @param {*} party 
         * @returns 
         */
        getPartyLogo(party) {
            switch (party) {
                case 'V':
                    return this.vLogo;
                case 'SD':
                    return this.sdLogo;
                case 'MP':
                    return this.mpLogo;
                case 'KD':
                    return this.kdLogo;
            }
        },
        getThreeCrowns() {
            return this.crownLives;
        },

        getRiksdagen() {
            return this.riksdagen;
        },

        homeButton() {
            window.location.href = "index.html";
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
            this.correctAnswer = this.fullName;
            //this.correctAnswer = correct ? `Rätt! ${this.fullName}<br>tillhör ${fullPartyName}.` : `Fel! ${this.fullName} tillhör<br>inte ${fullPartyName}.`;
        },
        getButtonColor(party) {
            if (this.selectedParty) {
                if (party === this.fullPartyName) {
                    return '#93bd5d'
                }
                else {
                    return '#a2a2a2'
                }
            }
            return this.partyColors[party];
        }
    },
    template: ` 
    <div class="Questionthree">

        <div id="questionPart3">
            Vilket parti tillhör <br>personen på bilden?
            
            <img :src="portrait" alt="Bild på ledamot"><br>
            <div id="correctAnswer" v-html="correctAnswer"></div>
            
            <button class="buttons-question-3" 
                    v-for="party in whichParties" 
                    :key="party" 
                    @click="checkAnswer(party)" 
                    :style="{ backgroundColor: getButtonColor(party) }">
            <img :src="getPartyLogo(party)" alt="Partiloggan för {{ fullPartyNames[party]}}" class="party-logo">
            {{ fullPartyNames[party] }}
            </button>
            
                <div v-show="correctAnswer">
                <a href="index-branch4.html" class ="next-question">Nästa fråga &rarr;</a>
                </div>
            </div>
    </div>`
}
