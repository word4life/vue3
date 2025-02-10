<template>
    <v-container>
        <v-btn @click="callHumana" color="primary" class="mb-4">Humana Providers</v-btn>

        <v-row>
            <v-col v-for="entry in practitioners" :key="entry.resource.id" cols="12" md="6" lg="4">
                <v-card outlined class="no-wrap">
                    <v-card-title>
                        <span class="provider-name">{{ entry.resource.name?.[0]?.text || "Unknown Name" }}</span>
                    </v-card-title>
                    <!-- Chips below the name -->
                    <v-card-subtitle class="d-flex justify-start">
                        <v-chip class="phone-chip highlight-chip-in-network">In-Network</v-chip>
                        <v-chip class="phone-chip highlight-chip">Medicare PPO</v-chip>
                    </v-card-subtitle>
                    <!-- Gender directly below the name -->
                    <v-card-subtitle class="gender-info highlight-chip small-text">
                        {{ entry.resource.gender ? entry.resource.gender.charAt(0).toUpperCase() +
                            entry.resource.gender.slice(1) : "Not Specified" }}
                    </v-card-subtitle>
                    <v-card-subtitle class="highlight-chip small-text">
                        NPI: {{ entry.resource.identifier?.[0]?.value || "N/A" }}
                    </v-card-subtitle>
                    <v-card-text class="d-flex flex-column">
                        <div class="contact-info">
                            <div>
                                <strong><b>Phone</b></strong>
                                <v-chip-group>
                                    <v-chip v-for="telecom in entry.resource.telecom.filter(t => t.system === 'phone')"
                                        :key="telecom.value" class="phone-chip" color="primary">
                                        📞 {{ formatPhoneNumber(telecom.value) }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                            <div>
                                <strong><b>Fax</b></strong>
                                <v-chip-group>
                                    <v-chip v-for="telecom in entry.resource.telecom.filter(t => t.system === 'fax')"
                                        :key="telecom.value" class="fax-chip" color="secondary">
                                        📠 {{ formatPhoneNumber(telecom.value) }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>
                        <div>
                            <strong>Languages</strong>
                            <v-chip-group>
                                <v-chip v-for="language in entry.resource.communication?.[0]?.coding || []"
                                    :key="language.display" class="language-chip" color="success">
                                    {{ language.display }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                        <!-- Specialty as a chip -->
                        <div>
                            <strong>Specialty</strong>
                            <v-chip-group>
                                <v-chip class="specialty-chip" small>{{ getRandomSpecialty() }}</v-chip>
                            </v-chip-group>
                        </div>

                        <!-- Spacer to push status and last updated to the bottom -->
                        <v-spacer></v-spacer>

                        <div class="status-info">
                            <strong>Status</strong> {{ entry.resource.active ? "Active" : "Inactive" }}
                        </div>

                        <div class="last-updated-info">
                            <strong>Last Updated</strong> {{ formatDateTime(entry.resource.meta?.lastUpdated) ||
                                "Unknown" }}
                        </div>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>

        <v-alert v-if="error" type="error" prominent class="mt-4">
            {{ error }}
        </v-alert>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            results: {},
            practitioners: [],
            message: 'Click the button to call the API.',
            random_number: 0,
            items: [{
                number: 0,
            }],
            specialties: [
                "Cardiology", "Dermatology", "Endocrinology", "Family Medicine", "Internal Medicine", "Neurology",
                "Obstetrics/Gynecology", "Oncology", "Orthopedic Surgery", "Pediatrics", "Psychiatry",
                "Pulmonology", "Radiology", "Rheumatology", "Surgery"
            ]
        }
    },
    methods: {
        async callNPI() {
            console.warn('Calling API.');
            try {
                //const api_url = "http://localhost:3001/npi-api";
                const api_url = "https://vue3-nu-three.vercel.app/npi-api";
                const response = await fetch(api_url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const results = await response.json();
                this.results = results;
                this.message = results.message;
                this.random_number = results.random_number;
                this.items = results.data.results;

                console.warn('API called:', this.message);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
        async callHumana() {
            console.warn('Calling Humana API.');
            try {
                //const api_url = "http://localhost:3001/humana-provider-api";
                const api_url = "https://vue3-nu-three.vercel.app/humana-provider-api";
                const response = await fetch(api_url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const results = await response.json();
                this.results = results;
                this.practitioners = results.data.entry;
                this.message = results.message;
                this.random_number = results.random_number;
                this.items = results.data.entry;

                console.warn('API called:', this.message);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
        formatPhoneNumber(number) {
            if (!number) return "N/A";
            const cleaned = ('' + number).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            return match ? `(${match[1]}) ${match[2]}-${match[3]}` : number;
        },
        formatDateTime(dateString) {
            if (!dateString) return "Unknown";
            const options = {
                year: 'numeric',
                month: 'short',  // Abbreviates the month (e.g., Jan, Feb, Mar)
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            return new Date(dateString).toLocaleString(undefined, options);
        },
        getRandomSpecialty() {
            const randomIndex = Math.floor(Math.random() * this.specialties.length);
            return this.specialties[randomIndex];
        }
    }
}
</script>

<style>
.v-card {
    margin-bottom: 20px;
    border: 2px solid #1976D2;
    border-radius: 12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.v-card-title {
    font-weight: bold;
    font-size: 1.3rem;
    padding: 16px;
    background-color: #f1f1f1;
    border-radius: 12px 12px 0 0;
    color: #333;
}

.v-card-subtitle {
    font-size: 1rem;
    color: #555;
    padding: 8px 16px;
}

.v-card-text {
    padding: 16px;
    background: #fafafa;
    border-radius: 0 0 12px 12px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.v-chip {
    font-size: small;
    margin: 4px;
    background-color: #1976D2;
    color: white;
    border-radius: 20px;
}

.v-chip-group {
    display: flex;
    flex-wrap: wrap;
}

.provider-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1976D2;
}

.phone-chip,
.fax-chip {
    font-size: small;
    background-color: #1976D2;
    color: white;
}

.language-chip {
    font-size: small;
    background-color: #4CAF50;
    color: white;
}

.specialty-chip {
    font-size: small;
    background-color: #FF9800;
    color: white;
}

.status-info,
.last-updated-info {
    font-size: 0.9rem;
    color: #555;
}

.v-row {
    margin: 0 auto;
    padding: 0 16px;
}

.v-container {
    max-width: 1200px;
    margin: 0 auto;
}

.v-btn {
    margin-bottom: 16px;
}

.highlight-chip {
    font-weight: bold;
    font-size: 1.2rem;
    background-color: white;
    /* Orange for visibility */
    color: black;
    margin: 4px;
}

.highlight-chip-in-network {
    font-weight: bold;
    font-size: 1.2rem;
    background-color: red;
    /* Orange for visibility */
    color: white;
    margin: 4px;
}

.small-text {
    font-size: 0.85rem;
    /* Reduced font size for gender and NPI */
}
</style>
