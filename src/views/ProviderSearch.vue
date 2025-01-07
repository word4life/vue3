<template>
    <h1>Provider Search</h1>
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="one">Search by Plan</v-tab>
            <v-tab value="two">Search by Name</v-tab>
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">

                    <v-select width="300px" label="Choose Plan" :items="plans.map(plan => plan.plan)" v-model="selectedPlan"></v-select>
                    <v-btn @click="searchByPlan()">Search</v-btn>
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                    <v-text-field label="Enter Name" v-model="name"></v-text-field>
                    <v-text-field label="Enter Date of Birth" v-model="dob"></v-text-field>
                    <v-btn @click="searchByName()">Search</v-btn>

                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>

</template>

<script>
import { warn } from 'vue';

export default {
    data: () => ({
        tab: null,
        selectedPlan: null,
        name: null,
        dob: null,
        plans: [
            { plan: 'Aetna', plan_link: 'https://www.aetna.com/individuals-families/find-a-doctor.html' },
            { plan: 'Anthem Blue Cross Blue Shield', plan_link: 'https://shop.anthem.com/medicare/standalonetools/find-doctor?brand=ABCBS' },
            { plan: 'Cigna', plan_link: 'https://hcpdirectory.cigna.com/web/public/consumer/directory/search' },
            { plan: 'Humana', plan_link: 'https://www.humana.com/' },
            { plan: 'UnitedHealthcare', plan_link: 'https://www.uhc.com/communityplan/find-a-provider' },
        ]
    }
    ),
    methods: {
        searchByPlan() {
            if (!this.selectedPlan) {
                alert("Please select a plan.");
                return;
            }

            // Find the selected plan object
            const selected = this.plans.find(plan => plan.plan === this.selectedPlan);

            if (selected) {
                const param = selected.plan_link; // Populate param with the plan_link
                window.open(selected.plan_link, "_blank"); // Navigate to the plan's link
            } else {
                alert("Invalid plan selected.");
            }
        },
        searchByName() {
            if (!this.name || !this.dob) {
                alert("Please enter a name and date of birth.");
                return;
            }

            // Search by name and date of birth
            warn("Searching by name and date of birth is not yet implemented.");
        }
    }
}
</script>