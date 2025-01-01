<template>

    <header>
        <h1>Provider List</h1>
    </header>

    <body>

        <div id="app">

            <v-btn @click="getProviders">Provider List</v-btn>

            <p v-if="Object.keys(providers).length > 0"> {{ providers }} </p>
   
        </div>


    </body>

    <footer>
        <!--<p>Footer</p>-->
    </footer>
</template>

<script>
export default {
    data() {
        return {
            providers: {}
            
        }
    },
    methods: {
        async getProviders() {
            console.warn('Get Providers.');
            try {
                const api_url = "http://localhost:3001/api";

                const response = await fetch("https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=NPI-1&taxonomy_description=&name_purpose=PROVIDER&first_name=JO*&use_first_name_alias=&last_name=SM*&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=&skip=&pretty=&version=2.1");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const results = await response.json();
                this.providers = results;


                console.warn('API called:', this.providers);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        },
    }
}
</script>