<template>

    <header>
        <h1>Provider APIs</h1>
    </header>

    <body>

        <div id="app">

            <v-btn @click="callNPI">NPI Registry</v-btn>
            <v-btn @click="callHumana">Humana Providers</v-btn>
            <!-- <p v-if="Object.keys(results).length > 0"> {{ results }} </p> -->

        </div>
        <p> </p>
        <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
                <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                Provider List

                <v-spacer></v-spacer>

                <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
            </v-card-title>

            <v-divider></v-divider>
            <v-data-table v-model:search="search" :filter-keys="['FullUrl', 'Search', 'Resource']" :items="items">


                <template v-slot:item.number="{ item }">
                    <v-card class="my-2" elevation="2" rounded>
                        <!-- <v-img :src="`${item.number}`" height="64" cover></v-img> -->
                    </v-card>
                </template>



            </v-data-table>
        </v-card>


    </body>

    <footer>
        <!--<p>Footer</p>-->
    </footer>
</template>

<script>
export default {
    data() {
        return {
            results: {},
            message: 'Click the button to call the API.',
            random_number: 0,
            items: [{
                number: 0,
            }]

        }
    },
    methods: {
        async callNPI() {
            console.warn('Calling API.');
            try {
                //const api_url = "http://localhost:3001/npi-api";
                const api_url = "https://vue3-nu-three.vercel.app/npi-api"
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
            console.warn('Calling API.');
            try {
                //const api_url = "http://localhost:3001/humana-provider-api";
                const api_url = "https://vue3-nu-three.vercel.app/humana-provider-api"
                const response = await fetch(api_url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const results = await response.json();
                this.results = results;
                this.message = results.message;
                this.random_number = results.random_number;
                this.items = results.data.entry;

                console.warn('API called:', this.message);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
    }
}
</script>