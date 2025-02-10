<template>
    <div class="provider-search-container">
        <h1 class="title">Provider Search</h1>
        <v-card class="provider-search">
            <v-card-text>
                <v-btn-toggle v-model="tab" class="tabs" dense rounded>
                    <v-btn value="plan">Search by Plan</v-btn>
                    <v-btn value="name">Search by Name</v-btn>
                </v-btn-toggle>

                <v-window v-model="tab">
                    <v-window-item value="plan" class="tab-content">
                        <v-select width="300px" label="Choose Plan" :items="plans.map(plan => plan.plan)"
                            v-model="selectedPlan" class="input-field"></v-select>
                        <v-btn @click="searchByPlan" class="search-btn">Search</v-btn>
                    </v-window-item>

                    <v-window-item value="name" class="tab-content">
                        <v-text-field width="600px" label="Enter Name" v-model="name"
                            class="input-field"></v-text-field>
                        <v-date-input width="600px" label="Enter Date of Birth" v-model="dob"
                            class="input-field"></v-date-input>
                        <v-btn @click="searchByName" class="search-btn">Search</v-btn>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import logPageVisit from '@/composables/page_visit';

export default {
    data() {
        return {
            tab: 'plan',
            selectedPlan: null,
            name: null,
            dob: null,
            plans: [
                { plan: 'Aetna', link: 'https://www.aetna.com/individuals-families/find-a-doctor.html' },
                { plan: 'Anthem Blue Cross Blue Shield', link: 'https://shop.anthem.com/medicare/standalonetools/find-doctor?brand=ABCBS' },
                { plan: 'Blue Shield of California', link: 'https://www.blueshieldca.com/find-a-doctor' },
                { plan: 'Cigna', link: 'https://hcpdirectory.cigna.com/web/public/consumer/directory/search' },
                { plan: 'Humana', link: 'https://www.humana.com/' },
                { plan: 'UnitedHealthcare', link: 'https://www.uhc.com/communityplan/find-a-provider' },
            ],
            page_visit_data: logPageVisit(),
        };
    },
    methods: {
        searchByPlan() {
            if (!this.selectedPlan) {
                alert('Please select a plan.');
                return;
            }
            const selected = this.plans.find(plan => plan.plan === this.selectedPlan);
            if (selected) {
                window.open(selected.link, '_blank');
            } else {
                alert('Invalid plan selected.');
            }
        },
        searchByName() {
            if (!this.name || !this.dob) {
                alert('Please enter a name and date of birth.');
                return;
            }
            window.open('https://www.blueshieldca.com/find-a-doctor', '_blank', 'noopener,noreferrer');
        },
    },
};
</script>

<style scoped>
.provider-search-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    text-align: center;
    color: #1976d2;
    font-size: 2rem;
    margin-bottom: 20px;
}

.tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.tab-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.input-field {
    width: 100%;
    max-width: 500px;
}

.search-btn {
    background-color: #1976d2;
    color: white;
}
</style>
